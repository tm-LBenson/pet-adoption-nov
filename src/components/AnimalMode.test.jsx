import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import AnimalModal from "./AnimalModal";

describe("Testing the modal", () => {
  const baseProps = {
    show: true,
    form: {
      name: "",
      species: "",
      age: "",
      kidFriendly: false,
      vaccinated: false,
      imageUrl: "",
    },
    onHide: vi.fn(),
    onSave: vi.fn(),
    onChange: vi.fn(),
  };

  it("Renders to the page when props are true", () => {
    render(<AnimalModal {...baseProps} />);

    expect(screen.getByText("Add New Animal")).toBeInTheDocument();
  });
});
