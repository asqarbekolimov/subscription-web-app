import { AuthContext } from "@/context/auth.context";
import Image from "next/image";
import React, { useContext } from "react";
import { PlanCard } from "@/components";
import { SubscriptionPlanProps } from "./subscription-plan.props";

const SubscriptionPlan = ({ products }: SubscriptionPlanProps) => {
  const { logOut } = useContext(AuthContext);
  return (
    <div className="min-h-screen">
      <div className="flex h-[10vh] items-center justify-between border-b-2 border-gray-300/20 px-4 md:px-10">
        <Image
          src={"/logo.svg"}
          alt={"logo"}
          width={56}
          height={56}
          className="cursor-pointer"
        />
        <div onClick={logOut} className="cursor-pointer hover:underline">
          Logout
        </div>
      </div>
      <div className="flex flex-col space-y-4 pt-5 text-center">
        <h1 className="text-2xl text-shadow-sm md:text-5xl">
          Flexible pricing for teams of any size.
        </h1>
        <p className="text-xl text-shadow-sm">
          Relaxing with watching your favourite movies and tv.
        </p>
      </div>
      <div className="flex items-center justify-center py-20">
        <div className="gap-5 space-y-4 md:grid md:grid-cols-2 md:space-y-0 md:px-4 lg:grid-cols-3">
          {products
            .map((product) => <PlanCard key={product.id} product={product} />)
            .reverse()}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlan;
