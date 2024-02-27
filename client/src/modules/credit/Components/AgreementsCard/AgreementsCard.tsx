import logo from "/images/sequra-logo.png";

import { useGetAgreements } from "@/modules/credit/hooks/useGetAgreements";
interface Props {
  amount: string;
}
const AgreementsCard = ({ amount }: Props) => {
  const { data, isLoading } = useGetAgreements(amount);

  return (
    <div className="card card-compact w-96 bg-green-100 mt-10 shadow-sm">
      <figure>
        <img alt="sequra-logo" className="my-2 w-[80px]" src={logo} />
      </figure>
      <div className="card-body bg-white">
        <h4 className="align-center text-center text-lg mb-2">Más flexibilidad en tus pagos</h4>
        <div className="flex">
          <p>Págalo en</p>
          <a className="link link-accent">Más info</a>
        </div>

        <div className="mt-4">
          {isLoading ? (
            <div className="skeleton w-32 h-32" />
          ) : (
            <select className="select select-accent w-full">
              {data?.map((agreement) => {
                return (
                  <option key={agreement.installments}>
                    {agreement.installments} cuotas de {agreement.amount}/mes
                  </option>
                );
              })}
            </select>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgreementsCard;
