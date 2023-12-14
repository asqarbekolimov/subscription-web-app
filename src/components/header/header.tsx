import { AuthContext } from "@/context/auth.context";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import {
  AiOutlineLogout,
  AiOutlineSearch,
  AiOutlineUser,
} from "react-icons/ai";
import { BiBellMinus } from "react-icons/bi";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const { logOut } = useContext(AuthContext);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${scrolled && "bg-slate-900/50 shadow backdrop-blur"}`}>
      <div className="flex items-center space-x-2 md:space-x-10">
        <Image
          src={"/logo.svg"}
          alt={"logo"}
          width={56}
          height={56}
          className={"cursor-pointer object-contain"}
        />

        <ul className="hidden space-x-4 md:flex">
          <li className="navLink">Home</li>
          <li className="navLink">Movies</li>
          <li className="navLink">TV Shows</li>
          <li className="navLink">New</li>
          <li className="navLink">Popular</li>
        </ul>
      </div>

      <div className="flex items-center space-x-4 text-sm font-light">
        <AiOutlineSearch className="h-6 w-6 cursor-pointer" />
        <p className="hidden lg:inline">Kids</p>
        <BiBellMinus className="h-6 w-6 cursor-pointer" />
        <Link href={"/account"}>
          <AiOutlineUser className="h-6 w-6 cursor-pointer" />
        </Link>
        <AiOutlineLogout onClick={logOut} className="h-6 w-6 cursor-pointer" />
      </div>
    </header>
  );
};

export default Header;
