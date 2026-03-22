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
      throw new Error("La conversión no devolvió un archivo válido.");
    }

    return resultBlob;
  } catch (error) {
    throw new Error(
      "No se pudo convertir este archivo HEIC. Puede estar dañado o no ser compatible."
    );
  }
}