import React from "react";
import Image from "next/Image";

import Logo from "../../public/logo.png";

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
        <a
          className="inline-flex items-center px-1 pt-1 border-b-2 text-lg font-medium leading-5 focus:outline-none transition duration-150 ease-in-out border-transparent text-gray-500 hover:text-gray-600 hover:border-gray-300 focus:text-gray-600 focus:border-grey-600"
          href="/about"
        >
          About
        </a>
      </div>
    </header>
  );
}

export default Header;
