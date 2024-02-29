/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useEffect,
  useState,
  forwardRef,
  cloneElement,
  ReactElement,
  JSXElementConstructor,
} from "react";
import { createPortal } from "react-dom";

interface Props {
  children: ReactElement<any, string | JSXElementConstructor<any>>;
  id?: string;
}

const Portal = forwardRef(({ children, id = "#sequra-modal-root" }: Props, ref) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  return mounted
    ? createPortal(cloneElement(children, { ref }), document.querySelector(id) as HTMLElement)
    : null;
});

Portal.displayName = "Portal";

export default Portal;
