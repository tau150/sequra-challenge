export enum EventContext {
  CHECKOUT_WIDGET = "checkoutWidget",
}

export enum EventType {
  SIMULATOR_INSTALLMENT_CHANGE = "simulatorInstalmentChanged",
  SIMULATOR_INSTALLMENT_MODAL_OPEN = "simulatorModalOpen",
}

export interface LogEvent {
  context: EventContext;
  type: EventType;
  [key: string]: string;
}
