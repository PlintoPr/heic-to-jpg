const ALLOWED_EXTENSIONS = [".heic", ".heif"];
const ALLOWED_MIME_TYPES = ["image/heic", "image/heif", "image/heic-sequence"];
const MAX_FILE_SIZE_BYTES = 20 * 1024 * 1024;

function getFileExtension(fileName) {
  const lowerName = String(fileName || "").toLowerCase();
  const lastDotIndex = lowerName.lastIndexOf(".");

  if (lastDotIndex === -1) return "";
  return lowerName.slice(lastDotIndex);
}

function hasAllowedExtension(file) {
  const extension = getFileExtension(file?.name);
  return ALLOWED_EXTENSIONS.includes(extension);
}

function hasAllowedMimeType(file) {
  if (!file?.type) return true;
  return ALLOWED_MIME_TYPES.includes(file.type.toLowerCase());
}

export function validateFile(file) {
  if (!file) {
    return {
      valid: false,
      code: "missing_file",
      message: "The selected file could not be read.",
    };
  }

  if (!hasAllowedExtension(file)) {
    return {
      valid: false,
      code: "invalid_extension",
      message: "This file does not have a supported extension. Please use .heic or .heif.",
    };
  }

  if (!hasAllowedMimeType(file)) {
    return {
      valid: false,
      code: "invalid_mime",
      message: "This file type does not appear to be compatible with HEIC or HEIF.",
    };
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return {
      valid: false,
      code: "file_too_large",
      message: "This file exceeds the maximum allowed size of 20 MB.",
    };
  }

  return {
    valid: true,
    code: "valid",
    message: "File ready for conversion.",
  };
}

export function isDuplicateFile(file, existingFiles) {
  return existingFiles.some(
    (item) =>
      item.originalName === file.name &&
      item.sizeBytes === file.size &&
      item.originalFile?.lastModified === file.lastModified
  );
}

export { MAX_FILE_SIZE_BYTES };