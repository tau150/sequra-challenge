import logo from "/images/sequra-logo.png";

import { mapAgreements } from "./AgreementCard.utils";

import { useGetAgreements } from "@/modules/credit/hooks/useGetAgreements";
import ErrorCard from "@/Components/ErrorCard/ErrorCard";

import type { Agreement } from "@/modules/credit/domain/Agreement";

interface Props {
  amount: string;
}

const AgreementsCard = ({ amount }: Props) => {
  const { data, isLoading, isError } = useGetAgreements(amount);

  if (isError) {
    return <ErrorCard />;
  }

  return (
    <div className="card card-compact w-96 bg-green-100 mt-10 shadow-sm">
      <figure>
        <img alt="sequra-logo" className="my-2 w-[80px]" src={logo} />
      </figure>
      <div className="card-body bg-white">
        <h4 className="align-center text-center text-lg mb-2">More flexibility in your payments</h4>
        <div className="flex">
          <p>Split your payment</p>
          {isLoading ? (
            <div className="skeleton w-12 h-4 rounded-md" />
          ) : (
            <a className="link link-accent">More info</a>
          )}
        </div>
        <div className="mt-4">
          {isLoading ? (
            <div className="skeleton w-full h-12 rounded-md" />
          ) : (
            <select className="select select-accent w-full">
              {mapAgreements(data as Agreement[])}
            </select>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgreementsCard;
