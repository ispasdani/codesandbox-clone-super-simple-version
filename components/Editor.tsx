import React from "react";

interface FileContent {
  name: string;
  content: string;
  language: string;
}

interface EditorProps {
  file: FileContent | null;
  updateContent: (content: string) => void;
}

const Editor: React.FC<EditorProps> = ({ file, updateContent }) => {
  if (!file) {
    return <div className="editor">No file selected</div>;
  }

  return (
    <div className="editor">
      <div className="editor-header">
        <span>{file.name}</span>
      </div>
      <textarea
        className="editor-textarea"
        value={file.content}
        onChange={(e) => updateContent(e.target.value)}
        spellCheck="false"
      />
    </div>
  );
};

export default Editor;
