import React, { useState } from "react";
import TaskForm from "./components/TaskForm";
import { ToastContainer } from "react-toastify";
import TaskList from "./components/TaskList";
import TaskDetail from "./components/TaskDetail";

const App = () => {
  // Stores id of selected task from task list to pass to taskDetail component
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [refreshTasks, setRefreshTasks] = useState(false);

  // Simple refresh function based on the previous state
  const triggerRefresh = () => {
    setRefreshTasks((prev) => !prev);
  };

  return (
    <>
      <ToastContainer />
      <h1 className="font-sans text-5xl font-bold tracking-wide pt-4 pb-8 text-blue-700">
        Task Manager
      </h1>

      <div className="flex flex-row gap-8 justify-center-safe border border-gray-300 p-8 shadow-lg rounded-sm bg-stone-200/65">
        <TaskForm
          className="w-1/3"
          taskToEdit={taskToEdit}
          clearTaskToEdit={() => setTaskToEdit(null)}
          triggerRefresh={triggerRefresh}
        />
        <TaskList
          className="w-1/3"
          onTaskClick={setSelectedTaskId}
          refreshTrigger={refreshTasks}
        />
        {selectedTaskId && (
          <TaskDetail
            className="w-1/3 max-h-[300px]"
            taskId={selectedTaskId}
            onEditTask={(taskData) => setTaskToEdit(taskData)}
            triggerRefresh={triggerRefresh}
            onCloseTask={() => setSelectedTaskId(null)}
          />
        )}
      </div>
    </>
  );
};

export default App;
