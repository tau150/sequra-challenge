import { render, screen } from "@testing-library/react";

import { mapAgreements } from "../AgreementCard.utils";

import { Agreement } from "@/modules/credit/domain/Agreement";

describe("mapAgreements util", () => {
  it("maps agreements to options correctly", () => {
    const agreements: Agreement[] = [
      { installments: 3, amount: "100", total: "105", fee: "5" },
      { installments: 6, amount: "150", total: "155", fee: "5" },
    ];

    render(<select>{mapAgreements(agreements)}</select>);

    agreements.forEach((agreement, index) => {
      const option = screen.getAllByRole("option")[index];

      expect(option).toBeInTheDocument();
      expect(option.textContent).toBe(
        `${agreement.installments} installments of ${agreement.amount}/month`,
      );
    });
  });
});
