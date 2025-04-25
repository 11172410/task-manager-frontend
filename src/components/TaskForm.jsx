import { Button, Label, TextInput, Textarea, Datepicker } from "flowbite-react";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { FaPlus } from "react-icons/fa";
import api from "../api/axiosDefaults";

import React, { useState } from "react";

function TaskForm() {
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState({});
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    due_date: "",
    due_time: "",
  });
  const { title, description, due_date, due_time } = taskData;

  // Allows changing of input fields values by creating a copy
  // of the previous data before updating
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevTaskData) => ({
      ...prevTaskData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("due_date", due_date);
    formData.append("due_time", due_time);

    try {
      setIsCreating(true);
      await api.post("/tasks/", formData);
      console.log("Task created!");
      setIsCreating(false);
    } catch (error) {
      setError(error.response?.data);
      console.log(error);
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
          required
          shadow
        />
      </div>
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
          onChange={handleChange}
        />
      </div>

      <div className="text-left">
        <div className="mb-2 block text-left">
          <Label htmlFor="description" className="text-xl">
            Time
          </Label>
        </div>
        {/* Prevents user from picking a date previous to the current date */}
        <TimePicker
          required
          hourPlaceholder="00"
          minutePlaceholder="00"
          name="due_time"
          value={due_time}
          onChange={handleChange}
        />
      </div>

      <div className="flex justify-center">
        <Button
          type="submit"
          className="bg-green-500 text-lg w-3xs w-[180px] text-center"
          pill
        >
          Create
          <FaPlus className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </form>
  );
}

export default TaskForm;
