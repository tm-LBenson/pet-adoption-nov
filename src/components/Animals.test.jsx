import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Animals from "./Animals";

describe("Animals Component", () => {
  it("shows the no-pets message when the array is empty", () => {
    render(
      <Animals
        animals={[]}
        title="random string"
        nopets="No pets here"
        onDelete={vi.fn()}
        onAdoptToggle={vi.fn()}
        onEditImage={vi.fn()}
      />,
    );

    expect(screen.getByText("No pets here")).toBeInTheDocument();
  });

  it("shows the no-pets message when the array has pets", () => {
    const samplePets = [
      {
        species: "Dog",
        vaccinated: true,
        imageUrl: "https://placebear.com/300/400",
        kidFriendly: false,
        id: 1,
        adopted: false,
        name: "Bob",
        age: "11",
      },
      {
        species: "Bird",
        vaccinated: true,
        imageUrl: "https://placebear.com/300/400",
        kidFriendly: false,
        id: "1d0d070",
        adopted: false,
        name: "Dave",
        age: "110",
      },
      {
        species: "Cat",
        vaccinated: true,
        imageUrl: "https://example.com/300/400",
        kidFriendly: false,
        id: "1d0d0709-a253-49fe-8ddb-fcca2bbae3ab",
        adopted: false,
        name: "Bob",
        age: "11",
      },
    ];
    render(
      <Animals
        animals={samplePets}
        title="random string"
        nopets="No pets here"
        onDelete={vi.fn()}
        onAdoptToggle={vi.fn()}
        onEditImage={vi.fn()}
      />,
    );
    expect(screen.getAllByText("🗑️")).toHaveLength(3);
    expect(screen.getAllByText("🗑️")[0]).toBeInTheDocument();

  });
});
