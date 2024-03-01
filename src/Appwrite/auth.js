import conf from "../conf/conf.js"
import { Client, Account, ID } from "appwrite";

export class  AuthService{
    client = new Client();
    account ;
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.account= new Account(this.client)
    }
    async createAccount({email,password,name}){
        try {
          const useraccount = await this.account.create(ID.unique(),email,password,name)  
          if(useraccount){
            // call another method
            return  this.login({email,password})
          }
          else{
            return useraccount
          }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async login({email,password}){
       try {
         return this.account.createEmailSession(email,password)
       } catch (error) {
         throw error
       }
    }
   
    async getCurrentUser(){
        try {
           return this.account.get()     
        } catch (error) {
            throw error;
        }
        return null
    }

    async logout(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            throw error
        }
    }
}


const authService = new AuthService()

export default authService