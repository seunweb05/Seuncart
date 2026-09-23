const CLOUD_NAME = "rvccstbp";
const UPLOAD_PRESET = "Seuncart_product";

export async function uploadToCloudinary(file, onProgress) {
  if (!file?.type?.startsWith("image/")) throw new Error("Please select an image file.");
  if (file.size > 8 * 1024 * 1024) throw new Error("Each image must be 8MB or smaller.");

  const form = new FormData();
  form.append("file", file);
  form.append("upload_preset", UPLOAD_PRESET);
  form.append("folder", "seuncart/products");

  const xhr = new XMLHttpRequest();
  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

  return new Promise((resolve, reject) => {
    xhr.open("POST", url);
    xhr.upload.onprogress = e => {
      if (e.lengthComputable) onProgress?.(Math.round((e.loaded / e.total) * 100));
    };
    xhr.onload = () => {
      try {
        const data = JSON.parse(xhr.responseText);
        if (xhr.status >= 200 && xhr.status < 300) resolve({
          url: data.secure_url,
          publicId: data.public_id,
          width: data.width,
          height: data.height
        });
        else reject(new Error(data?.error?.message || "Cloudinary upload failed."));
      } catch { reject(new Error("Cloudinary returned an invalid response.")); }
    };
    xhr.onerror = () => reject(new Error("Network error while uploading image."));
    xhr.send(form);
  });
}
