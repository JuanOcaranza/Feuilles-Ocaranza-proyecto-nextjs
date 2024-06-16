import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

export async function uploadImage(file: File) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const { public_id }: UploadApiResponse = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({}, function (error, result){
            if (error || !result) {
                reject(error);
                return;
            }
            resolve(result);
        }).end(buffer);
    })

    return public_id;
}

export async function deleteImage(public_id: string) {
    await cloudinary.uploader.destroy(public_id);
}