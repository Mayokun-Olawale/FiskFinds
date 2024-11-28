import Uploader from "./Uploader";

import Image from "next/Image";
import {Dispatch, SetStateAction, useState} from "react";
import {UploadResponse} from "imagekit/dist/libs/interfaces"
import UploadThumbnail from "./UploadThumbnail";

type Props = {
  files:UploadResponse[];
  setFiles: Dispatch<SetStateAction<UploadResponse[]>>;
}
export default function UploadArea({files, setFiles}:Props){
  const [isUploading, setIsUploading] = useState(false);
  return(

    <div className="grow pt-2 ml-2 ">
              {/* Image Display */}
              <div>
              `<Image
                src="/Images/NoImage.png" // Path to your image in the public directory
                alt="FiskFinds Logo" // Provide a descriptive alt text
                width={400} // Set the desired width (adjust as needed)
                height={300} // Set the desired height (adjust as needed)
                className="object-cover rounded-lg ml-2" // Add object-cover to ensure proper scaling
              />
              </div>

              {/* Uploader Button */}
              <div className = "mt-0">
              <label
                className={
                  'upload-btn cursor-pointer mt-0 px-20 py-2 border rounded center border-center'
                  + (isUploading 
                    ? 'text-gray-400 cursor-not-allowed' 
                    :
                    "text-blue-600 border-blue-600"
                  )
                }>
                <Uploader 
                onUploadStart={() => setIsUploading(true)}
                onSuccess={file => {
                  setFiles(prev => [...prev,file]);
                  setIsUploading(false);
                }}
                />
                {isUploading ? (
                  <span>Uploading...</span>
                ) : (
                  <>
                    <span>Add photos</span>
                  </>
                )}
              </label>
              <div className="flex gap-2 mt-2 flex-wrap">
                {files.map((file, index) => (
                  <div key={file.fileId} className="size-16 rounded overflow-hidden">
                    <UploadThumbnail file={file} />
              </div>

                ))}
              </div>
              </div>`

              
            </div>
  )
}