"use client";

import { Button } from "@heroui/react";
import { useRef, useState } from "react";

export default function FileUpload() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  return (
    <div className="flex items-center gap-3">
      {/* Hidden File Input */}
      <input
        ref={fileRef}
        type="file"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Upload Button */}
      <Button 
        onPress={() => fileRef.current?.click()}
      >
        Upload File
      </Button>

      {/* File Name */}
      {fileName && (
        <p className="text-sm text-default-500">
          {fileName}
        </p>
      )}
    </div>
  );
}