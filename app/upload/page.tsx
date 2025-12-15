"use client";

import { useState } from "react";
import CommonFileUpload, { UploadedFile } from "../components/CommonFileUpload";

export default function UploadPage() {
  const [files, setFiles] = useState<UploadedFile[]>([]);

  const handleFilesChange = (newFiles: UploadedFile[]) => {
    setFiles(newFiles);
    console.log("Files changed:", newFiles);
  };

  const handleFileRemove = (fileId: string) => {
    console.log("File removed:", fileId);
  };

  const handleFilePreview = (file: UploadedFile) => {
    console.log("Preview file:", file);
    if (file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file.file);
      window.open(url, "_blank");
    } else if (file.type === "application/pdf") {
      const url = URL.createObjectURL(file.file);
      window.open(url, "_blank");
    } else {
      alert(`Preview not available for ${file.type}. File: ${file.name}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">File Upload Demo</h2>

      <div className="space-y-6">
          <div>
          <h3 className="text-lg font-semibold mb-4">Default</h3>
          <CommonFileUpload
            label="Upload Files"
            accept=".png,.jpg,.pdf"
            multiple={true}
            onFilesChange={handleFilesChange}
            onFileRemove={handleFileRemove}
            onFilePreview={handleFilePreview}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Success State</h3>
          <CommonFileUpload
            label="Upload Files"
            accept=".png,.jpg,.pdf"
            multiple={true}
            state="success"
            message="Files uploaded successfully"
            onFilesChange={handleFilesChange}
            onFileRemove={handleFileRemove}
            onFilePreview={handleFilePreview}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Error State</h3>
          <CommonFileUpload
            label="Upload Files"
            accept=".png,.jpg,.pdf"
            multiple={true}
            state="error"
            message="Please check your files and try again"
            onFilesChange={handleFilesChange}
            onFileRemove={handleFileRemove}
            onFilePreview={handleFilePreview}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Disabled State</h3>
          <CommonFileUpload
            label="Upload Files"
            accept=".png,.jpg,.pdf"
            multiple={true}
            state="disabled"
            disabled={true}
            onFilesChange={handleFilesChange}
            onFileRemove={handleFileRemove}
            onFilePreview={handleFilePreview}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Single File Upload</h3>
          <CommonFileUpload
            label="Upload Single File"
            accept=".png,.jpg,.pdf"
            multiple={false}
            onFilesChange={handleFilesChange}
            onFileRemove={handleFileRemove}
            onFilePreview={handleFilePreview}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Custom File Types (Images Only)</h3>
          <CommonFileUpload
            label="Upload Images"
            accept="image/*"
            multiple={true}
            onFilesChange={handleFilesChange}
            onFileRemove={handleFileRemove}
            onFilePreview={handleFilePreview}
          />
        </div>
      </div>
    </div>
  );
}

