import React, { ReactNode } from "react";
import {useFormStatus} from "react-dom";
export default function SubmitButton({children}:{children:ReactNode}){
  const {pending} = useFormStatus();
  return (
    <>
      <button className = "mt-2 bg-blue-600 text-white px-4 py-2 rounded border-yellow-600">
        {pending && (
          <span> Saving...</span>
        )}
        {!pending && (
          <span>
            {children}
          </span>
        )}
        {/* {children}   */}
      </button>
    </>
  );
}