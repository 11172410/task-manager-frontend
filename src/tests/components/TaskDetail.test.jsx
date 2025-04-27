import { render, screen } from "@testing-library/react";
import React from "react";
import TaskDetail from "../../components/TaskDetail";

// Mock API call outside of test suite
vi.mock("../../api/axiosDefaults", () => ({
  default: {
    get: vi.fn(),
  },
}));

import api from "../../api/axiosDefaults";
import { expect, vi } from "vitest";

describe("TaskDetail", () => {
  const task = {
    id: 1,
    title: "test 1",
    due_date: "2025-05-01",
    due_time: "00:00",
  };

  it("should render the task information", async () => {
    api.get.mockResolvedValue({ data: task });
    render(<TaskDetail taskId={task.id} triggerRefresh={false} />);

    expect(await screen.findByText("test 1")).toBeInTheDocument();
    expect(
      await screen.findByText("No description available"),
    ).toBeInTheDocument();
    expect(await screen.findByText("1 May 2025 | 00:00")).toBeInTheDocument();
  });
});
