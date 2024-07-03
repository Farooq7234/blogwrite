import conf from '../conf/conf'
import { Client, Account, ID } from 'appwrite'

export class Authservice {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(ID.unique(), email, password, name)
      if (userAccount) {
        // call another method
        return this.login({ email, password });
      } else {
        return userAccount
      }
    } catch (error) {
      throw error
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password)
    } catch (error) {
      throw error
    }
  }

  // If user opens direct home without creating account we have get the current state as created or not 👇

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite service :: getCurrentUser :: error", error)
    }
    // if somehow fails to execute the try and catch we will return null
    return null
  }

  async logout() {
    try {
      return await this.account.deleteSessions()
    } catch (error) {
      console.log("Appwrite Service :: logout :: error", error)
    }
  }


}

/* created an object for the Authservice just because to access the method values using .(dot)
Like this ==> authService.login or authService.createAccount 
*/
const authService = new Authservice()


export default authService;