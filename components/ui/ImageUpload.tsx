import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'next-i18next';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  accept?: string;
  maxSize?: number;
  label: string;
  helpText?: string;
  currentImage?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageUpload,
  accept = 'image/*',
  maxSize = 5 * 1024 * 1024, // 5MB
  label,
  helpText,
  currentImage,
}) => {
  const { t } = useTranslation('common');
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setIsUploading(true);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
      
      onImageUpload(file);
    }
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxSize,
    multiple: false,
  });

  const removeImage = () => {
    setPreview(null);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
        
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
            ${isDragActive 
              ? 'border-primary-500 bg-primary-50' 
              : 'border-gray-300 hover:border-gray-400'
            }
            ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <input {...getInputProps()} disabled={isUploading} />
          
          {preview ? (
            <div className="space-y-4">
              <img
                src={preview}
                alt="Preview"
                className="mx-auto max-h-48 rounded-lg shadow-md"
              />
              <div className="flex justify-center space-x-2">
                <button
                  type="button"
                  onClick={removeImage}
                  className="px-3 py-1 text-sm text-red-600 hover:text-red-800"
                >
                  {t('removeImage')}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="text-4xl text-gray-400">
                📷
              </div>
              <div className="text-sm text-gray-600">
                {isDragActive ? (
                  <span className="text-primary-600">{t('dropImageHere')}</span>
                ) : (
                  <span>
                    {t('dragDropImage')} <br />
                    <span className="text-primary-600">{t('orClickToSelect')}</span>
                  </span>
                )}
              </div>
              <div className="text-xs text-gray-500">
                {t('maxFileSize')}: {(maxSize / (1024 * 1024)).toFixed(0)}MB
              </div>
            </div>
          )}
        </div>

        {fileRejections.length > 0 && (
          <div className="mt-2 text-sm text-red-600">
            {fileRejections.map(({ file, errors }) => (
              <div key={file.name}>
                {errors.map((error) => (
                  <div key={error.code}>
                    {error.code === 'file-too-large' && t('fileTooLarge')}
                    {error.code === 'file-invalid-type' && t('invalidFileType')}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {helpText && (
          <p className="text-sm text-gray-500 mt-2">
            {helpText}
          </p>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
