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
        {isConverting ? "Converting..." : "Convert to JPG"}
      </button>

      <button
        type="button"
        className="secondary-button"
        onClick={onDownloadAll}
        disabled={!hasDoneFiles || isConverting}
      >
        Download all
      </button>

      <button
        type="button"
        className="ghost-button"
        onClick={onClearAll}
        disabled={!hasFiles || isConverting}
      >
        Clear list
      </button>
    </section>
  );
}

export default ActionBar;