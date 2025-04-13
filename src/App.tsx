// src/App.tsx

import React, { useState } from "react";
import "./App.css";
import TemplateSelector from "../components/TemplateSelector";
import Editor from "../components/Editor";
import Preview from "../components/Preview";
import FileExplorer from "../components/FileExplorer";

interface FileContent {
  name: string;
  content: string;
  language: string;
}

interface Files {
  [path: string]: FileContent;
}

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [files, setFiles] = useState<Files>({});
  const [activeFile, setActiveFile] = useState<string | null>(null);

  const handleTemplateSelect = (templateName: string) => {
    // Create files based on selected template
    let templateFiles: Files = {};

    if (templateName === "react") {
      templateFiles = {
        "/package.json": {
          name: "package.json",
          content: JSON.stringify(
            {
              name: "react-project",
              version: "1.0.0",
              description: "React project created in CodeSandbox clone",
              main: "src/index.js",
              dependencies: {
                react: "^18.2.0",
                "react-dom": "^18.2.0",
                "react-scripts": "5.0.1",
              },
              scripts: {
                start: "react-scripts start",
                build: "react-scripts build",
                test: "react-scripts test",
                eject: "react-scripts eject",
              },
            },
            null,
            2
          ),
          language: "json",
        },
        "/public/index.html": {
          name: "index.html",
          content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>React App</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`,
          language: "html",
        },
        "/src/index.tsx": {
          name: "index.tsx",
          content: `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
          language: "typescript",
        },
        "/src/App.tsx": {
          name: "App.tsx",
          content: `import React from 'react';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Hello CodeSandbox Clone</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}

export default App;`,
          language: "typescript",
        },
        "/src/styles.css": {
          name: "styles.css",
          content: `.App {
  font-family: sans-serif;
  text-align: center;
}`,
          language: "css",
        },
      };
    }

    setFiles(templateFiles);
    setSelectedTemplate(templateName);
    setActiveFile("/src/App.tsx"); // Set default active file
  };

  const updateFileContent = (path: string, newContent: string) => {
    setFiles((prevFiles) => ({
      ...prevFiles,
      [path]: {
        ...prevFiles[path],
        content: newContent,
      },
    }));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>CodeSandbox Clone</h1>
      </header>
      <main className="App-main">
        {!selectedTemplate ? (
          <TemplateSelector onSelect={handleTemplateSelect} />
        ) : (
          <div className="editor-container">
            <FileExplorer
              files={files}
              activeFile={activeFile}
              onFileSelect={setActiveFile}
            />
            <div className="editor-preview-container">
              <Editor
                file={activeFile ? files[activeFile] : null}
                updateContent={(newContent) =>
                  activeFile && updateFileContent(activeFile, newContent)
                }
              />
              <Preview files={files} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
