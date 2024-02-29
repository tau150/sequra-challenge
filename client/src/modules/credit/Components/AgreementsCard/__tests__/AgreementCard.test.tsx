import { expect, vi, Mock } from "vitest";
import { render, screen } from "tests/render";
import userEvent from "@testing-library/user-event";

import AgreementsCard from "../AgreementsCard";

import { EventType, EventContext } from "@/modules/logs/domain/LogEvent";
import { useGetAgreements } from "@/modules/credit/hooks/useGetAgreements";
import { usePostLog } from "@/modules/logs/hooks/usePostLog";

const mockedMutate = vi.fn();

vi.mock("@/modules/credit/hooks/useGetAgreements");
vi.mock("@/modules/logs/hooks/usePostLog");

const mockedData = [
  {
    installments: 3,
    fee: "5 euros",
    amount: "300",
    total: "1200",
  },
  {
    installments: 6,
    fee: "10 euros",
    amount: "300",
    total: "1200",
  },
];

(useGetAgreements as Mock).mockImplementation(() => ({
  isLoading: false,
  data: mockedData,
  isError: false,
}));

(usePostLog as Mock).mockImplementation(() => ({ mutate: mockedMutate }));

describe("AgreementsCard Component", () => {
  it("renders without crashing", () => {
    render(<AgreementsCard amount="100" />);
    expect(screen.getByText("Divide tu pago")).toBeInTheDocument();
  });

  it('opens modal on clicking "Más info", this will show just when there are data available', async () => {
    const user = userEvent.setup();

    render(<AgreementsCard amount="100" />);
    const moreInfoLink = screen.getByText("Más info");

    await user.click(moreInfoLink);

    expect(screen.getByText("Fracciona tu pago")).toBeInTheDocument();
    expect(
      screen.getByText(
        `Además en el importe mostrado ya se incluye la cuota única mensual de ${mockedData[0].fee}/mes, por lo que no tendrás ninguna sorpresa.`,
      ),
    ).toBeInTheDocument();
  });

  it('opens modal on clicking "Más info", should dispatch log event', async () => {
    const user = userEvent.setup();

    render(<AgreementsCard amount="100" />);
    const moreInfoLink = screen.getByText(/Más info/i);

    await user.click(moreInfoLink);

    expect(mockedMutate).toHaveBeenCalledWith({
      context: EventContext.CHECKOUT_WIDGET,
      type: EventType.SIMULATOR_INSTALLMENT_MODAL_OPEN,
    });
  });

  it('opens modal on clicking "Más info", close modal when x is clicked', async () => {
    const user = userEvent.setup();

    render(<AgreementsCard amount="100" />);
    const moreInfoLink = screen.getByText("Más info");

    await user.click(moreInfoLink);

    expect(screen.getByText("Fracciona tu pago")).toBeInTheDocument();

    const closeIcon = screen.getByTestId("close-icon");

    await user.click(closeIcon);

    expect(screen.queryByText("Fracciona tu pago")).not.toBeInTheDocument();
  });

  it("changes installment value on selecting from dropdown and log event", async () => {
    const user = userEvent.setup();

    render(<AgreementsCard amount="100" />);
    const dropdown = screen.getByRole("combobox");

    await user.selectOptions(dropdown, screen.getByRole("option", { name: "6 cuotas de 300/mes" }));

    expect(dropdown).toHaveValue("6");

    expect(mockedMutate).toHaveBeenCalledWith({
      context: EventContext.CHECKOUT_WIDGET,
      type: EventType.SIMULATOR_INSTALLMENT_CHANGE,
      selectedInstalment: "6",
    });
  });

  it("displays error card when isError prop is true", () => {
    (useGetAgreements as Mock).mockImplementation(() => ({
      isLoading: false,
      data: null,
      isError: true,
    }));

    render(<AgreementsCard amount="100" />);
    expect(
      screen.getByText(/It seems something went wrong, please try again later/i),
    ).toBeInTheDocument();
  });

  it("select and more info link should not be visible when data is being fetch", () => {
    (useGetAgreements as Mock).mockImplementation(() => ({
      isLoading: true,
      data: null,
      isError: false,
    }));

    render(<AgreementsCard amount="100" />);
    expect(
      screen.queryByText(/It seems something went wrong, please try again later/i),
    ).not.toBeInTheDocument();
    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
    expect(screen.queryByText(/Más info/i)).not.toBeInTheDocument();
  });
});
