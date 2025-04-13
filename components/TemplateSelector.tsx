import React from "react";

interface Template {
  id: string;
  name: string;
  description: string;
  icon: string;
}

interface TemplateSelectorProps {
  onSelect: (templateId: string) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ onSelect }) => {
  const templates: Template[] = [
    {
      id: "react",
      name: "React",
      description: "Create a new React project with a basic setup",
      icon: "⚛️",
    },
    // More templates can be added here
  ];

  return (
    <div className="template-selector">
      <h2>Select a template to get started</h2>
      <div className="templates-grid">
        {templates.map((template) => (
          <div
            key={template.id}
            className="template-card"
            onClick={() => onSelect(template.id)}
          >
            <div className="template-icon">{template.icon}</div>
            <h3>{template.name}</h3>
            <p>{template.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
