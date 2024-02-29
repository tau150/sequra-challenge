import type { Agreement } from "@/modules/credit/domain/Agreement";

export const mapAgreements = (agreements: Agreement[]) => {
  return agreements.map((agreement) => {
    return (
      <option key={agreement.installments} value={agreement.installments}>
        {agreement.installments} cuotas de {agreement.amount}/mes
      </option>
    );
  });
};
