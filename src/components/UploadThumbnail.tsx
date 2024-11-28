import { UploadResponse } from "imagekit/dist/libs/interfaces";
import { MouseEventHandler, MouseEvent} from "react";
import MyImage from "./MyImage";
type Props = {
  file:UploadResponse;
  onClick?: () => void;
}

export default function UploadThumbnail({file,onClick}:Props){
  function handleClick(ev:React.MouseEvent){
    if(onClick){
      ev.preventDefault();
      return onClick();
    }
    
  }
  if(file.fileType === 'image'){
    return (
      <a onClick = {handleClick} target="_blank">
      <MyImage 
        width = {300}
        height = {300}
        alt={'product thumbnail'} 
        src={file.filePath }
        />
      </a>
    );
  }
  return(
    <div>{file.url} &raqup;</div>
  );
}