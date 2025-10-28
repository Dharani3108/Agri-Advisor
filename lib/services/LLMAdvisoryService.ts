// LLM Service for AI-powered crop recommendations
import { FarmerInputRequest, AdvisoryOutput } from '../../types';
import { ENV_CONFIG, getAPIKey } from '../config/llm';

interface LLMResponse {
  recommendedCrops: Array<{
    name: string;
    suitabilityScore: number;
    expectedYield: number;
    inputCost: number;
    timeToHarvest: number;
    prosCons: string;
  }>;
  fertilizerPlan: Array<{
    stage: string;
    inputs: string;
    frequency: string;
    quantity: number;
  }>;
  pestSchedule: Array<{
    crop: string;
    riskLevel: string;
    symptoms: string;
    recommendedAction: string;
  }>;
  cropCalendar: Array<{
    period: string;
    operation: string;
    details: string;
  }>;
}

export class LLMAdvisoryService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = getAPIKey();
    this.baseUrl = 'https://api.openai.com/v1';
  }

  async generateAdvisory(farmerInputs: FarmerInputRequest): Promise<AdvisoryOutput> {
    try {
      const prompt = this.createPrompt(farmerInputs);
      const response = await this.callLLMAPI(prompt);
      
      return this.parseResponse(response);
    } catch (error) {
      console.error('LLM API Error:', error);
      // Fallback to mock data if API fails
      return this.getFallbackAdvisory();
    }
  }

  private createPrompt(farmerInputs: FarmerInputRequest): string {
    return `You are an expert agricultural advisor for Indian farmers. Based on the following farmer information, provide detailed crop recommendations.

Farmer Information:
- Location: ${farmerInputs.location?.village}, ${farmerInputs.location?.district}, ${farmerInputs.location?.state}
- Land Area: ${farmerInputs.landArea?.value} ${farmerInputs.landArea?.unit}
- Soil Type: ${farmerInputs.soilType?.texture} (pH: ${farmerInputs.soilType?.pH || 'unknown'})
- Water Source: ${farmerInputs.waterAvailability?.type}
- Irrigation Available: ${farmerInputs.waterAvailability?.irrigationAvailable ? 'Yes' : 'No'}
- Budget: ₹${farmerInputs.budgetINR}
- Timeline: ${farmerInputs.timelineDays} days
- Labor Count: ${farmerInputs.laborCount} people
- Risk Preference: ${farmerInputs.riskPreference}

Please provide recommendations in the following JSON format:
{
  "recommendedCrops": [
    {
      "name": "Crop Name",
      "suitabilityScore": 0.85,
      "expectedYield": 3000,
      "inputCost": 15000,
      "timeToHarvest": 120,
      "prosCons": "Detailed pros and cons"
    }
  ],
  "fertilizerPlan": [
    {
      "stage": "Pre-planting",
      "inputs": "Farmyard Manure",
      "frequency": "Once",
      "quantity": 5
    }
  ],
  "pestSchedule": [
    {
      "crop": "Crop Name",
      "riskLevel": "Medium",
      "symptoms": "Common symptoms",
      "recommendedAction": "Prevention/treatment advice"
    }
  ],
  "cropCalendar": [
    {
      "period": "Week 1",
      "operation": "Land Preparation",
      "details": "Detailed operation description"
    }
  ]
}

Focus on crops suitable for Indian climate and conditions. Provide practical, actionable advice.`;
  }

  private async callLLMAPI(prompt: string): Promise<string> {
    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: ENV_CONFIG.MODEL,
        messages: [
          {
            role: 'system',
            content: 'You are an expert agricultural advisor specializing in Indian farming conditions. Always respond with valid JSON format.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: ENV_CONFIG.MAX_TOKENS,
        temperature: ENV_CONFIG.TEMPERATURE,
      }),
    });

    if (!response.ok) {
      throw new Error(`LLM API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || '';
  }

  private parseResponse(response: string): AdvisoryOutput {
    try {
      // Extract JSON from response (in case there's extra text)
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      const jsonString = jsonMatch ? jsonMatch[0] : response;
      
      const parsed: LLMResponse = JSON.parse(jsonString);
      
      return {
        recommendedCrops: parsed.recommendedCrops.map(crop => ({
          name: crop.name,
          suitabilityScore: crop.suitabilityScore,
          expectedYield: crop.expectedYield,
          inputCost: crop.inputCost,
          timeToHarvest: crop.timeToHarvest,
          prosCons: crop.prosCons,
          marketPrice: { min: 1500, max: 3000 }, // Default market price
          riskLevel: 'medium' // Default risk level
        })),
        fertilizerPlan: parsed.fertilizerPlan.map(plan => ({
          stage: plan.stage,
          inputs: plan.inputs,
          frequency: plan.frequency,
          quantity: plan.quantity,
          timing: 'As recommended' // Default timing
        })),
        pestSchedule: parsed.pestSchedule.map(pest => ({
          crop: pest.crop,
          riskLevel: pest.riskLevel,
          symptoms: pest.symptoms,
          recommendedAction: pest.recommendedAction,
          timing: 'Monitor regularly' // Default timing
        })),
        cropCalendar: parsed.cropCalendar.map(calendar => ({
          period: calendar.period,
          operation: calendar.operation,
          details: calendar.details
        })),
        generatedAt: new Date().toISOString(),
        confidence: 0.85 // Default confidence
      };
    } catch (error) {
      console.error('Error parsing LLM response:', error);
      return this.getFallbackAdvisory();
    }
  }

  private getFallbackAdvisory(): AdvisoryOutput {
    // Fallback mock data if LLM fails
    return {
      recommendedCrops: [
        {
          name: 'Rice',
          suitabilityScore: 0.85,
          expectedYield: 3000,
          inputCost: 15000,
          timeToHarvest: 120,
          prosCons: 'High yield potential, requires good water management',
          marketPrice: { min: 1800, max: 2500 },
          riskLevel: 'medium'
        },
        {
          name: 'Wheat',
          suitabilityScore: 0.78,
          expectedYield: 2500,
          inputCost: 12000,
          timeToHarvest: 90,
          prosCons: 'Stable income, lower water requirement',
          marketPrice: { min: 2000, max: 2800 },
          riskLevel: 'low'
        }
      ],
      fertilizerPlan: [
        {
          stage: 'Pre-planting',
          inputs: 'Farmyard manure',
          frequency: 'Once',
          quantity: 5,
          timing: '15 days before planting'
        },
        {
          stage: 'Vegetative',
          inputs: 'NPK 20:20:20',
          frequency: 'Every 15 days',
          quantity: 2,
          timing: '30, 60, 90 days after planting'
        }
      ],
      pestSchedule: [
        {
          crop: 'Rice',
          riskLevel: 'Medium',
          symptoms: 'Yellowing leaves, stunted growth',
          recommendedAction: 'Apply neem oil spray, monitor regularly',
          timing: 'Around 60 days after planting'
        }
      ],
      cropCalendar: [
        {
          period: 'Week 1',
          operation: 'Land preparation',
          details: 'Plow and level the field, remove weeds'
        },
        {
          period: 'Week 2',
          operation: 'Seedling preparation',
          details: 'Prepare nursery bed, sow seeds'
        },
        {
          period: 'Week 3',
          operation: 'Transplanting',
          details: 'Transplant seedlings to main field'
        }
      ],
      generatedAt: new Date().toISOString(),
      confidence: 0.75
    };
  }
}

// Export the main function
export async function generateLLMAdvisory(farmerInputs: FarmerInputRequest): Promise<AdvisoryOutput> {
  const service = new LLMAdvisoryService();
  return await service.generateAdvisory(farmerInputs);
}
