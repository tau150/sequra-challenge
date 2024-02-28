import { render, screen } from "@testing-library/react";
import { expect } from "vitest";

import Portal from "../Portal";

describe("Portal", () => {
  const root = document.createElement("div");
  const content = "some test text";

  root.setAttribute("id", "modal-root");

  beforeEach(() => {
    document.body.appendChild(root);
  });

  it("renders children into a portal", () => {
    render(
      <Portal>
        <div>{content}</div>
      </Portal>,
      { container: root },
    );

    const portalContent = document.querySelector("#modal-root div");

    expect(portalContent).toBeInTheDocument();
    expect(screen.getByText(content)).toBeInTheDocument();
  });

  it("renders into a specified portal container", () => {
    const customPortalId = "custom-portal";
    const customPortalContainer = document.createElement("div");

    customPortalContainer.id = customPortalId;
    document.body.appendChild(customPortalContainer);

    render(
      <Portal id={`#${customPortalId}`}>
        <div>{content}</div>
      </Portal>,
      { container: root },
    );

    const portalContent = document.querySelector(`#${customPortalId} div`);

    expect(portalContent).toBeInTheDocument();
    expect(screen.getByText(content)).toBeInTheDocument();
  });

  it("does not render if not mounted", () => {
    const { unmount } = render(
      <Portal>
        <div>Test Content</div>
      </Portal>,
      { container: root },
    );

    unmount();

    const portalContent = document.querySelector("#modal-root div");

    expect(portalContent).toBeNull();
  });
});
