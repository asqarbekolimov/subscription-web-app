import Image from "next/image";
import Link from "next/link";
import { AiFillCheckCircle } from "react-icons/ai";

const Success = () => {
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
        <AiFillCheckCircle className="h-10 w-20 text-green-500" />
        <h1 className="mt-4 text-2xl md:text-5xl">Subscription Completed</h1>
        <Link href={"/"}>
          <button className="mt-4 rounded bg-green-500 px-5 py-4">
            Dashboard
          </button>
        </Link>
      </div>
    </>
  );
};

export default Success;
