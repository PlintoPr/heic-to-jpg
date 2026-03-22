import heic2any from "heic2any";

export async function convertHeicToJpg(file) {
  try {
    const converted = await heic2any({
      blob: file,
      toType: "image/jpeg",
      quality: 0.9,
    });

    const resultBlob = Array.isArray(converted) ? converted[0] : converted;

    if (!(resultBlob instanceof Blob)) {
      throw new Error("The conversion did not return a valid file.");
    }

    return resultBlob;
  } catch (error) {
    throw new Error(
      "This HEIC file could not be converted. It may be corrupted or not supported."
    );
  }
}