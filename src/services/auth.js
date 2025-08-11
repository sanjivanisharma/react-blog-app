import config from "../config/config"
import { Client, Account, ID } from "appwrite";

class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            // if (userAccount) {
            console.log(userAccount)
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            const userLogin = await this.account.createEmailPasswordSession(email, password)
            // if (userLogin) {
            console.log(userLogin)
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            const account = this.account.get()
            // if(account) 
            console.log(account)
        } catch (error) {
            console.error(error);
            throw error;
        }

        return null;
    }

    async logout() {
        try {
            const session = this.account.deleteSessions();
            console.log(session)
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

const authService = new AuthService()

export default authService