import { fireEvent, screen } from "@testing-library/react";
import { vi , expect, describe, it } from "vitest"
import { renderComponent } from "testHelpers/renderHelpers";
import { ConfirmDialog } from "./ConfirmDialog";

describe("ConfirmDialog", () => {
  it("onClose is called when cancelled", () => {
    // Given
    const onCloseMock = vi.fn();
    const props = {
      cancelText: "CANCEL",
      hideCancel: false,
      onClose: onCloseMock,
      open: true,
      title: "Test",
    };

    // When
    renderComponent(<ConfirmDialog {...props} />);
    fireEvent.click(screen.getByText("CANCEL"));

    // Then
    expect(onCloseMock).toBeCalledTimes(1);
  });

  it("onConfirm is called when confirmed", () => {
    // Given
    const onCloseMock = vi.fn();
    const onConfirmMock = vi.fn();
    const props = {
      cancelText: "CANCEL",
      confirmText: "CONFIRM",
      hideCancel: false,
      onClose: onCloseMock,
      onConfirm: onConfirmMock,
      open: true,
      title: "Test",
    };

    // When
    renderComponent(<ConfirmDialog {...props} />);
    fireEvent.click(screen.getByText("CONFIRM"));

    // Then
    expect(onCloseMock).toBeCalledTimes(0);
    expect(onConfirmMock).toBeCalledTimes(1);
  });
});
