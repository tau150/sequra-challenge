import type { Agreement } from "../domain/Agreement";

import creditAdapter, { AgreementResponse } from "@/modules/credit/adapters/creditAdapter";
import fetcher from "@/utils/fetcher";
import { URLS_SEGMENTS } from "@/modules/credit/constants/index";

const httpCreditService = {
  agreements: async (value: string): Promise<Agreement[]> => {
    const response: AgreementResponse = await fetcher(`${URLS_SEGMENTS.AGREEMENTS}${value}`);

    return creditAdapter.agreement(response);
  },
};

export default httpCreditService;
