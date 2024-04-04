import { TaskAbortError } from "@reduxjs/toolkit";
import conf from "../conf/conf";

import { Client, Account, ID } from "appwrite";

//Sign up page
export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.projectId)
            this.account = new Account(this.client);
    }

    async createAccount({email,password,name}){
        try{
           const userAccount = await this.account.create(ID.unique(),email,password,name);
           if(userAccount){
             return this.login({email,password});
           }else{
            return userAccount;
           }
        }catch(error){
            throw error;
        }
    }

    async login({email,password}){
        try{
            await this.account.createEmailSession(email,password);
        }catch(error){
            throw error;
        }
    }

    async getCurrentUser(){
        try{
            return await this.account.get();
        }catch(error){
            console.log("appwrite serive :: getCurrentUser :: error",error);
        }
        return null;
    }
    async logout(){
        try{
            await this.account.deleteSession('current');
        }catch(error){
            console.log("appwrite serive :: logout :: error",error);
        }
    }
}
const authService = new AuthService();
export default  authService

