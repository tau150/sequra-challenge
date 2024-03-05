import { useState, useEffect, useCallback } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CSSProperties } from "react";

import ErrorBoundary from "@/Components/ErrorBoundary/ErrorBoundary";
import AgreementsCard from "@/modules/credit/Components/AgreementsCard/AgreementsCard";
import { EVENT_SET_AMOUNT } from "@/Components/Widget/constants/index";

interface Props {
  amount?: string;
  isWidget?: boolean;
  style?: CSSProperties;
}

interface SetAmountEvent extends CustomEvent {
  detail: {
    amount: string;
  };
}

const Widget = ({ amount, isWidget = false, style }: Props) => {
  const [uncontrolledAmount, setUncontrolledAmount] = useState(amount);
  const queryClient = new QueryClient();

  const listener: EventListener = useCallback((event: Event) => {
    setUncontrolledAmount((event as SetAmountEvent).detail.amount);
  }, []);

  useEffect(() => {
    if (isWidget) {
      document.addEventListener(EVENT_SET_AMOUNT, listener);
    }

    () => isWidget && document.removeEventListener(EVENT_SET_AMOUNT, listener);
  }, [isWidget, listener]);

  useEffect(() => {
    setUncontrolledAmount(amount);
  }, [amount]);

  const finalAmount = isWidget ? uncontrolledAmount : amount;

  if (!finalAmount) {
    return null;
  }

  return (
    <>
      <div style={style}>
        <ErrorBoundary>
          <QueryClientProvider client={queryClient}>
            <AgreementsCard amount={finalAmount} />
          </QueryClientProvider>
        </ErrorBoundary>
      </div>
      <div id="sequra-modal-root" />
    </>
  );
};

export default Widget;
