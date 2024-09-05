import {
  File,
  FileArchive,
  FileImage,
  FileMusic,
  FileText,
  FileVideo2,
  Trash2Icon,
} from "lucide-react";

export const FileAttachmentIcons = [
  {
    type: "image",
    icon: <FileImage className="w-5 h-5 text-blue-500" />,
    extensions: [
      "jpg",
      "jpeg",
      "png",
      "gif",
      "bmp",
      "svg",
      "psd",
      "webp",
      "eps",
    ],
  },
  {
    type: "document",
    icon: <FileText className="w-5 h-5 text-blue-500" />,
    extensions: ["pdf", "doc", "docx", "txt", "odt", "rtf", "md"],
  },
  {
    type: "video",
    icon: <FileVideo2 className="w-5 h-5 text-blue-500" />,
    extensions: ["mp4", "mkv", "mov", "avi", "wmv", "flv", "webm"],
  },
  {
    type: "archive",
    icon: <FileArchive className="w-5 h-5 text-blue-500" />,
    extensions: ["zip", "rar", "7z", "tar", "gz", "bz2", "xz"],
  },
  {
    type: "audio",
    icon: <FileMusic className="w-5 h-5 text-blue-500" />,
    extensions: ["mp3", "wav", "aac", "flac", "ogg", "wma"],
  },
  {
    type: "spreadsheet",
    icon: <FileText className="w-5 h-5 text-blue-500" />, // Can replace with a specific icon for spreadsheets
    extensions: ["xls", "xlsx", "ods", "csv"],
  },
  {
    type: "presentation",
    icon: <FileText className="w-5 h-5 text-blue-500" />, // Can replace with a specific icon for presentations
    extensions: ["ppt", "pptx", "odp", "key"],
  },
  {
    type: "default",
    icon: <File className="w-5 h-5 text-blue-500" />, // Default icon for other file types
    extensions: [],
  },
];
