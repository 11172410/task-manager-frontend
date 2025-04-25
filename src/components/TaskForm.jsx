import { Button, Label, TextInput, Textarea, Datepicker } from "flowbite-react";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { FaPlus } from "react-icons/fa";

import React from "react";

function TaskForm() {
  return (
    <form className="flex max-w-md flex-col gap-4 bg-neutral-100 border border-stone-200 p-8 rounded-md shadow-sm">
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
        <Textarea id="comment" placeholder="Description is optional" rows={4} />
      </div>

      <div>
        <div className="mb-2 block text-left">
          <Label htmlFor="description" className="text-xl">
            Due Date
          </Label>
        </div>
        {/* Prevents user from picking a date previous to the current date */}
        <Datepicker minDate={new Date()} title="Due date" />
      </div>

      <div className="text-left">
        <div className="mb-2 block text-left">
          <Label htmlFor="description" className="text-xl">
            Time
          </Label>
        </div>
        {/* Prevents user from picking a date previous to the current date */}
        <TimePicker required hourPlaceholder="00" minutePlaceholder="00" />
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
