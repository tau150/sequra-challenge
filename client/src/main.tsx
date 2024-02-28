import React from "react";
import ReactDOM from "react-dom/client";

import Widget from "@/Components/Widget/Widget";
import "./index.css";
import { EVENT_SET_AMOUNT, WIDGET_ID } from "@/Components/Widget/constants/index";

ReactDOM.createRoot(document.getElementById(WIDGET_ID)!).render(
  <React.StrictMode>
    <Widget isWidget initialAmount="39999" />
  </React.StrictMode>,
);

export const renderWidget = (initialAmount?: string) => {
  ReactDOM.createRoot(document.getElementById(WIDGET_ID)!).render(
    <React.StrictMode>
      <Widget isWidget initialAmount={initialAmount} />
    </React.StrictMode>,
  );
};

export const setAmount = (amount: string) => {
  const event = new CustomEvent(EVENT_SET_AMOUNT, {
    detail: { amount: amount },
  });

  document.dispatchEvent(event);
};
