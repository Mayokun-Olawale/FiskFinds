'use client';
import Link from "next/link";
import Image from "next/Image";
import {signIn} from 'next-auth/react';
import {signOut} from 'next-auth/react';
import {Session} from "next-auth";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Header({session}: {session:Session | null}){
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  return(
    <header className = "border -b p-4 flex items center justify-between text-lg h-16">
      <div className="flex items-center">
        <Image
          src="/Images/FiskFindsLogo.png" // Path to your image in the public directory
          alt="FiskFinds Logo" // Provide a descriptive alt text
          width={40} // Set the desired width
          height={40} // Set the desired height
          className="mr-0" // Add margin between logo and text
        />
        <Link href="/" className="text-blue-600 font-bold text-2xl">
          FiskFinds
        </Link>
      </div>
      <nav className = "flex gap-4  *:rounded *:py-0 *:text-lg items-center" >
        <Link href = "/new" className = "text-blue-600 border border-blue-600 text-blue-600 px-3 py-1"> +Add item </Link>
          <span className = "border-r border-gray-300"></span>
        {!session?.user && (
          <>
            <button
              onClick={() => signIn('google')}
              className = "text-white bg-blue-600 px-6 py-1"> Login 
          </button>
          </>

        )}
        {session?.user && (
          <>
            <div className="relative flex items-center">
              <button onClick={() => setShowDropdown(prev => !prev)}>
                <Image 
                  src={session.user.image as string} alt={'avatar'} width={36} height={36}
                  className ={"rounded-md relative z-50" + (showDropdown?'z-50':'')}
                />
              </button>
              {showDropdown && (
                <>
                  <div 
                    onClick={() => setShowDropdown(false)}
                    className="bg-black/90 fixed inset-0 z-40"></div>
                  <div className="absolute z-50 right-0 top-9 bg-white rounded-md w-24 border">
                    <button 
                      onClick={() => {
                        setShowDropdown(false);
                        router.push('/my-ads')
                      }} 
                      className="p-2 block text-center w-full" >My ads</button>
                    <button className="p-2 block w-full" onClick={() => signOut()}>Logout</button>
                  </div>
                </>
              )}
              
              
            </div>
          </>
        )}
        

      </nav>
    </header>

  );

}