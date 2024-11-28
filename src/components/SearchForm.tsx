import LabelRadioButton from "./LabelRadioButton";
import SubmitButton from "./SubmitButton";
import { categories } from "@/libs/helpers";
import { useRef } from "react";

type Props = {
  action:(data:FormData) => void;
};
export default function SearchForm({action}: Props){
  const formRef = useRef<HTMLFormElement | null>(null);
  
  return(
    <form
        ref={formRef}
        action={action}
        className="bg-white grow w-1/4 p-4 border-r flex flex-col gap-4">
        <input name="phrase" type="text" placeholder="Search FiskFinds"/>
        <div className="flex flex-col gap-0">
        <LabelRadioButton 
              name={'category'}
              value={''}
              onClick={() => formRef.current?.requestSubmit()}
              defaultChecked={true}
              label={'All categories'}
            />
          {categories.map(({key:categoryKey, label}) => (
            <LabelRadioButton 
              key={categoryKey}
              name={'category'}
              value={categoryKey}
              onClick={() => formRef.current?.requestSubmit()}
              label={label}
            />

          ))}
        </div>
        <div className="">
          <label> Filter by Price</label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input name = "min" type="number" placeholder="Min"/>
            </div>
            <div>
              <input name = "max" type="number" placeholder="Max"/>
            </div>
          </div>

        </div>
        <SubmitButton>Search</SubmitButton>

      </form>
  );
}