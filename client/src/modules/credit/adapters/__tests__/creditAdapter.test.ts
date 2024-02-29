import { expect } from "vitest";

import creditAdapter from "../creditAdapter";

describe("creditAdapter", () => {
  describe("agreement", () => {
    it("transforms AgreementResponseEntity to Agreement", () => {
      const agreementsResponse = [
        {
          instalment_count: 12,
          apr: { value: 5, string: "5%" },
          total_with_tax: { value: 1200, string: "1200 USD" },
          cost_of_credit: { value: 200, string: "200 USD" },
          cost_of_credit_pct: { value: 20, string: "20%" },
          grand_total: { value: 1400, string: "1400 USD" },
          max_financed_amount: { value: 1500, string: "1500 USD" },
          instalment_amount: { value: 100, string: "100 USD" },
          instalment_fee: { value: 10, string: "10 USD" },
          instalment_total: { value: 110, string: "110 USD" },
        },
        {
          instalment_count: 24,
          apr: { value: 6, string: "6%" },
          total_with_tax: { value: 2400, string: "2400 USD" },
          cost_of_credit: { value: 400, string: "400 USD" },
          cost_of_credit_pct: { value: 25, string: "25%" },
          grand_total: { value: 2800, string: "2800 USD" },
          max_financed_amount: { value: 3000, string: "3000 USD" },
          instalment_amount: { value: 90, string: "90 USD" },
          instalment_fee: { value: 15, string: "15 USD" },
          instalment_total: { value: 105, string: "105 USD" },
        },
      ];

      const expectedAgreements = [
        { installments: 12, fee: "10 USD", amount: "100 USD", total: "1200 USD" },
        { installments: 24, fee: "15 USD", amount: "90 USD", total: "2400 USD" },
      ];

      const result = creditAdapter.agreement(agreementsResponse);

      expect(result).toEqual(expectedAgreements);
    });
  });
});
