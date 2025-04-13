import React from "react";

interface FileContent {
  name: string;
  content: string;
  language: string;
}

interface Files {
  [path: string]: FileContent;
}

interface FileExplorerProps {
  files: Files;
  activeFile: string | null;
  onFileSelect: (filePath: string) => void;
}

interface FileTreeNode {
  type: "file" | "directory";
  path?: string;
  children?: {
    [key: string]: FileTreeNode;
  };
}

const FileExplorer: React.FC<FileExplorerProps> = ({
  files,
  activeFile,
  onFileSelect,
}) => {
  // Create a nested structure for the file tree
  const createFileTree = (): { [key: string]: FileTreeNode } => {
    const tree: { [key: string]: FileTreeNode } = {};

    Object.keys(files).forEach((path) => {
      const parts = path.split("/").filter(Boolean);
      let current: { [key: string]: FileTreeNode } = tree;

      parts.forEach((part, i) => {
        if (i === parts.length - 1) {
          // It's a file
          current[part] = { type: "file", path };
        } else {
          // It's a directory
          if (!current[part]) {
            current[part] = { type: "directory", children: {} };
          }
          current = current[part].children || {};
        }
      });
    });

    return tree;
  };

  const renderFileTree = (
    tree: { [key: string]: FileTreeNode },
    basePath = ""
  ) => {
    return Object.entries(tree).map(([name, item]) => {
      const path = `${basePath}/${name}`;

      if (item.type === "file") {
        return (
          <div
            key={path}
            className={`file-item ${activeFile === item.path ? "active" : ""}`}
            onClick={() => item.path && onFileSelect(item.path)}
          >
            {name}
          </div>
        );
      } else {
        return (
          <div key={path} className="directory-item">
            <div className="directory-name">{name}/</div>
            <div className="directory-children">
              {item.children && renderFileTree(item.children, path)}
            </div>
          </div>
        );
      }
    });
  };

  const fileTree = createFileTree();

  return (
    <div className="file-explorer">
      <h3>Files</h3>
      <div className="file-tree">{renderFileTree(fileTree)}</div>
    </div>
  );
};

export default FileExplorer;
