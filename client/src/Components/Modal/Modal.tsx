import { useRef } from "react";
import { IoMdClose } from "react-icons/io";

import Portal from "@/Components/Portal/Portal";
import { useClickOutside } from "@/hooks/useClickOutside";

interface Props {
  isOpen: boolean;
  handleClose: VoidFunction;
  children: React.ReactNode;
}

const Modal = ({ children, isOpen, handleClose }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useClickOutside(modalRef, handleClose);

  if (!isOpen) return null;

  return (
    <Portal>
      <div className="w-full h-full fixed bottom-0 top-0 left-0 right-0 h-100 z-10 flex justify-center items-center bg-black bg-opacity-50">
        <div
          ref={modalRef}
          className="w-full h-full bg-white p-5 relative z-20 md:w-4/12 md:min-h-[60%] md:h-fit animate-fadeIn"
        >
          <IoMdClose
            className="absolute right-5 size-6 cursor-pointer"
            data-testid="close-icon"
            onClick={handleClose}
          />
          {children}
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
