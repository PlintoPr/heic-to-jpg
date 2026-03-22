function ActionBar({
  hasFiles,
  hasReadyFiles,
  hasDoneFiles,
  isConverting,
  onConvertAll,
  onDownloadAll,
  onClearAll,
}) {
  return (
    <section className="action-bar">
      <button
        type="button"
        className="primary-button"
        onClick={onConvertAll}
        disabled={!hasReadyFiles || isConverting}
      >
        {isConverting ? "Convirtiendo..." : "Convertir a JPG"}
      </button>

      <button
        type="button"
        className="secondary-button"
        onClick={onDownloadAll}
        disabled={!hasDoneFiles || isConverting}
      >
        Descargar todos
      </button>

      <button
        type="button"
        className="ghost-button"
        onClick={onClearAll}
        disabled={!hasFiles || isConverting}
      >
        Limpiar lista
      </button>
    </section>
  );
}

export default ActionBar;