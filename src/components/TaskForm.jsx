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
import { FaPlus } from "react-icons/fa";
import { HiInformationCircle } from "react-icons/hi";
import api from "../api/axiosDefaults";

import React, { useState } from "react";
import { SuccessToast } from "../functions/toasts";

function TaskForm() {
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState({});
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    due_date: new Date(),
    due_time: "",
  });
  const { title, description, due_date, due_time } = taskData;

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

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("due_date", formattedDate);
    formData.append("due_time", due_time);

    try {
      setIsCreating(true);
      await api.post("/tasks/", formData);
      SuccessToast("Task created!");
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
    } catch (error) {
      setError(error.response?.data);
      console.log(error);
      setIsCreating(false);
    }
  };

  return (
    <form
      className="flex max-w-md flex-col gap-4 bg-neutral-100 border border-stone-200 p-8 rounded-md shadow-sm"
      onSubmit={handleSubmit}
    >
      <h1 className="text-3xl">Create Task</h1>
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
          // required
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
          id="comment"
          placeholder="Description is optional"
          rows={4}
          name="description"
          value={description}
          onChange={handleChange}
        />
      </div>

      <div>
        <div className="mb-2 block text-left">
          <Label htmlFor="description" className="text-xl">
            Due Date
          </Label>
        </div>
        {/* Prevents user from picking a date previous to the current date */}
        <Datepicker
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
          <Label htmlFor="description" className="text-xl">
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
          className="bg-green-500 text-lg w-3xs w-[180px] text-center"
          pill
        >
          {" "}
          {isCreating ? (
            <>
              <Spinner size="sm" className="me-3" light /> "Creating..."
            </>
          ) : (
            "Create"
          )}
          <FaPlus className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </form>
  );
}

export default TaskForm;
