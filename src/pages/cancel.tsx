import Image from "next/image";
import Link from "next/link";
import { BiErrorAlt } from "react-icons/bi";

const Cancel = () => {
  return (
    <>
      <div className="flex justify-start px-4 py-2">
        <Image
          src={"/logo.svg"}
          alt={"logo"}
          width={56}
          height={56}
          className="cursor-pointer"
        />
      </div>
      <div className="flex h-[90vh] flex-col items-center justify-center">
        <BiErrorAlt className="h-10 w-20 text-red-500" />
        <h1 className="mt-4 text-2xl md:text-5xl">Canceled Subscription</h1>
        <Link href={"/"}>
          <button className="mt-4 rounded bg-[#E10856] px-5 py-4">
            Choose Plan
          </button>
        </Link>
      </div>
    </>
  );
};

export default Cancel;
