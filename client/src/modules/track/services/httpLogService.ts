import type { LogEvent } from "@/modules/track/domain/LogEvent";

import fetcher from "@/utils/fetcher";
import { HttpMethod } from "@/utils/fetcher";
import { URLS_SEGMENTS } from "@/modules/credit/constants/index";

const httpLogService = {
  post: async (data: LogEvent): Promise<Record<string, never>> =>
    fetcher(`${URLS_SEGMENTS.EVENTS}`, {
      method: HttpMethod.POST,
      body: data,
    }),
};

export default httpLogService;
