import FileCard from "./FileCard";
import appText from "../data/appText";

function ResultsList({ files, onDownload }) {
  const { title, description, empty } = appText.results;

  return (
    <section className="results-section">
      <div className="results-header">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      {files.length ? (
        <div className="results-list">
          {files.map((file) => (
            <FileCard key={file.id} file={file} onDownload={onDownload} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>{empty}</p>
        </div>
      )}
    </section>
  );
}

export default ResultsList;