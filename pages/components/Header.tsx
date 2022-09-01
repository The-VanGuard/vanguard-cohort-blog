import React from "react";
import Image from "next/image";

import Logo from "../../public/logo.png";
import Link from "next/link";

function Header() {
  return (
    <header className="py-10 relative flex flex-row align-center items-center ">
      <Image
        src={Logo}
        alt="VanGuard Logo"
        width={115}
        height={115}
        objectFit="contain"
      />

      <div className="ml-10 w-fit">
        <Link href="/">
          <a className="inline-flex items-center px-1 pt-1 border-b-2 text-lg font-medium leading-5 focus:outline-none transition duration-150 ease-in-out border-transparent text-gray-500 hover:text-gray-600 hover:border-gray-300 focus:text-gray-600 focus:border-grey-600">
            Home
          </a>
        </Link>
      </div>
    </header>
  );
}

export default Header;
