'use server';

import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {getServerSession} from "next-auth";
import {AdModel} from "@/app/models/Ad";
import mongoose from "mongoose";
async function connect(){
  // process.env.MONGODB_URL as string
   return mongoose.connect("mongodb+srv://Mayokun:9LkB9KkqkCJHpyDD@cluster0.lvgji.mongodb.net/fisk_finds");
  
}

export async function createAd(formData: FormData){
  const {files, ...data} = Object.fromEntries(formData);

  await connect();
  
  const session = await getServerSession(authOptions);
  const newAdData = {
    
      ...data,
      files: JSON.parse(files as string),
      userEmail: session?.user?.email,
      
    
  }
  const newAdDoc = await AdModel.create(newAdData);
  return JSON.parse(JSON.stringify(newAdDoc));

  }

  export async function updateAd(formData: FormData){
    const {_id, files, ...data} = Object.fromEntries(formData);
  
    await connect();
    const adDoc = await AdModel.findById(_id);
    const session = await getServerSession(authOptions);
    if(!adDoc || adDoc.userEmail !== session?.user?.email){
      return;
    }
    
    const adData = {
        ...data,
        files: JSON.parse(files as string),
        
      
    }
    const newAdDoc = await AdModel.findByIdAndUpdate(_id, adData);
    return JSON.parse(JSON.stringify(newAdDoc));
  
    }
 
 

