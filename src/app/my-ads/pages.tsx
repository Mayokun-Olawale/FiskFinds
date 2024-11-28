'use server';

import { connect } from "@/libs/helpers";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { AdModel } from "../models/Ad";
import AdItem from "@/components/AdItem";

export default async function MyAdsPage(){
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  if(!email){
    return 'no email found';
  }
  await connect();
  const adsDocs = await AdModel.find({userEmail:email});
  return(
    <div className="container my-8 mx-auto">
      <h1 className="text-2xl bold mb-4">Your Ads</h1>
      <div className="grid grid-cols-4 gap-x-2 gap-y-4">
        {adsDocs?.map(ad =>(
          <AdItem ad={ad} />
        ))}
      </div>

    </div>
  )

}