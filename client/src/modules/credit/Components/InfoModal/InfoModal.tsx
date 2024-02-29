import { LuDivideCircle } from "react-icons/lu";
import { CiCreditCard1 } from "react-icons/ci";
import { MdDoneAll } from "react-icons/md";

import logo from "/images/sequra-logo.png";

import Modal from "@/Components/Modal/Modal";

interface Props {
  isOpen: boolean;
  fee: string;
  onClose: () => void;
}

const InfoModal = ({ isOpen, fee, onClose }: Props) => {
  return (
    <Modal handleClose={onClose} isOpen={isOpen}>
      <div className="mt-4 p-2">
        <figure className="flex justify-center">
          <img alt="sequra-logo" className="my-2 w-[120px] " src={logo} />
        </figure>
        <h1 className="font-bold text-lg text-center mt-4">Fracciona tu pago</h1>
      </div>
      <div className="flex items-center justify-around mt-8 p-4">
        <p className="font-semibold text-lg max-w-80">
          Fracciona tu pago solo con un coste fijo por cuota.
        </p>
        <LuDivideCircle className="size-10 text-green-500" />
      </div>
      <div className="flex items-center justify-around  mt-8 p-4">
        <p className="font-semibold text-lg max-w-80">Ahora solo pagas la primera cuota.</p>
        <MdDoneAll className="size-10 text-green-500" />
      </div>
      <div className="flex items-center justify-around  mt-8 p-4">
        <p className="font-semibold text-lg max-w-80">
          El resto de los pagos se cargarán automáticamente a tu tarjeta.
        </p>
        <CiCreditCard1 className="size-10 text-green-500" />
      </div>
      <p className="mt-20 text-center">
        Además en el importe mostrado ya se incluye la cuota única mensual de {fee}/mes, por lo que
        no tendrás ninguna sorpresa.
      </p>
    </Modal>
  );
};

export default InfoModal;
