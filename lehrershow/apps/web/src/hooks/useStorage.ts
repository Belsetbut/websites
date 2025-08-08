import {useState } from "react";
import { useAction } from "convex/react";
import { api } from "../../../../packages/backend/convex/_generated/api";
import { set } from "zod";

export const useStorage = () => {
   
    const generateUploadUrl = useAction(api.files.generateUploadUrl);
    const [isUploading, setIsUploading] = useState(false);

    const uploadFile = async ({ file } : { file: File}) => {
        setIsUploading(true);

        try {
            const uploadUrl = await generateUploadUrl();

            const result = await fetch(uploadUrl, {
                method: "POST",
                headers: {"Content-Type": file.type },
                body: file,
            });

            const { storageId } = await result.json();
            console.log("File uploaded successfully with ID:", storageId);
            return storageId;
        } catch (error) {
            console.error("Error uploading file:", error);
            throw error;
        } finally {
                setIsUploading(false);
            }
        };
    return { uploadFile, isUploading };
}