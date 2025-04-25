import { Button, Checkbox, Label, TextInput, Textarea } from "flowbite-react";

import React from 'react'

function TaskForm() {
  return (
    <form className="flex max-w-md flex-col gap-4">
        <h1 className="text-3xl">Create Task</h1>
      <div>
        <div className="mb-2 block text-left">
          <Label htmlFor="title" className="text-xl">Title</Label>
        </div>
        <TextInput id="title" type="text" placeholder="New task" required shadow/>
      </div>
      <div><div className="mb-2 block text-left">
        <Label htmlFor="description" className="text-xl">Description</Label>
      </div>
      <Textarea id="comment" placeholder="Description is optional" rows={4} /></div>
      
      
      <div className="flex items-center gap-2">
        <Checkbox id="remember" />
        <Label htmlFor="remember">Remember me</Label>
      </div>
      <Button type="submit">Submit</Button>
    </form>
  )
}

export default TaskForm
