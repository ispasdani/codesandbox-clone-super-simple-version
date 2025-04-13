import React, { useEffect, useState } from "react";

interface FileContent {
  name: string;
  content: string;
  language: string;
}

interface Files {
  [path: string]: FileContent;
}

interface PreviewProps {
  files: Files;
}

const Preview: React.FC<PreviewProps> = ({ files }) => {
  const [html, setHtml] = useState<string>("");

  useEffect(() => {
    // Very basic preview generation - in a real app you'd use something more robust
    if (!files["/public/index.html"]) return;

    // Get the HTML template
    let htmlTemplate = files["/public/index.html"].content;

    // Create a bundle of all JS/TS files (very simplified)
    let jsContent = "";
    Object.entries(files).forEach(([path, file]) => {
      if (
        path.endsWith(".js") ||
        path.endsWith(".tsx") ||
        path.endsWith(".ts")
      ) {
        jsContent += file.content + "\n";
      }
    });

    // Create a bundle of all CSS files (very simplified)
    let cssContent = "";
    Object.entries(files).forEach(([path, file]) => {
      if (path.endsWith(".css")) {
        cssContent += file.content + "\n";
      }
    });

    // Insert the JS and CSS into the HTML
    htmlTemplate = htmlTemplate.replace(
      "</head>",
      `<style>${cssContent}</style></head>`
    );
    htmlTemplate = htmlTemplate.replace(
      "</body>",
      `<script>${jsContent}</script></body>`
    );

    setHtml(htmlTemplate);
  }, [files]);

  return (
    <div className="preview">
      <div className="preview-header">
        <span>Preview</span>
      </div>
      <iframe
        title="preview"
        srcDoc={html}
        sandbox="allow-scripts"
        className="preview-iframe"
      />
    </div>
  );
};

export default Preview;
