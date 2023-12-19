import { useContext, useState } from "react";
import { PlanCardProps } from "./plan-card.props";
import Image from "next/image";
import { RiVipCrown2Line } from "react-icons/ri";
import { AiOutlineHourglass, AiOutlineVideoCameraAdd } from "react-icons/ai";
import { AuthContext } from "@/context/auth.context";

const PlanCard = ({ product }: PlanCardProps) => {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmitSubscription = async (priceId: string) => {
    setIsLoading(true);
    try {
      const payload = { priceId, email: user?.email };
      const response = await fetch("/api/subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      window.open(data.subscription.url);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      <div className="max-w-sm transform cursor-pointer rounded-xl bg-white/20 px-6 pb-2 pt-6 shadow-lg transition duration-500 hover:scale-105">
        <h3 className="mb-3 text-xl font-bold text-[#E10856]">
          {product.name}
        </h3>
        <div className="relative">
          <Image
            className="w-full rounded-xl"
            src={product.images[0]}
            alt="colors"
            width={500}
            height={500}
          />
          <p className="absolute top-0 rounded-t-lg rounded-br-lg bg-black/90 px-3 py-1 font-semibold text-white">
            {(product.default_price.unit_amount / 100).toLocaleString("en-Us", {
              style: "currency",
              currency: "USD",
            })}
          </p>
          <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full rounded-xl bg-black/20"></div>
        </div>
        <div className="mt-4 border-[1px] border-white/20" />
        <button
          onClick={() => onSubmitSubscription(product.default_price.id)}
          className="mt-4 w-full rounded bg-[#E10856] py-4 font-semibold hover:opacity-80"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Buy Plan"}
        </button>
        <div className="my-4 flex flex-col space-y-2">
          {product.metadata.adv.split(", ").map((c, id) => (
            <div key={id} className="flex items-center space-x-2">
              {id == 0 && <RiVipCrown2Line className="h-5 w-5" />}
              {id == 1 && <AiOutlineHourglass className="h-5 w-5" />}
              {id == 2 && <AiOutlineVideoCameraAdd className="h-5 w-5" />}
              <p>{c}.</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PlanCard;
