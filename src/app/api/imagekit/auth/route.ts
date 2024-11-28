import { authOptions } from "../../auth/[...nextauth]/route"
import { getServerSession } from "next-auth";
import ImageKit from 'imagekit';

export const GET = async () => {
  const session = getServerSession(authOptions);
  if(!session) {
    return Response.json(false);
  }
  const ik = new ImageKit({
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGE_KEY_ENDPOINT as string ,
    publicKey: process.env.NEXT_PUBLIC_IMAGE_KEY_PUBLIC_KEY as string,
    privateKey: process.env.IMAGE_KEY_PRIVATE_KEY as string,
  });
  return Response.json(ik.getAuthenticationParameters());
}