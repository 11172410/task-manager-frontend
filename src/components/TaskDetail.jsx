import { Button, Card, Checkbox, Label } from "flowbite-react";
import { RiErrorWarningLine } from "react-icons/ri";

import React, { useState, useEffect } from "react";
import api from "../api/axiosDefaults";
import { formatDate } from "../functions/dateFormats";
import LoadingSpinner from "./LoadingSpinner";
import { SuccessToast } from "../functions/toasts";
import DeleteModal from "./DeleteModal";

function TaskDetail({ className = "", taskId, onEditTask }) {
  const [taskDetail, setTaskDetail] = useState({
    title: "",
    description: "",
    due_date: "",
    due_time: "",
    status: false,
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { title, description, due_date, due_time, status } = taskDetail;

  const formattedDate = formatDate(due_date);
  const now = new Date();
  const dueDateObj = new Date(due_date);
  const isOverdue = now > dueDateObj;

  useEffect(() => {
    if (taskId) {
      const handleMount = async () => {
        try {
          const { data } = await api.get(`/tasks/${taskId}/`);
          setTaskDetail(data);
          setIsLoaded(true);
        } catch (error) {
          console.log(error);
        }
      };
      handleMount();
    }

    setIsLoaded(false);
  }, [taskId]);

  // Instant UI update while the API awaits the patch request
  const handleCheckboxChange = async () => {
    const newStatus = !status;
    setTaskDetail((prevDetail) => ({
      ...prevDetail,
      status: newStatus,
    }));
    try {
      await api.patch(`/tasks/${taskId}/`, {
        status: newStatus,
      });
    } catch (error) {
      console.log("Error updating status:", error);
      // If API fails to update task, revert UI
      setTaskDetail((prevDetail) => ({
        ...prevDetail,
        status: !newStatus,
      }));
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/tasks/${taskId}/`);
      SuccessToast("Task deleted!");
      setShowDeleteModal(false);
      // Will refresh page after deletion so task list is updated
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Card className="max-w-sm">
        {isLoaded ? (
          <>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900">
              {title}{" "}
              {!status && isOverdue && (
                <span className="flex items-center font-light text-base text-red-500 gap-1 justify-center">
                  <RiErrorWarningLine />
                  Overdue
                </span>
              )}
            </h5>
            <p
              className={`font-normal ${description ? "text-gray-700" : "text-gray-400"}`}
            >
              {description ? description : "No description available"}
            </p>
            <p>
              <span className="font-bold">Due: </span>
              <span>
                {formattedDate} | {due_time}
              </span>
            </p>
            <div className="flex items-center gap-2 py-2">
              <Checkbox
                id="task-status"
                checked={status}
                onChange={handleCheckboxChange}
              />
              <label
                htmlFor="task-status"
                className={`${status ? "text-green-500" : "text-gray-700"} text-sm font-medium`}
              >
                {status ? "Completed" : "Mark as Completed"}
              </label>
            </div>

            <div className="flex flex-row gap-2 justify-evenly">
              <Button
                color="alternative"
                onClick={() => onEditTask(taskDetail)}
              >
                Edit
              </Button>
              <Button color="red" onClick={() => setShowDeleteModal(true)}>
                Delete
              </Button>
            </div>
          </>
        ) : (
          <LoadingSpinner />
        )}
      </Card>

      <DeleteModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        handleDelete={handleDelete}
      />
    </>
  );
}

export default TaskDetail;
