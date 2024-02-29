import type { Agreement } from "@/modules/credit/domain/Agreement";

interface AgreementProperty {
  value: number;
  string: string;
}

interface AgreementResponseEntity {
  instalment_count: number;
  apr: AgreementProperty;
  total_with_tax: AgreementProperty;
  cost_of_credit: AgreementProperty;
  cost_of_credit_pct: AgreementProperty;
  grand_total: AgreementProperty;
  max_financed_amount: AgreementProperty;
  instalment_amount: AgreementProperty;
  instalment_fee: AgreementProperty;
  instalment_total: AgreementProperty;
}

export type AgreementResponse = AgreementResponseEntity[];

const creditAdapter = {
  agreement: (agreements: AgreementResponse): Agreement[] => {
    return agreements.map((agreement) => ({
      installments: agreement.instalment_count,
      fee: agreement.instalment_fee.string,
      amount: agreement.instalment_amount.string,
      total: agreement.total_with_tax.string,
    }));
  },
};

export default creditAdapter;
