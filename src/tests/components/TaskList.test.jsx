import { render, screen } from "@testing-library/react";
import TaskList from "../../components/TaskList";
import React from "react";
import { expect, vi } from "vitest";

// Mock API call outside of test suite
vi.mock("../../api/axiosDefaults", () => ({
  default: {
    get: vi.fn(),
  },
}));

import api from "../../api/axiosDefaults";

describe("TaskList", () => {
  const tasks = [
    { id: 1, title: "test 1", due_date: "2025-05-01", due_time: "00:00" },
    { id: 2, title: "test 2", due_date: "2025-05-02", due_time: "13:00" },
  ];

  it("should render the heading Task List", () => {
    render(<TaskList />);

    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
  });

  it("should render tasks with titles, dates and times", async () => {
    api.get.mockResolvedValue({ data: tasks });
    render(<TaskList onTaskClick={vi.fn()} refreshTrigger={false} />);

    // Titles
    expect(await screen.findByText("test 1")).toBeInTheDocument();
    expect(await screen.findByText("test 2")).toBeInTheDocument();

    // Dates
    expect(await screen.findByText("1 May 2025 00:00")).toBeInTheDocument();
    expect(await screen.findByText("2 May 2025 13:00")).toBeInTheDocument();
  });

  it("renders a View button for each task after loading", async () => {
    api.get.mockResolvedValue({ data: tasks });

    render(<TaskList onTaskClick={vi.fn()} refreshTrigger={false} />);

    // 2) await the buttons to show up:
    const viewButtons = await screen.findAllByRole("button", { name: /view/i });
    expect(viewButtons).toHaveLength(tasks.length);
  });
});
