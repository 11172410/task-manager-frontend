import { render, screen } from "@testing-library/react";
import { it, expect, describe } from "vitest";
import TaskList from "../../components/TaskList";
import "@testing-library/jest-dom/vitest";
import React from "react";

describe("TaskList", () => {
  it("should render the heading Task List", () => {
    render(<TaskList />);

    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
  });
});
