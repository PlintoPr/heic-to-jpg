import { useState } from "react";
import appText from "../data/appText";

function UploadZone({ onFilesSelected }) {
  const { title, description, button, hint } = appText.upload;

  const [isDragging, setIsDragging] = useState(false);

  const handleChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onFilesSelected(files);
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files || []);
    if (files.length > 0) {
      onFilesSelected(files);
    }
  };

  return (
    <section
      className={`upload-zone ${isDragging ? "drag-active" : ""}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="upload-zone-inner">
        <p className="upload-label">{title}</p>
        <h2>Arrastra tus fotos aquí</h2>
        <p className="upload-description">{description}</p>

        <label className="primary-button">
          {button}
          <input
            type="file"
            accept=".heic,.heif"
            multiple
            onChange={handleChange}
            style={{ display: "none" }}
          />
        </label>

        <p className="upload-hint">{hint}</p>
      </div>
    </section>
  );
}

export default UploadZone;