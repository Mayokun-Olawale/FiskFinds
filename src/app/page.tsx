'use client';

import { Ad } from "./models/Ad";
import { useEffect, useState, useRef} from "react";
import AdItem from "@/components/AdItem";
import { categories } from "@/libs/helpers";
import SubmitButton from "@/components/SubmitButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LabelRadioButton from "@/components/LabelRadioButton";
import SearchForm from "@/components/SearchForm";

export default function Home() {
  const [ads, setAds] = useState<Ad[]>([]);
  

  useEffect(() => {
    fetchAds();
  },[]);
  function fetchAds(params?: URLSearchParams){
    const url = `/api/ads?${params?.toString() || ''}`;
    
    fetch(url).then(response => {
      response.json().then(adsDocs => {
        setAds(adsDocs);

      });
    });
  }

  function handleSearch(formData: FormData){
    const params = new URLSearchParams();
    formData.forEach((value, key) => {
      if(typeof value === 'string'){
        params.set(key,value );
      }
    });
    fetchAds(params);
  }

  return (
    <div className="flex w-full">
      <SearchForm action={handleSearch} />
      <div className="p-4  grow bg-gray-100 w-3/4">
        <h2 className="font-bold mt-2 mb-4">Latest Products</h2>
          <div  className = " grid md:grid-cols-4 gap-x-4 gap-y-6">
          {ads.map(ad =>(
            <AdItem key={ad._id} ad={ad} />
          ))}
          </div>
          {ads && ads?.length === 0 && (
            <div className="text-gray-400"> No Products Found </div>
          )}
          {ads === null && (
            <div className="text-gray-400"> Loading... </div>
          )}
        </div>
    </div>
  );
}
