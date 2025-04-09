import axios from "axios";
import ImageKit from "imagekit-javascript";

let baseURL = import.meta.env.VITE_APP_BASE_URL;
const imageKit = new ImageKit({
  publicKey: import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY || "public_2hgv92qNdBK1r7ZVrmfvCs2MJI8=",
  urlEndpoint: import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT || "https://ik.imagekit.io/s7pwlfxmi",
});

export const uploadFileToImageKit = async (key, file) => {

  try {
    const authResponse = await axios.get(`${baseURL}/v1/imagekit-auth`);
    const authParams = authResponse.data;
    const { token, signature, expire } = authParams;

    const uploadResponse = await imageKit.upload({
      file, // File object
      fileName: file.name,
      token,
      signature,
      expire,
      folder: `/${key}s`,
    });

    return uploadResponse.url;
  } catch (error) {
    throw new Error("File upload failed");
  }
};