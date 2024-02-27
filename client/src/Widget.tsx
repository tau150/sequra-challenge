import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CSSProperties } from "react";

import ErrorBoundary from "@/Components/ErrorBoundary/ErrorBoundary";
import AgreementsCard from "@/modules/credit/Components/AgreementsCard/AgreementsCard";

interface Props {
  amount: string;
  style?: CSSProperties;
}

const Widget = ({ amount, style }: Props) => {
  const queryClient = new QueryClient();

  return (
    <div style={style}>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <div>
            <AgreementsCard amount={amount} />
          </div>
        </QueryClientProvider>
      </ErrorBoundary>
    </div>
  );
};

export default Widget;
