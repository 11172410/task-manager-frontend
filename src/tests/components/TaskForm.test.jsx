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
});
