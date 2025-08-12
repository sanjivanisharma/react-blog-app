import config from "../config/config";
import { Client, ID, Databases, Query } from "appwrite"

class DatabaseService {
    client = new Client();
    databases;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.databases = new Databases(this.client)
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            const data = await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title, content, featuredImage, status, userId
                }
            )
            console.log(data)
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            const data = await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title, content, featuredImage, status
                }
            )
            console.log(data)
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async deletePost(slug) {
        try {
            const data = await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            console.log(data)
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getPost(slug) {
        try {
            const data = await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            console.log(data)
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getAllActivePosts(queries = [Query.equal("status", ["active"])]) {
        try {
            const data = await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries
            )
            console.log(data)
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

const databaseService = new DatabaseService()

export default databaseService