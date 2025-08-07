import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Link as LinkIcon, Image as ImageIcon, ExternalLink, AlertCircle } from 'lucide-react';

export interface InputDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (value: string) => void;
  title: string;
  placeholder: string;
  type: 'link' | 'image';
  initialValue?: string;
}

const InputDialog: React.FC<InputDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  placeholder,
  type,
  initialValue = '',
}) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState('');

  useEffect(() => {
    setValue(initialValue);
    setError('');
  }, [initialValue, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!value.trim()) {
      setError('Please enter a valid URL');
      return;
    }

    // Basic URL validation
    try {
      new URL(value);
    } catch {
      setError('Please enter a valid URL');
      return;
    }

    onSubmit(value.trim());
    onClose();
  };

  const handleButtonClick = (action: 'submit' | 'cancel') => {
    console.log('Dialog button clicked:', action, 'Value:', value);
    
    if (action === 'submit') {
      if (!value.trim()) {
        setError('Please enter a valid URL');
        return;
      }

      // Basic URL validation
      try {
        new URL(value);
      } catch {
        setError('Please enter a valid URL');
        return;
      }

      console.log('Submitting URL:', value.trim());
      onSubmit(value.trim());
      onClose();
    } else {
      console.log('Canceling dialog');
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const getIcon = () => {
    return type === 'link' ? <LinkIcon className="w-5 h-5" /> : <ImageIcon className="w-5 h-5" />;
  };

  const getColors = () => {
    return type === 'link' 
      ? {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          icon: 'text-blue-600',
          button: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
        }
      : {
          bg: 'bg-green-50',
          border: 'border-green-200',
          icon: 'text-green-600',
          button: 'bg-green-600 hover:bg-green-700 focus:ring-green-500',
        };
  };

  const colors = getColors();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 w-full max-w-md mx-auto"
              onKeyDown={handleKeyDown}
              tabIndex={-1}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Content */}
              <div className="flex items-start space-x-4">
                {/* Icon */}
                <div className={`flex-shrink-0 w-12 h-12 rounded-full ${colors.bg} ${colors.border} border flex items-center justify-center`}>
                  <div className={colors.icon}>
                    {getIcon()}
                  </div>
                </div>

                {/* Form content */}
                <div className="flex-1 pt-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {title}
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <div className="relative">
                        <ExternalLink className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="url"
                          value={value}
                          onChange={(e) => {
                            setValue(e.target.value);
                            setError('');
                          }}
                          placeholder={placeholder}
                          className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                            error ? 'border-red-300' : 'border-gray-300'
                          }`}
                          autoFocus
                        />
                      </div>
                      {error && (
                        <div className="flex items-center space-x-1 mt-2 text-red-600 text-sm">
                          <AlertCircle className="w-4 h-4" />
                          <span>{error}</span>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end space-x-3 pt-2">
                      <button
                        type="button"
                        onClick={() => handleButtonClick('cancel')}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => handleButtonClick('submit')}
                        className={`px-4 py-2 text-sm font-medium text-white rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${colors.button}`}
                      >
                        {type === 'link' ? 'Insert Link' : 'Insert Image'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default InputDialog; 