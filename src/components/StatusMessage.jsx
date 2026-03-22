function StatusMessage({ type = "info", message }) {
  if (!message) return null;

  return (
    <section className={`status-message status-${type}`}>
      <p>{message}</p>
    </section>
  );
}

export default StatusMessage;