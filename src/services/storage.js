import config from "../config/config";
import { Client, ID, Storage } from "appwrite";

class StorageService {
    client = new Client();
    storage;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.storage = new Storage(this.client);
    }

    async uploadFile(file) {
        try {
            const bucket = await this.storage.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
            console.log(bucket)
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async deleteFile(fileId) {
        try {
            const bucket = await this.storage.deleteFile(
                config.appwriteBucketId,
                fileId
            )
            console.log(bucket)
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    getFilePreview(fileId) {
        const bucket = this.storage.getFilePreview(
            config.appwriteBucketId,
            fileId
        )
        console.log(bucket)
    }
}

const storageService = new StorageService()

export default storageService