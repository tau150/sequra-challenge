import { renderWidget, setAmount } from "../src/main";
import "tailwindcss/tailwind.css";

const module = {
  renderWidget,
  setAmount,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).Sequra = module;

export default module;
