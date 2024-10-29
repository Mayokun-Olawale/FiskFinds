import Link from "next/link";
// import Image from "next/Image";

export default function Header(){
  return(
    <header className = "border -b p-4 flex justify-between">
      <Link 
      className = "text-blue-600" href = "/">
        {/* <Image
          src="/Images/FiskFindsLogo.png" // Path to your image in the public directory
          alt="FiskFinds Logo" // Provide a descriptive alt text
          width={50} // Set the desired width
          height={50} // Set the desired height
        /> */}
        FiskFinds
      </Link>
      <nav className = "*: text-blue-600" >
        <button className = "border rounded px-2 py-1"> Add Post </button>
        <button className = "border rounded px-2 py-1"> Login </button>
        <button className = "border rounded px-2 py-1"> SignUp </button>
      </nav>
    </header>

  );

}