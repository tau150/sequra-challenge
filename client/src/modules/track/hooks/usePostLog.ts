import { useMutation, UseMutationResult } from "@tanstack/react-query";

import type { LogEvent } from "@/modules/track/domain/LogEvent";

import httpLogService from "@/modules/track/services/httpLogService";

interface Params {
  onError: VoidFunction;
}

export const usePostLog = ({
  onError,
}: Params): UseMutationResult<Record<string, never>, Error, LogEvent, unknown> => {
  return useMutation({
    mutationFn: httpLogService.post,
    onError,
  });
};
