import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';
import Head from 'next/head';
import Link from 'next/link';
import CMSLayout from '@/components/CMSLayout';
import CustomAlert from '@/components/CustomAlert';
import { useCustomAlert } from '@/hooks/useCustomAlert';
import { getStorage, ref, listAll, deleteObject, getDownloadURL, getMetadata, uploadBytes } from 'firebase/storage';
import { Trash2, Upload, Image as ImageIcon, FileText, Video, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { processImage, IMAGE_CONFIGS, formatFileSize, ValidationResult, OptimizedImage } from '@/utils/imageValidation';
import { blogService } from '@/services/blogService';

interface MediaFile {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'document' | 'video';
  size: number;
  uploadedAt: Date;
  uploadedBy: string;
  path: string;
}

const MediaLibrary: React.FC = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { alertState, showError, showSuccess, showConfirm, closeAlert } = useCustomAlert();
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [optimizationResult, setOptimizationResult] = useState<OptimizedImage | null>(null);
  const [autoCompress, setAutoCompress] = useState(true);
  const [convertToWebP, setConvertToWebP] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/cms/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      fetchMediaFiles();
    }
  }, [user]);

  const fetchMediaFiles = async () => {
    setIsLoading(true);
    try {
      const storage = getStorage();
      const listRef = ref(storage, 'blog-images/');
      
      const result = await listAll(listRef);
      const mediaFiles: MediaFile[] = [];

      console.log('Found items:', result.items.length);

      for (const itemRef of result.items) {
        try {
          console.log('Processing item:', itemRef.name);
          const downloadURL = await getDownloadURL(itemRef);
          const metadata = await getMetadata(itemRef);
          
          console.log('Download URL:', downloadURL);
          console.log('Metadata:', metadata);
          
          // Determine file type based on content type
          let type: 'image' | 'document' | 'video' = 'document';
          if (metadata.contentType?.startsWith('image/')) {
            type = 'image';
          } else if (metadata.contentType?.startsWith('video/')) {
            type = 'video';
          }

          const mediaFile: MediaFile = {
            id: itemRef.name,
            name: itemRef.name,
            url: downloadURL,
            type,
            size: metadata.size || 0,
            uploadedAt: new Date(metadata.timeCreated || Date.now()),
            uploadedBy: user?.email || 'Unknown',
            path: itemRef.fullPath,
          };

          console.log('Created media file:', mediaFile);
          mediaFiles.push(mediaFile);
        } catch (error) {
          console.error('Error fetching metadata for:', itemRef.name, error);
        }
      }

      // Sort by upload date (newest first)
      mediaFiles.sort((a, b) => {
        const dateA = a.uploadedAt || new Date();
        const dateB = b.uploadedAt || new Date();
        return new Date(dateB).getTime() - new Date(dateA).getTime();
      });
      
      console.log('Final media files:', mediaFiles);
      setFiles(mediaFiles);
    } catch (error) {
      console.error('Error fetching media files:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setValidationResult(null);
      setOptimizationResult(null);
      
      // Process image if it's an image file
      if (file.type.startsWith('image/')) {
        try {
          const result = await processImage(file, 'general', {
            autoCompress: false, // Don't auto-compress during validation
            convertToWebP: false
          });
          
          setValidationResult(result.validation);
          
          if (result.success && autoCompress) {
            // Show optimization preview
            const optimizationPreview = await processImage(file, 'general', {
              autoCompress: true,
              convertToWebP: convertToWebP
            });
            
            if (optimizationPreview.optimization) {
              setOptimizationResult(optimizationPreview.optimization);
            }
          }
        } catch (error) {
          console.error('Error processing image:', error);
          setValidationResult({
            isValid: false,
            error: 'Failed to process image. Please try again.'
          });
        }
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    // For images, validate first
    if (selectedFile.type.startsWith('image/')) {
      if (!validationResult?.isValid) {
        showError('Invalid Image', validationResult?.error || 'Please select a valid image file.');
        return;
      }
    }

    setIsUploading(true);
    try {
      let fileToUpload = selectedFile;
      
      // Process image if it's an image file
      if (selectedFile.type.startsWith('image/')) {
        const result = await processImage(selectedFile, 'general', {
          autoCompress,
          convertToWebP
        });
        
        if (result.success && result.file) {
          fileToUpload = result.file;
          
          // Show optimization results
          if (result.optimization) {
            const savings = result.optimization.compressionRatio;
            if (savings > 10) {
              showSuccess('Image Optimized', 
                `File size reduced by ${savings}% (${formatFileSize(result.optimization.originalSize)} → ${formatFileSize(result.optimization.compressedSize)})`
              );
            }
          }
        } else {
          throw new Error(result.error || 'Failed to process image');
        }
      }

      const storage = getStorage();
      const timestamp = Date.now();
      const fileName = `${timestamp}-${fileToUpload.name}`;
      const storageRef = ref(storage, `blog-images/${fileName}`);

      // Upload processed file to Firebase Storage
      const snapshot = await uploadBytes(storageRef, fileToUpload);
      
      // Get download URL
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      // Get metadata
      const metadata = await getMetadata(snapshot.ref);
      
      // Determine file type based on content type
      let type: 'image' | 'document' | 'video' = 'document';
      if (metadata.contentType?.startsWith('image/')) {
        type = 'image';
      } else if (metadata.contentType?.startsWith('video/')) {
        type = 'video';
      }

      // Create new media file object
      const newFile: MediaFile = {
        id: fileName,
        name: selectedFile.name, // Keep original name for display
        url: downloadURL,
        type,
        size: metadata.size || fileToUpload.size,
        uploadedAt: new Date(metadata.timeCreated || Date.now()),
        uploadedBy: user?.email || 'Unknown',
        path: snapshot.ref.fullPath,
      };
      
      // Add to files list
      setFiles(prev => [newFile, ...prev]);
      
      // Reset form
      setSelectedFile(null);
      setValidationResult(null);
      setOptimizationResult(null);
      
      console.log('File uploaded successfully:', newFile);
      showSuccess('Upload Successful', 'File has been uploaded successfully.');
    } catch (error) {
      console.error('Upload failed:', error);
      showError('Upload Failed', error instanceof Error ? error.message : 'Failed to upload file. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (fileId: string) => {
    const confirmed = await showConfirm({
      title: 'Delete File',
      message: 'Are you sure you want to delete this file? This action cannot be undone.',
      confirmText: 'Delete',
      cancelText: 'Cancel'
    });

    if (confirmed) {
      setIsDeleting(fileId);
      try {
        const fileToDelete = files.find(file => file.id === fileId);
        if (!fileToDelete) {
          throw new Error('File not found');
        }

        const storage = getStorage();
        const fileRef = ref(storage, fileToDelete.path);
        
        await deleteObject(fileRef);
        
        // Remove from local state
        setFiles(prev => prev.filter(file => file.id !== fileId));
        
        console.log('File deleted successfully:', fileId);
      } catch (error) {
        console.error('Error deleting file:', error);
        showError('Delete Failed', 'Failed to delete file. Please try again.');
      } finally {
        setIsDeleting(null);
      }
    }
  };

  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      showSuccess('Copied!', 'URL copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy URL:', error);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      showSuccess('Copied!', 'URL copied to clipboard!');
    }
  };

  const testImageUrl = async (url: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
      // Timeout after 5 seconds
      setTimeout(() => resolve(false), 5000);
    });
  };



  const handleImageError = (fileId: string, url: string) => {
    console.error('Image failed to load:', url);
    setImageErrors(prev => new Set([...prev, fileId]));
  };

  const handleImageLoad = (fileId: string) => {
    setImageErrors(prev => {
      const newSet = new Set(prev);
      newSet.delete(fileId);
      return newSet;
    });
  };

  const retryImage = (fileId: string, url: string) => {
    setImageErrors(prev => {
      const newSet = new Set(prev);
      newSet.delete(fileId);
      return newSet;
    });
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Media Library - CMS</title>
      </Head>
      <CMSLayout 
        title="Media Library"
      >
        {/* Upload Section */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Upload New File</h2>
          
          {/* File Input */}
          <div className="mb-4">
            <input
              type="file"
              onChange={handleFileSelect}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              accept="image/*,video/*,.pdf,.doc,.docx"
            />
          </div>

          {/* Image Options */}
          {selectedFile?.type.startsWith('image/') && (
            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Image Optimization Options</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={autoCompress}
                    onChange={(e) => setAutoCompress(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  <span className="ml-2 text-sm text-gray-600">Auto-compress large images</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={convertToWebP}
                    onChange={(e) => setConvertToWebP(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  <span className="ml-2 text-sm text-gray-600">Convert to WebP format (smaller file size)</span>
                </label>
              </div>
            </div>
          )}

          {/* Validation Results */}
          {validationResult && (
            <div className="mb-4">
              {!validationResult.isValid ? (
                <div className="flex items-start p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-red-800">Validation Failed</p>
                    <p className="text-sm text-red-600">{validationResult.error}</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-start p-3 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-green-800">Image Valid</p>
                    {validationResult.warnings && validationResult.warnings.length > 0 && (
                      <div className="mt-1">
                        {validationResult.warnings.map((warning, index) => (
                          <p key={index} className="text-sm text-yellow-600">⚠️ {warning}</p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Optimization Preview */}
          {optimizationResult && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start">
                <Info className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-blue-800">Optimization Preview</p>
                  <p className="text-sm text-blue-600">
                    File size will be reduced by {optimizationResult.compressionRatio}% 
                    ({formatFileSize(optimizationResult.originalSize)} → {formatFileSize(optimizationResult.compressedSize)})
                  </p>
                  <p className="text-sm text-blue-600">
                    Dimensions: {optimizationResult.dimensions.width}×{optimizationResult.dimensions.height}px
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Upload Button */}
          <div className="flex items-center justify-between">
            <button
              onClick={handleUpload}
              disabled={!selectedFile || isUploading || (selectedFile?.type.startsWith('image/') && !validationResult?.isValid)}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? 'Uploading...' : 'Upload'}
            </button>
            
            {selectedFile && (
              <div className="text-sm text-gray-500">
                Selected: {selectedFile.name} ({formatFileSize(selectedFile.size)})
              </div>
            )}
          </div>

          {/* Image Requirements */}
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Image Requirements:</h4>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Maximum size: 5MB</li>
              <li>• Maximum dimensions: 2048×2048px</li>
              <li>• Minimum dimensions: 300×200px</li>
              <li>• Supported formats: JPEG, PNG, WebP</li>
              <li>• Recommended aspect ratio: 16:9 or 4:3 for best results</li>
            </ul>
          </div>
        </div>

        {/* Files Grid */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Media Files ({files.length})
              </h3>
              <button
                onClick={fetchMediaFiles}
                className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
              >
                Refresh
              </button>
            </div>
            
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-gray-600">Loading media files...</span>
              </div>
            ) : files.length === 0 ? (
              <div className="text-center py-12">
                <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No media files</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Get started by uploading a new file.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {files.map((file) => (
                  <div key={file.id} className="relative group bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-gray-300 transition-colors">
                    {file.type === 'image' ? (
                      <div className="relative">
                        {!imageErrors.has(file.id) ? (
                          <img
                            src={file.url}
                            alt={file.name}
                            className="w-full h-32 object-cover rounded-md mb-2"
                            onError={() => handleImageError(file.id, file.url)}
                            onLoad={() => handleImageLoad(file.id)}
                            loading="lazy"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="w-full h-32 bg-gray-200 rounded-md mb-2 flex items-center justify-center flex-col">
                            <ImageIcon className="h-8 w-8 text-gray-400" />
                            <span className="ml-2 text-xs text-gray-500 mt-1">Image not available</span>
                            <div className="flex space-x-2 mt-1">
                              <button
                                onClick={() => retryImage(file.id, file.url)}
                                className="text-xs text-blue-500 hover:text-blue-700"
                              >
                                Retry
                              </button>
                              <button
                                onClick={() => window.open(file.url, '_blank')}
                                className="text-xs text-blue-500 hover:text-blue-700"
                              >
                                Open in new tab
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : file.type === 'video' ? (
                      <div className="w-full h-32 bg-gray-200 rounded-md mb-2 flex items-center justify-center">
                        <Video className="h-8 w-8 text-gray-400" />
                      </div>
                    ) : (
                      <div className="w-full h-32 bg-gray-200 rounded-md mb-2 flex items-center justify-center">
                        <FileText className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                    
                    <div className="text-sm">
                      <p className="font-medium text-gray-900 truncate" title={file.name}>
                        {file.name}
                      </p>
                      <p className="text-gray-500">{formatFileSize(file.size)}</p>
                      <p className="text-gray-400 text-xs">
                        {blogService.formatDate(file.uploadedAt)}
                      </p>
                      {file.type === 'image' && (
                        <a
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-500 hover:text-blue-700 block mt-1"
                        >
                          View full size
                        </a>
                      )}
                    </div>
                    
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                      <button
                        onClick={() => copyToClipboard(file.url)}
                        className="bg-blue-500 text-white rounded-full p-1 hover:bg-blue-600"
                        title="Copy URL"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(file.id)}
                        disabled={isDeleting === file.id}
                        className="bg-red-500 text-white rounded-full p-1 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Delete file"
                      >
                        {isDeleting === file.id ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Custom Alert */}
        <CustomAlert
          isOpen={alertState.isOpen}
          onClose={closeAlert}
          onConfirm={alertState.onConfirm}
          onCancel={alertState.onCancel}
          title={alertState.title}
          message={alertState.message}
          type={alertState.type}
          confirmText={alertState.confirmText}
          cancelText={alertState.cancelText}
          showCancel={alertState.showCancel}
        />
      </CMSLayout>
    </>
  );
};

export default MediaLibrary; 