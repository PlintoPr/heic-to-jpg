function Faq() {
  return (
    <section className="faq-section">
      <h2>Frequently Asked Questions</h2>

      <div className="faq-list">
        <details className="faq-item">
          <summary>Can I convert HEIC to JPG without uploading files?</summary>
          <p>
            Yes. This tool works directly in your browser, so your HEIC images
            stay on your device during the conversion process.
          </p>
        </details>

        <details className="faq-item">
          <summary>Why do iPhone photos use the HEIC format?</summary>
          <p>
            Apple uses HEIC because it can keep good image quality while using
            less storage space than older formats like JPG.
          </p>
        </details>

        <details className="faq-item">
          <summary>Is HEIC better than JPG?</summary>
          <p>
            HEIC is usually more efficient for storage, but JPG is more widely
            supported across devices, apps, websites, and operating systems.
          </p>
        </details>

        <details className="faq-item">
          <summary>Will converting HEIC to JPG reduce quality?</summary>
          <p>
            Some quality loss can happen when converting to JPG, but for normal
            everyday use the difference is usually minimal.
          </p>
        </details>

        <details className="faq-item">
          <summary>Can I open HEIC files on Windows?</summary>
          <p>
            Sometimes, but many Windows systems require additional support or apps
            to open HEIC files properly.
          </p>
        </details>

        <details className="faq-item">
          <summary>What is the difference between HEIC and HEIF?</summary>
          <p>
            HEIF is the container format, while HEIC is one of the most common
            image formats based on it.
          </p>
        </details>

        <details className="faq-item">
          <summary>Is it safe to convert HEIC files online?</summary>
          <p>
            It depends on the tool. With this converter, your files are
            processed in the browser, so they do not need to be uploaded to a
            remote server.
          </p>
        </details>
      </div>
    </section>
  );
}

export default Faq;