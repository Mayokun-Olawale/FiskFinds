'use client';
import { UploadResponse } from "imagekit/dist/libs/interfaces";
import SubmitButton from "./SubmitButton";
import UploadArea from "./UploadArea";
import { useState } from "react";
import AdTextInputs, { AdTexts } from "./AdTextInputs";
import { createAd, updateAd } from "@/app/actions/adActions";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

type Props = {
  id?:string | null;
  defaultFiles?: UploadResponse[];
  defaultTexts?: AdTexts;

};

export default function AdForm({
  id = null,
  defaultFiles =[],
  defaultTexts={},
}: Props){
  const [files,setFiles] = useState<UploadResponse[]>(defaultFiles);

  async function handleSubmit(formData: FormData){
    formData.set('files', JSON.stringify(files));
    if(id){
      formData.set('_id', id);
    }
    const result = id 
    ? await updateAd(formData) 
    : await createAd(formData);
    redirect('/ad/'+result._id);
    
  }
  return(
    <form 
      action={handleSubmit} 
      className="max-w-4xl mx-auto grid grid-cols-2 gap-8">
      <div className = "grow pt-8">
        <UploadArea files={files} setFiles={setFiles} />
      </div>
      <div className = "grow pt-2">
        <AdTextInputs defaultValues={defaultTexts}/>
        <SubmitButton >{id? 'Save' : 'Publish'}</SubmitButton>
      </div>
  </form> 
  );}