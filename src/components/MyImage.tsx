'use client';
import Image, {ImageProps} from "next/image";

type LoaderProps = {
  src: string;
  width: number;
  height?: number;
  quality?: number | undefined
};

const imageKitLoader = ({ src, width, height, quality }: LoaderProps) => {
  if(src[0] === "/") src = src.slice(1);
  const params = [`w-${width}`];
  if(height){
    params.push(`h-${height}`);
  }
  if (quality) {
    params.push(`q-${quality}`);
  }

  const paramsString = params.join(",");

  var urlEndpoint = process.env.NEXT_PUBLIC_IMAGE_KEY_ENDPOINT as string;
  if(urlEndpoint[urlEndpoint.length-1] === "/") urlEndpoint = urlEndpoint.substring(0, urlEndpoint.length - 1);
  return `${urlEndpoint}/${src}?tr=${paramsString}`
}

type MyImageProps = ImageProps & {
  height?: number;
  width: number;
};

const MyImage = ({width, height, ...props}:MyImageProps) => {
  return (
    <Image
      loader={args => imageKitLoader({
        ...args, 
        width,
        height
      })}
      width={width}
      height={height}
      {...props}
    />
  );
};

export default MyImage;