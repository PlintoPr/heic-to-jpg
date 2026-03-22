import { useMemo, useState } from "react";
import Header from "./components/Header";
import UploadZone from "./components/UploadZone";
import ResultsList from "./components/ResultsList";
import ActionBar from "./components/ActionBar";
import StatusMessage from "./components/StatusMessage";
import SeoContent from "./components/SeoContent";
import Faq from "./components/Faq";
import appText from "./data/appText";
import { isDuplicateFile, validateFile } from "./utils/validateFile";
import { convertHeicToJpg } from "./utils/convertHeic";
import { downloadBlob } from "./utils/downloadFile";

function App() {
  const [files, setFiles] = useState([]);
  const [isConverting, setIsConverting] = useState(false);

  const handleFilesSelected = (newFiles) => {
    setFiles((prevFiles) => {
      const mappedFiles = newFiles.map((file, index) => {
        const duplicate = isDuplicateFile(file, prevFiles);
        const validation = duplicate
          ? {
              valid: false,
              code: "duplicate_file",
              message: "Este archivo ya fue añadido a la lista.",
            }
          : validateFile(file);

        return {
          id: `${file.name}-${file.lastModified}-${index}-${Date.now()}`,
          originalFile: file,
          originalName: file.name,
          outputName: file.name.replace(/\.(heic|heif)$/i, ".jpg"),
          sizeBytes: file.size,
          isValid: validation.valid,
          validationCode: validation.code,
          validationMessage: validation.message,
          status: validation.valid ? "ready" : "invalid",
          resultBlob: null,
          resultUrl: null,
          errorMessage: validation.valid ? null : validation.message,
        };
      });

      return [...prevFiles, ...mappedFiles];
    });
  };

  const handleConvertAll = async () => {
    const readyFiles = files.filter((file) => file.status === "ready");

    if (!readyFiles.length) return;

    setIsConverting(true);

    for (const readyFile of readyFiles) {
      setFiles((prevFiles) =>
        prevFiles.map((file) =>
          file.id === readyFile.id
            ? {
                ...file,
                status: "converting",
                validationMessage: "Converting file...",
                errorMessage: null,
              }
            : file
        )
      );

      try {
        const resultBlob = await convertHeicToJpg(readyFile.originalFile);
        const resultUrl = URL.createObjectURL(resultBlob);

        setFiles((prevFiles) =>
          prevFiles.map((file) =>
            file.id === readyFile.id
              ? {
                  ...file,
                  status: "done",
                  resultBlob,
                  resultUrl,
                  validationMessage: "File converted successfully.",
                  errorMessage: null,
                }
              : file
          )
        );
      } catch (error) {
        setFiles((prevFiles) =>
          prevFiles.map((file) =>
            file.id === readyFile.id
              ? {
                  ...file,
                  status: "error",
                  resultBlob: null,
                  resultUrl: null,
                  errorMessage: error.message,
                  validationMessage: error.message,
                }
              : file
          )
        );
      }
    }

    setIsConverting(false);
  };

  const handleDownloadOne = (file) => {
    if (!file.resultBlob) return;
    downloadBlob(file.resultBlob, file.outputName);
  };

  const handleDownloadAll = () => {
    const doneFiles = files.filter(
      (file) => file.status === "done" && file.resultBlob
    );

    doneFiles.forEach((file) => {
      downloadBlob(file.resultBlob, file.outputName);
    });
  };

  const handleClearAll = () => {
    files.forEach((file) => {
      if (file.resultUrl) {
        URL.revokeObjectURL(file.resultUrl);
      }
    });

    setFiles([]);
  };

  const statusInfo = useMemo(() => {
    const { status } = appText;

    if (!files.length) {
      return { type: "info", message: status.idle };
    }

    if (isConverting) {
      return { type: "info", message: status.converting };
    }

    const doneCount = files.filter((file) => file.status === "done").length;
    const errorCount = files.filter(
      (file) => file.status === "error" || file.status === "invalid"
    ).length;
    const readyCount = files.filter((file) => file.status === "ready").length;

    if (doneCount > 0 && errorCount > 0) {
      return { type: "warning", message: status.mixed };
    }

    if (doneCount > 0 && errorCount === 0) {
      return { type: "success", message: status.success };
    }

    if (readyCount > 0) {
      return { type: "info", message: status.ready };
    }

    return { type: "error", message: status.error };
  }, [files, isConverting]);

  const hasFiles = files.length > 0;
  const hasReadyFiles = files.some((file) => file.status === "ready");
  const hasDoneFiles = files.some((file) => file.status === "done");

  return (
    <main className="app-shell">
      <Header />
      <UploadZone onFilesSelected={handleFilesSelected} />
      <ActionBar
        hasFiles={hasFiles}
        hasReadyFiles={hasReadyFiles}
        hasDoneFiles={hasDoneFiles}
        isConverting={isConverting}
        onConvertAll={handleConvertAll}
        onDownloadAll={handleDownloadAll}
        onClearAll={handleClearAll}
      />
      <StatusMessage type={statusInfo.type} message={statusInfo.message} />
      <ResultsList files={files} onDownload={handleDownloadOne} />
      <SeoContent />
      <Faq />
    </main>
  );
}

export default App;