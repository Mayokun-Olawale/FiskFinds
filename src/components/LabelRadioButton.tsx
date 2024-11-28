import {ReactNode} from "react";

type Props = {
  name: string;
  value: string;
  onClick: () => void;
  label: ReactNode;
  defaultChecked?: boolean;
};
export default function LabelRadioButton({name, value,onClick, label, defaultChecked=false}:Props){
  return(
    <label 
      className="radio-btn group">

      <input 
        onClick={() => onClick()}
        className="hidden" 
        type="radio" 
        name = {name} 
        defaultChecked={defaultChecked}
        value={value}/> 
      {label}
     </label>
  )
}