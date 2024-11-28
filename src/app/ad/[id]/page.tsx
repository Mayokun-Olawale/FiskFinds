'use server';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connect, formatDate } from "@/libs/helpers";
import { AdModel } from "@/app/models/Ad";
import UploadThumbnail from "@/components/UploadThumbnail";
import UploadView from "@/components/UploadView";
import Gallery from "@/components/Gallery";
import { formatMoney } from "@/libs/helpers";
import { getServerSession } from "next-auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import DeleteAdButton from "@/components/DeleteAdButton";
type Props = {
  params: {
    id: string;
  };
  searchParam: {
    [key: string] : string
  };
};
export default async function SingleAdPAge(args: Props){
  await connect();
  const adDoc = await AdModel.findById(args.params.id);
  const session = await getServerSession(authOptions);

  if (!adDoc){
    return 'Not Found!';
  }
  return(
    <div className = "flex absolute inset-0 top-16">
      <div className = "w-3/5 grow bg-black text-white flex flex-col relative">
        <Gallery files={adDoc.files} />
      </div>
      <div className = "w-2/5 p-8 grow shrink-0 overflow-y-scroll">
        <h1 className = "text-lg font-bold">{adDoc.title}</h1>
        {session && session?.user?.email === adDoc.userEmail && (
          <div className="mt-2 flex gap-2"> 
            <Link href={`/edit/${adDoc._id}`} className="border border-blue-600 text-blue-600 rounded-md py-1 px-4 cursor-pointer">
              <span> Edit </span>
              </Link>
            <DeleteAdButton id={adDoc._id} />
          </div>
        )}
        <label>Price</label>
        <p>{formatMoney(adDoc.price)}</p>

        <label>description</label>
        <p className = "text-sm"> {adDoc.description}</p>

        <label>Category:</label>
          <p>{adDoc.category}</p>

        <label> contact</label>
        <p>{adDoc.contact}</p>
        <p className="text-xs mt-4 text-gray-400">
          Posted:{formatDate(adDoc.createdAt)}<br />
          Last update:{formatDate(adDoc.updatedAt)}
        </p>
      </div>
    </div>
  );
}