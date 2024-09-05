"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import formatFileSize from "@/lib/calculateFizeSize";
import { FileAttachmentIcons } from "@/lib/fileTypeIcons";
import { useEventStore } from "@/store/events/eventStore";
import { Trash2Icon } from "lucide-react";
import React, { useRef, useState } from "react";

const UploadAttachments: React.FC = () => {
  const { attachments, addAttachment, removeAttachment } = useEventStore();
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Handle file selection
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check for .exe files (case-insensitive)
    if (file.name.toLowerCase().endsWith(".exe")) {
      setError("Uploading .exe files is not allowed.");
      return;
    }

    // Add the file to the store and reset error
    setError(null);
    addAttachment(file);

    // Optional: Clear the input value to allow re-uploading the same file if needed
    event.target.value = "";
  };

  // Handle attachment removal
  const handleRemoveAttachment = (fileName: string) => {
    removeAttachment(fileName);
  };

  // Trigger the hidden file input when the custom button is clicked
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase();
    const fileType = FileAttachmentIcons.find((icon) =>
      icon.extensions.includes(extension!)
    );
    return fileType
      ? fileType.icon
      : FileAttachmentIcons.find((icon) => icon.type === "default")!.icon;
  };

  return (
    <div className="w-full flex flex-col mt-4">
      {/* Label for accessibility */}
      <Label>Upload Attachments</Label>
      <div className="bg-gray-100 p-2 rounded-lg mt-2">
        <div className="flex items-center">
          {/* Hidden file input */}
          <input
            type="file"
            id="upload-attachments-input"
            onChange={handleFileUpload}
            ref={fileInputRef}
            className="hidden"
          />

          {/* Custom upload button */}
          <Button
            type="button"
            onClick={handleButtonClick}
            className="upload-button px-3 py-1 bg-gray-500 text-white dark:bg-gray-300 dark:text-black rounded mt-2"
          >
            Select Files
          </Button>
        </div>

        <div className="flex flex-col">
          {/* Display error message if any */}
          {error && (
            <div className="error-message text-red-500 mt-2">{error}</div>
          )}

          {/* List of uploaded attachments */}
          <ul className="attachment-list mt-4">
            {attachments.map((file, index) => (
              <li
                key={index}
                className="attachment-item flex items-center justify-between mb-2"
              >
                <div className="flex items-center">
                  {getFileIcon(file.name)}
                  <span className="mx-2">{file.name}</span>
                  <span className="ml-2 bg-gray-300 text-black py-1 px-2 rounded-full text-[0.7rem] font-semibold">
                    {formatFileSize(file.size)}
                  </span>
                </div>
                <button
                  onClick={() => handleRemoveAttachment(file.name)}
                  className="remove-button text-red-500 hover:text-red-700 focus:outline-none"
                  aria-label={`Remove ${file.name}`}
                >
                  <Trash2Icon className="w-5 h-5" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UploadAttachments;
