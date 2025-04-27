import api from "../api/axiosDefaults";
import React, { useEffect, useState } from "react";

// Custom function import
import { SuccessToast, WarningToast } from "../functions/toasts";

// Styling and Flowbite imports
import {
  Button,
  Label,
  TextInput,
  Textarea,
  Datepicker,
  Alert,
  Spinner,
} from "flowbite-react";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { FaPlus, FaSave } from "react-icons/fa";
import { HiInformationCircle } from "react-icons/hi";

function TaskForm({
  className = "",
  taskToEdit,
  clearTaskToEdit,
  triggerRefresh,
}) {
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState({});
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    due_date: new Date(),
    due_time: "",
  });
  const { title, description, due_date, due_time } = taskData;

  useEffect(() => {
    if (taskToEdit) {
      setTaskData({
        title: taskToEdit.title || "",
        description: taskToEdit.description || "",
        due_date: taskToEdit.due_date
          ? new Date(taskToEdit.due_date)
          : new Date(),
        due_time: taskToEdit.due_time || "",
      });
    }
  }, [taskToEdit]);

  // Allows changing of input fields values by creating a copy
  // of the previous data before updating
  const handleChange = (e) => {
    // const { name, value } = e.target;
    setTaskData((prevTaskData) => ({
      ...prevTaskData,
      [e.target.name]: e.target.value,
    }));
  };

  // Separate handler for date picker as it expects a date object rather than a string
  const handleDateChange = (date) => {
    setTaskData((prevTaskData) => ({
      ...prevTaskData,
      due_date: date,
    }));
  };

  // Separate handler for time picker component
  const handleTimeChange = (value) => {
    setTaskData((prevTaskData) => ({
      ...prevTaskData,
      due_time: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Format date into string object for DRF backend
    const formattedDate = due_date.toISOString().split("T")[0];

    // Creates new form data to send to API in POST method
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("due_date", formattedDate);
    formData.append("due_time", due_time);

    try {
      setIsCreating(true);

      if (taskToEdit) {
        await api.patch(`/tasks/${taskToEdit.id}/`, formData);
        SuccessToast("Task updated!");
        triggerRefresh();
      } else {
        await api.post("/tasks/", formData);
        SuccessToast("Task created!");
        triggerRefresh();
      }

      setIsCreating(false);
      // Clears form once task is created
      setTaskData({
        title: "",
        description: "",
        due_date: new Date(),
        due_time: "",
      });
      // Clears any errors on form once submitted
      setError({});
      if (clearTaskToEdit) clearTaskToEdit();
    } catch (error) {
      setError(error.response?.data);
      WarningToast("There was a server error. Please try again.");
      if (error.response.status !== 400) {
      }
      setIsCreating(false);
    }
  };

  return (
    <form
      className={`flex max-w-md flex-col gap-4 bg-neutral-100 border border-stone-200 p-8 rounded-md shadow-sm ${className}`}
      onSubmit={handleSubmit}
    >
      <h1 className="text-3xl">{taskToEdit ? "Edit Task" : "Create Task"}</h1>
      <div>
        <div className="mb-2 block text-left">
          <Label htmlFor="title" className="text-xl">
            Title
          </Label>
        </div>
        <TextInput
          id="title"
          type="text"
          placeholder="New task"
          name="title"
          value={title}
          onChange={handleChange}
          shadow
        />
      </div>

      {/* Error messages for title field */}
      {error.title?.map((message, i) => (
        <Alert color="failure" icon={HiInformationCircle} key={i}>
          {message}
        </Alert>
      ))}

      <div>
        <div className="mb-2 block text-left">
          <Label htmlFor="description" className="text-xl">
            Description
          </Label>
        </div>
        <Textarea
          id="description"
          placeholder="Description is optional"
          rows={4}
          name="description"
          value={description}
          onChange={handleChange}
        />
      </div>

      <div>
        <div className="mb-2 block text-left">
          <Label htmlFor="due_date" className="text-xl">
            Due Date
          </Label>
        </div>
        {/* Prevents user from picking a date previous to the current date */}
        <Datepicker
          id="due_date"
          minDate={new Date()}
          title="Due date"
          name="due_date"
          value={due_date}
          onChange={handleDateChange}
        />
      </div>
      {/* Error messages for due_date field to tell user they cannot choose a date in the past.
      Component is set to have minimum date as the current date, so this error is in place incase
      the minimum date prop is bypassed.*/}
      {error.due_date?.map((message, i) => (
        <Alert color="failure" icon={HiInformationCircle} key={i}>
          {message}
        </Alert>
      ))}

      <div className="text-left">
        <div className="mb-2 block text-left">
          <Label htmlFor="due_time" className="text-xl">
            Time
          </Label>
        </div>
        {/* Prevents user from picking a date previous to the current date */}
        <TimePicker
          // required
          hourPlaceholder="00"
          minutePlaceholder="00"
          name="due_time"
          value={due_time}
          onChange={handleTimeChange}
        />
      </div>
      {/* Error messages for due_time field */}
      {error.due_time?.map((message, i) => (
        <Alert color="failure" icon={HiInformationCircle} key={i}>
          {message}
        </Alert>
      ))}

      <div className="flex justify-center">
        <Button
          type="submit"
          className={`${
            taskToEdit ? "bg-blue-500" : "bg-green-500"
          } text-lg w-3xs w-[180px] text-center`}
          pill
        >
          {isCreating ? (
            <>
              <Spinner size="sm" className="me-3" light />{" "}
              {taskToEdit ? "Updating..." : "Creating..."}
            </>
          ) : (
            <>
              {taskToEdit ? "Update" : "Create"}
              {taskToEdit ? (
                <FaSave className="ml-2 h-5 w-5" />
              ) : (
                <FaPlus className="ml-2 h-5 w-5" />
              )}
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

export default TaskForm;
