import conf from "../conf/conf";
import { Client,ID,Databases,Storage,Query } from "appwrite";

export class Service{
    client = new Client();
    database;
    bucket;
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.projectId);
        this.database = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }
    async createPost({title,slug,content,featuredImage,status,userId}){
        try{
            return awaitthis.database.createDocument(
                conf.databaseId,
                conf.collectionId,
                slug,
                {
                    title,
                    content,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        }catch(errot){
            console.log("appwrite seive :: createpost :: error",error);
        }
    }
    async updatePost(slug,{title,content,featuredImage,status}){
        try{
            return await this.database.updateDocument(
                conf.databaseId,
                conf.collectionId,
                slug,
                {
                     title,
                    content,
                    featuredImage,
                    status,
                }
            )
        }catch(error){
            console.log("appwrite seive :: createpost :: error");
        }
    }

    async deletePost(slug){
        try{
            await this.database.deleteDocument(
                conf.databaseId,
                conf.collectionId,
                slug
            )
            return true
        }catch(error){
            console.log("appwrite seive :: deletepost :: error");
            return false
        }
    }

    async getPost(slug){
        try{
            return await this.database.getDocument(
                conf.databaseId,
                conf.collectionId,
                slug
            )
        }catch(error){
            "appwrite seive :: createpost :: error",error
        }
    }

    async getPosts(queries=[Query.equal("status","active")]){
        try{
            return await this.database.listDocuments(
                conf.databaseId,
                conf.collectionId,
                queries,
            )
        }catch(error){
            console.log("appwrite seive :: getposts :: error",error);
            return false;
        }
    }

    //file upload service

    async uploadFile(file){
          try{
            return await this.bucket.createFile(
                conf.bucketId,
                ID.unique(),
                file
            )
          }catch(error){
            console.log("appwrite seive :: uploadfile :: error",error);
            return false;
          }
    }

    async deleteFile(fileId){
        try{
            await this.bucket.deleteFile(conf.bucketId,fileId);
            return true;
        }catch(error){
            console.log("appwrite seive :: deletefile :: error",error);
            return false;
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.bucketId,
            fileId
            );
    }

}

const service = new Service();

export default service;

