'use server'
import { connect } from "@/libs/helpers";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { AdModel } from "@/app/models/Ad";
import AdForm from "@/components/AdForm";

type Props = {
  params: {
    id: string;
  };
  searchParams: {[key:string] : string};
}
export default async function EditPage(props:Props){
  const id = props.params.id;
  await connect();
  const session = await getServerSession(authOptions);
  const adDoc = await AdModel.findById(id);
  if(!adDoc){
    return '404 not found';
  }
  if(session?.user?.email !== adDoc?.userEmail){
    return 'not yours';
  }

  return (
    <AdForm 
      id={adDoc._id}
      defaultTexts={adDoc}
      defaultFiles={adDoc.files}
    />
  )
}