import Link from "next/link";
import Image from "next/Image";

export default function Header(){
  return(
    <header className = "border -b p-4 flex items center justify-between text-lg">
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
      <nav className = "flex gap-4  *:rounded *:py-0 *:text-lg" >
        <button className = "text-blue-600 border border-blue-600 text-blue-600 px-3 "> +Add item </button>
        <span className = "border-r border-gray-300"></span>
         <button className = "border border-yellow-600 px-3"> SignUp </button>
        <button className = "text-white bg-blue-600 px-3"> Login </button>

      </nav>
    </header>

  );

}