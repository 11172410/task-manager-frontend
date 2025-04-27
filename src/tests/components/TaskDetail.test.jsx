import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, expect, vi } from "vitest";
import React from "react";
import TaskDetail from "../../components/TaskDetail";

// Mock API call outside of test suite
vi.mock("../../api/axiosDefaults", () => ({
  default: {
    get: vi.fn(),
    patch: vi.fn(),
  },
}));

import api from "../../api/axiosDefaults";

describe("TaskDetail", () => {
  const task = {
    id: 1,
    title: "test 1",
    due_date: "2025-05-01",
    due_time: "00:00",
    status: false,
  };

  //   Clears previous mock calls to avoid unexpected behaviour
  beforeEach(() => {
    api.patch.mockClear();
  });

  it("should render the task information", async () => {
    api.get.mockResolvedValue({ data: task });
    render(<TaskDetail taskId={task.id} triggerRefresh={false} />);

    expect(await screen.findByText("test 1")).toBeInTheDocument();
    expect(
      await screen.findByText("No description available"),
    ).toBeInTheDocument();
    expect(await screen.findByText("1 May 2025 | 00:00")).toBeInTheDocument();
  });

  it("should call the API with patch an update UI when checkbox is checked and unchecked", async () => {
    // Simulates patch request when task is marked completed
    api.patch.mockResolvedValue({ data: { ...task, status: true } });

    render(
      <TaskDetail
        taskId={task.id}
        taskDetail={task}
        onEditTask={vi.fn()}
        triggerRefresh={vi.fn()}
        onCloseTask={vi.fn()}
      />,
    );

    // Loads task detail first before attempting to complete task
    await waitFor(() => expect(screen.getByText("test 1")).toBeInTheDocument());

    // Gets checkbox and expects it to be unchecked initially as status is false
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();

    // Simulate checking the box
    fireEvent.click(checkbox);

    // Wait for the api patch to call to be made
    await waitFor(() => {
      expect(api.patch).toHaveBeenCalledTimes(1);
    });
    // Set the status of the selected task to true when checking teh box and send it to the api
    expect(api.patch).toHaveBeenCalledWith(`/tasks/${task.id}/`, {
      status: true,
    });
    // Expect the checkbox to now be checked
    expect(checkbox).toBeChecked();

    // Simulate unchecking the box again
    fireEvent.click(checkbox);
    // Wait for the mock API call to be made again
    await waitFor(() => expect(api.patch).toHaveBeenCalledTimes(2));
    // Check if the API was called with the correct payload (status: false)
    expect(api.patch).toHaveBeenCalledWith(`/tasks/${task.id}/`, {
      status: false,
    });
    // Check that the checkbox is now unchecked again
    expect(checkbox).not.toBeChecked();
  });

  it("should revert the UI if API patch fails", async () => {
    // Mock the API response for patch request failure
    api.patch.mockRejectedValue(new Error("API Error"));

    render(
      <TaskDetail
        taskId={task.id}
        taskDetail={task}
        onEditTask={vi.fn()}
        triggerRefresh={vi.fn()}
        onCloseTask={vi.fn()}
      />,
    );

    // Loads task detail first before attempting to complete task
    await waitFor(() => expect(screen.getByText("test 1")).toBeInTheDocument());

    // Get the checkbox element
    const checkbox = screen.getByRole("checkbox");
    // Initially, the task status is false, so the checkbox should be unchecked
    expect(checkbox).not.toBeChecked();
    // Simulate clicking the checkbox to check it
    fireEvent.click(checkbox);
    // Wait for the mock API call to be made
    await waitFor(() => expect(api.patch).toHaveBeenCalledTimes(1));
    // Check that the checkbox is unchecked again because the patch failed
    expect(checkbox).not.toBeChecked();
  });
});
