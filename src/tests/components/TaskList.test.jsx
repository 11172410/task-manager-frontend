import { render, screen } from "@testing-library/react";
import TaskList from "../../components/TaskList";
import React from "react";

describe("TaskList", () => {
  it("should render the heading Task List", () => {
    render(<TaskList />);

    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
  });
});
