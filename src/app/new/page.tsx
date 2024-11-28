'use client';
import { createAd } from "../actions/adActions";
import UploadArea from "@/components/UploadArea";
import Uploader from "@/components/Uploader";
import React, {useState} from "react";
import {UploadResponse} from "imagekit/dist/libs/interfaces"
import Image from "next/Image";
import SubmitButton from "@/components/SubmitButton";
import { redirect } from "next/navigation";
import { categories } from "@/libs/helpers";
import AdForm from "@/components/AdForm";


export default function NewAdPage(){
  const [files, setFiles] = useState<UploadResponse[]>([]);
  

  async function handleSubmit(formData: FormData){
    formData.set('files', JSON.stringify(files));
    const result = await createAd(formData);
    redirect('/ad/'+result._id);



  }
  return (
    <form 
      action={handleSubmit} 
      className="max-w-4xl mx-auto grid grid-cols-2 gap-8">
      <div className = "grow pt-8"><UploadArea files={files} setFiles={setFiles} />
      </div>
      <div className = "grow">
        <label htmlFor="titleIn">Title</label>
        <input name = "title" id = "titleIn" type = "text" placeholder = "Title"/>

        <label htmlFor="priceIn">Price</label>
        <input name = "price" id = "priceIn" type = "number" placeholder = "Price"/>

        <label htmlFor="categoryIn">Select Category</label>
        <select name="category" id="categoryIn" defaultValue="">
        <option value="" disabled>select category</option>
          {categories.map(({key:categoryKey, label:categoryLabel}) => (
            <option value={categoryKey}>{categoryLabel}</option>
          ))}
        </select>

        <label htmlFor="descriptionIn">Description</label>
        <textarea name = "description" id = "descriptionIn" placeholder="description"></textarea>

        <label htmlFor="contactIn">Contact Info</label>
        <textarea name = "contact" id = "contactIn" placeholder="mobile: +1 615 000 0000"></textarea>
          <SubmitButton >Publish</SubmitButton>
      </div>
    </form>
  );
}