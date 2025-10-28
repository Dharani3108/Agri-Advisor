import { NextApiRequest, NextApiResponse } from 'next';
import { AdvisoryOutput, ApiResponse } from '../../../types';
import { generateLLMAdvisory } from '../../../lib/services/LLMAdvisoryService';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<AdvisoryOutput>>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed',
    });
  }

  try {
    const { userId, farmerInputs } = req.body;

    if (!userId || !farmerInputs) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: userId, farmerInputs',
      });
    }

    // Generate AI-powered advisory using LLM
    const advisory = await generateLLMAdvisory(farmerInputs);

    res.status(200).json({
      success: true,
      data: advisory,
      message: 'AI-powered advisory generated successfully',
    });
  } catch (error) {
    console.error('Advisory generation error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
}
