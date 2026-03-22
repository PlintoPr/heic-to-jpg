import { formatBytes } from "../utils/formatBytes";

function FileCard({ file, onDownload }) {
  const getStatusLabel = () => {
    switch (file.status) {
      case "ready":
        return "listo";
      case "invalid":
        return "inválido";
      case "converting":
        return "convirtiendo";
      case "done":
        return "convertido";
      case "error":
        return "error";
      default:
        return file.status;
    }
  };

  return (
    <article className={`file-card status-${file.status}`}>
      <div className="file-card-layout">
        <div className="file-card-preview">
          {file.resultUrl ? (
            <img
              src={file.resultUrl}
              alt={`Vista previa de ${file.outputName}`}
              className="file-preview-image"
            />
          ) : (
            <div className="file-preview-placeholder">
              <span>HEIC</span>
            </div>
          )}
        </div>

        <div className="file-card-content">
          <div className="file-card-top">
            <div>
              <p className="file-name">{file.originalName}</p>
              <p className="file-size">{formatBytes(file.sizeBytes)}</p>
              <p className="file-meta">
                {file.validationMessage || file.errorMessage}
              </p>
              {file.outputName ? (
                <p className="file-output-name">Salida: {file.outputName}</p>
              ) : null}
            </div>

            <span className={`file-status-badge status-${file.status}`}>
              {getStatusLabel()}
            </span>
          </div>

          {file.status === "done" ? (
            <div className="file-card-actions">
              <button
                type="button"
                className="secondary-button"
                onClick={() => onDownload(file)}
              >
                Descargar JPG
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export default FileCard;