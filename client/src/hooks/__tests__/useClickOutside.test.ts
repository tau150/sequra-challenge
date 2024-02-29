import { userEvent } from "@testing-library/user-event";
import { renderHook } from "@testing-library/react";
import { expect, vi } from "vitest";

import { useClickOutside } from "../useClickOutside";

describe("useClickOutside", () => {
  beforeEach(() => vi.clearAllMocks());
  const callback = vi.fn();

  it("should call the callback when clicking outside the element", async () => {
    const user = userEvent.setup();

    renderHook(() => useClickOutside({ current: document.createElement("div") }, callback));

    await user.click(document.body);

    expect(callback).toHaveBeenCalled();
  });

  it("should not call the callback when clicking inside the element", async () => {
    const user = userEvent.setup();

    const targetElement = document.createElement("div");

    renderHook(() => useClickOutside({ current: targetElement }, callback));

    user.click(targetElement);

    expect(callback).not.toHaveBeenCalled();
  });
});
