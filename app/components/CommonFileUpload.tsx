"use client";

import React, { useRef, useState, useCallback } from "react";
import CommonButton from "./CommonButton";

export interface UploadedFile {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
}

interface CommonFileUploadProps {
  label?: string;
  accept?: string; // e.g., ".png,.jpg,.pdf" or "image/*,application/pdf"
  multiple?: boolean;
  maxSize?: number; // in bytes
  onFilesChange?: (files: UploadedFile[]) => void;
  onFileRemove?: (fileId: string) => void;
  onFilePreview?: (file: UploadedFile) => void;
  disabled?: boolean;
  message?: string;
  state?: "default" | "success" | "error" | "disabled";
  id?: string;
  name?: string;
}

export default function CommonFileUpload({
  label,
  accept = ".png,.jpg,.pdf",
  multiple = true,
  maxSize = 10 * 1024 * 1024, 
  onFilesChange,
  onFileRemove,
  onFilePreview,
  disabled = false,
  message,
  state = "default",
  id,
  name,
}: CommonFileUploadProps) {
  const generatedId = React.useId();
  const inputId = id || name || generatedId;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string>("");

  const generateFileId = () => `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const processFiles = useCallback(
    (fileList: FileList | null) => {
      if (!fileList || fileList.length === 0) return;

      const newFiles: UploadedFile[] = [];
      const errors: string[] = [];

      const validateFile = (file: File): string | null => {
        if (maxSize && file.size > maxSize) {
          return `File ${file.name} exceeds maximum size of ${(maxSize / 1024 / 1024).toFixed(2)}MB`;
        }
        return null;
      };

      Array.from(fileList).forEach((file) => {
        const validationError = validateFile(file);
        if (validationError) {
          errors.push(validationError);
          return;
        }

        const uploadedFile: UploadedFile = {
          id: generateFileId(),
          file,
          name: file.name,
          size: file.size,
          type: file.type,
        };
        newFiles.push(uploadedFile);
      });

      if (errors.length > 0) {
        setError(errors.join(", "));
      } else {
        setError("");
      }

      if (newFiles.length > 0) {
        const updatedFiles = multiple ? [...files, ...newFiles] : newFiles;
        setFiles(updatedFiles);
        onFilesChange?.(updatedFiles);
      }
    },
    [files, multiple, maxSize, onFilesChange]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (disabled) return;

    const droppedFiles = e.dataTransfer.files;
    processFiles(droppedFiles);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files);
    // Reset input so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleBrowseClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRemove = (fileId: string) => {
    if (disabled) return;
    const updatedFiles = files.filter((f) => f.id !== fileId);
    setFiles(updatedFiles);
    onFilesChange?.(updatedFiles);
    onFileRemove?.(fileId);
  };

  const handlePreview = (file: UploadedFile) => {
    if (disabled) return;
    onFilePreview?.(file);
  };

  const baseClasses = "w-[300px] border-2 border-dashed rounded-lg transition-colors";
  const stateClasses: Record<string, string> = {
    default: isDragging
      ? "border-blue-500 bg-blue-50"
      : disabled
        ? "border-gray-200 bg-gray-50 cursor-not-allowed"
        : "border-gray-300 bg-white hover:border-gray-400",
    success: isDragging
      ? "border-green-500 bg-green-50"
      : "border-green-400 bg-white",
    error: "border-red-400 bg-red-50",
    disabled: "border-gray-200 bg-gray-50 cursor-not-allowed",
  };

  const messageState = error ? "error" : state;

  return (
    <div className="mb-5">
      {label && (
        <label htmlFor={inputId} className="block mb-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <div
        className={`${baseClasses} ${stateClasses[state]} ${disabled ? "opacity-60" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="p-6 text-center">
          <div className="flex flex-col items-center justify-center space-y-3">
            {/* Document Icon */}
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>

            <div className="space-y-1">
              <p className="text-xs text-gray-700 font-medium">Drag and drop here or browse files</p>
              <p className="text-xs text-gray-500">Accepts {accept}</p>
            </div>

            <CommonButton
              variant="filled"
              color="dark"
              size="sm"
              onClick={handleBrowseClick}
              disabled={disabled}
              className="gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
              Browse
            </CommonButton>
          </div>
        </div>

        <input
          ref={fileInputRef}
          id={inputId}
          name={name}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileInput}
          disabled={disabled}
          className="hidden"
        />
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="mt-4 space-y-2 w-[300px]">
          {files.map((file) => (
            <div
              key={file.id}
              className="flex items-center gap-2 p-2 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {/* File Icon */}
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>

              {/* File Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                <button
                  type="button"
                  onClick={() => handlePreview(file)}
                  disabled={disabled}
                  className="text-xs text-blue-600 hover:text-blue-800 disabled:text-gray-400 disabled:cursor-not-allowed mt-1"
                >
                  Preview
                </button>
              </div>

              {/* Remove Button */}
              <button
                type="button"
                onClick={() => handleRemove(file.id)}
                disabled={disabled}
                className="flex-shrink-0 text-gray-400 hover:text-red-600 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
                aria-label={`Remove ${file.name}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Message/Error */}
      {(message || error) && (
        <div className="mt-2 flex items-center text-sm">
          <span className={`mr-2 ${messageState === "error" ? "text-red-600" : messageState === "success" ? "text-green-600" : "text-gray-600"}`}>
            {messageState === "error" ? (
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.72-1.36 3.485 0l6.518 11.593c.75 1.334-.213 2.998-1.742 2.998H3.48c-1.53 0-2.493-1.664-1.742-2.998L8.257 3.1zM11 13a1 1 0 10-2 0 1 1 0 002 0zm-1-8a1 1 0 00-.993.883L9 6v4a1 1 0 001.993.117L11 10V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            ) : messageState === "success" ? (
              <svg className="w-4 h-4 text-green-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414-1.414L8 11.172 4.707 7.879A1 1 0 103.293 9.293l4 4a1 1 0 001.414 0l8-8z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                <path d="M9 2a7 7 0 100 14A7 7 0 009 2zM8 7a1 1 0 112 0v3a1 1 0 11-2 0V7z" />
              </svg>
            )}
          </span>
          <span className={messageState === "error" ? "text-red-700" : messageState === "success" ? "text-green-700" : "text-gray-600"}>
            {error || message}
          </span>
        </div>
      )}
    </div>
  );
}

