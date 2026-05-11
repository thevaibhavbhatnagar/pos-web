"use client";

import { Label } from "@heroui/react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

type Props = {
  onFileSelect: (file: File) => void;
  label: string;
};

const FileDragUpload = ({ onFileSelect, label }: Props) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles?.[0]) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "image/*": [],
    },
  });

  return (
    <div className="flex flex-col gap-2">
      <Label className="text-fields-foreground font-normal">{label}</Label>
    <div
      {...getRootProps()}
      className={`
        border-2 border-dashed rounded-xl p-6
        text-center cursor-pointer transition
        ${
          isDragActive
            ? "border-primary bg-primary/10"
            : "border-default-300"
        }
      `}
    >
      <input {...getInputProps()} />

      {isDragActive ? (
        <p>Drop image here...</p>
      ) : (
        <p>Drag & drop image here, or click</p>
      )}
    </div>
    </div>
  );
};

export default FileDragUpload;