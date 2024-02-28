import { useState, useEffect, useCallback } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CSSProperties } from "react";

import ErrorBoundary from "@/Components/ErrorBoundary/ErrorBoundary";
import AgreementsCard from "@/modules/credit/Components/AgreementsCard/AgreementsCard";
import { EVENT_SET_AMOUNT } from "@/Components/Widget/constants/index";

interface Props {
  initialAmount?: string;
  isWidget?: boolean;
  style?: CSSProperties;
}

interface SetAmountEvent extends CustomEvent {
  detail: {
    amount: string;
  };
}

const Widget = ({ initialAmount, isWidget = false, style }: Props) => {
  const [amount, setAmount] = useState(initialAmount);
  const queryClient = new QueryClient();

  const listener: EventListener = useCallback((event: Event) => {
    setAmount((event as SetAmountEvent).detail.amount);
  }, []);

  useEffect(() => {
    if (isWidget) {
      document.addEventListener(EVENT_SET_AMOUNT, listener);
    }

    () => isWidget && document.removeEventListener(EVENT_SET_AMOUNT, listener);
  }, [isWidget, listener]);

  useEffect(() => {
    setAmount(initialAmount);
  }, [initialAmount]);

  const finalAmount = isWidget ? amount : initialAmount;

  if (!finalAmount) {
    return null;
  }

  return (
    <>
      <div style={style}>
        <ErrorBoundary>
          <QueryClientProvider client={queryClient}>
            <div>{finalAmount && <AgreementsCard amount={finalAmount} />}</div>
          </QueryClientProvider>
        </ErrorBoundary>
      </div>
      <div id="sequra-modal-root" />
    </>
  );
};

export default Widget;
