'use client';


import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteAdButton({id}:{id:string}){
  const [showDeleteQuestion, setShowDeleteQuestion] = useState(false);
  const router = useRouter();

  function handleDelete(){
    fetch(`/api/ads?id=${id}`,{
      method: 'DELETE',
    }).then(() => {
      setShowDeleteQuestion(false);
      router.push('/');
    });
    setShowDeleteQuestion(false);
  }

  if(showDeleteQuestion){
    return (
      <div className="bg-black/90 fixed inset-0 z-50 flex items-center justify-center"> 
        <div className="bg-white p-4 rounded-md">
          <h2 className="text-lg">Do you really want to delete this posting?</h2>
          <div className="flex justify-center gap-2 mt-2">
            <button 
              className="px-2 py-1 border rounded"
              onClick={() => setShowDeleteQuestion(false)}>
                No, cancel
            </button>
            <button 
              className="py-1 px-2 bg-red-600 text-white rounded" 
              onClick={handleDelete}
              >
                YES!
            </button>

          </div>
        </div>
      </div>
    );
  }
  return (
    <button 
      onClick={() => setShowDeleteQuestion(true)}
      className="border border-red-600 text-red-600 rounded-md py-1 px-4 cursor-pointer">
      <span> Delete </span>
    </button>
  );
}