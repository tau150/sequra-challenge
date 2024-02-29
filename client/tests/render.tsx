/* eslint-disable react-refresh/only-export-components */
import * as React from "react";
import { RenderResult, render as rtlRender } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface Props {
  children: React.ReactNode;
}

function AppProviders({ children }: Props) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <>
        {children}
        <div id="sequra-modal-root" />
      </>
    </QueryClientProvider>
  );
}

export function render(ui: React.ReactNode, ...renderOptions: unknown[]): RenderResult {
  const returnValue = {
    ...rtlRender(ui, { wrapper: AppProviders, ...renderOptions }),
  };

  return returnValue;
}

export * from "@testing-library/react";
