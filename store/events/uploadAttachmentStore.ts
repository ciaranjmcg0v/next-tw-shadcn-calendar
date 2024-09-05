import { create } from "zustand";

interface UploadAttachmentsState {
  attachments: File[];
  addAttachment: (file: File) => void;
  removeAttachment: (fileName: string) => void;
}

export const useUploadAttachmentsStore = create<UploadAttachmentsState>((set) => ({
  attachments: [],
  
  addAttachment: (file) =>
    set((state) => ({
      attachments: [...state.attachments, file],
    })),

  removeAttachment: (fileName) =>
    set((state) => ({
      attachments: state.attachments.filter((file) => file.name !== fileName),
    })),
}));
