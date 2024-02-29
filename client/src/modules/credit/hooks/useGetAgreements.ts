import { useQuery, UseQueryResult } from "@tanstack/react-query";

import type { Agreement } from "@/modules/credit/domain/Agreement";

import httpCreditService from "@/modules/credit/services/httpCreditService";

export const QUERY_KEY = "agreements";

export const useGetAgreements = (value: string): UseQueryResult<Agreement[]> => {
  return useQuery({
    queryFn: () => httpCreditService.agreements(value),
    queryKey: [QUERY_KEY, value],
    staleTime: Infinity,
  });
};
