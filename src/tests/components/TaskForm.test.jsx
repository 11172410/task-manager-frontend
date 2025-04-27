import React from "react";
import { describe, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import TaskForm from "../../components/TaskForm";

vi.mock("../../api/axiosDefaults", () => ({
  default: {
    get: vi.fn(),
  },
}));

import api from "../../api/axiosDefaults";

describe("TaskForm", () => {
  it("should render empty fields when creating a task", () => {
    render(<TaskForm triggerRefresh={vi.fn()} clearTaskToEdit={vi.fn()} />);

    const titleInput = screen.getByLabelText(/title/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    const dueDateInput = screen.getByLabelText(/due date/i);
    const dueTimeInput = screen.getByLabelText(/time/i);

    expect(titleInput).toHaveValue("");
    expect(descriptionInput).toHaveValue("");
    expect(dueDateInput).toHaveValue("");
    expect(dueTimeInput).toHaveValue("");
  });

  it("should automatically fill out form fields when editing a task", () => {
    const mockTask = {
      id: 1,
      title: "Edit Task",
      description: "Edit this description",
      due_date: "2025-05-01",
      due_time: "14:00",
    };

    render(
      <TaskForm
        taskToEdit={mockTask}
        triggerRefresh={vi.fn()}
        clearTaskToEdit={vi.fn()}
      />,
    );

    const titleInput = screen.getByLabelText(/title/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    const timeInputs = screen.getAllByPlaceholderText("00");

    expect(titleInput).toHaveValue(mockTask.title);
    expect(descriptionInput).toHaveValue(mockTask.description);

    expect(timeInputs.length).toBe(2);
    expect(timeInputs[0]).toHaveValue(14);
    expect(timeInputs[1]).toHaveValue(0);

    screen.debug();
  });
});
