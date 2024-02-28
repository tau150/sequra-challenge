import { useEffect, useState } from "react";

import logo from "/images/sequra-logo.png";

import InfoModal from "../InfoModal/InfoModal";

import { mapAgreements } from "./AgreementCard.utils";

import type { Agreement } from "@/modules/credit/domain/Agreement";

import { useGetAgreements } from "@/modules/credit/hooks/useGetAgreements";
import ErrorCard from "@/Components/ErrorCard/ErrorCard";

interface Props {
  amount: string;
}

const AgreementsCard = ({ amount }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInstallment, setSelectedInstallment] = useState<number>(0);
  const { data, isLoading, isError } = useGetAgreements(amount);

  useEffect(() => {
    if (data) {
      setSelectedInstallment(data[0].installments);
    }
  }, [data]);

  if (isError) {
    return <ErrorCard />;
  }

  const fee = data?.find((agreement) => agreement.installments === selectedInstallment)?.fee;

  return (
    <div className="w-96 mt-10 shadow-md rounded-lg">
      <div className="bg-green-100 p-2 flex justify-center">
        <figure>
          <img alt="sequra-logo" className="my-2 w-[80px] " src={logo} />
        </figure>
      </div>
      <div className="p-2">
        <h4 className="align-center text-center text-lg mb-2 text-gray-400">
          More flexibility in your payments
        </h4>
        <div className="flex justify-between">
          <p className="text-sm">Split your payment</p>
          {isLoading ? (
            <div className="skeleton w-12 h-4 rounded-md" />
          ) : (
            <a
              className="text-sm underline text-green-400 cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              More info
            </a>
          )}
        </div>
        <div className="mt-4">
          {isLoading ? (
            <div className="skeleton w-full h-12 rounded-md" />
          ) : (
            <select
              className="border-color w-full ring-1 ring-green-400/50 rounded-sm p-2 my-2"
              value={selectedInstallment}
              onChange={(e) => setSelectedInstallment(Number(e.target.value))}
            >
              {mapAgreements(data as Agreement[])}
            </select>
          )}
        </div>
      </div>
      <InfoModal fee={fee as string} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default AgreementsCard;
