import { useQuery } from "@tanstack/react-query";

import httpCreditService from "@/modules/credit/services/httpCreditService";

export const QUERY_KEY = "agreements";

export const useGetAgreements = (value: string) => {
  return useQuery({
    queryFn: () => httpCreditService.agreements(value),
    queryKey: [QUERY_KEY, value],
    staleTime: Infinity,
  });
};
