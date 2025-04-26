import React, { useState } from "react";
import TaskForm from "./components/TaskForm";
import { ToastContainer } from "react-toastify";
import TaskList from "./components/TaskList";
import TaskDetail from "./components/TaskDetail";

const App = () => {
  // Quick check that api fetching is working
  // useEffect(() => {
  //   api.get('/tasks/')
  //     .then(res => console.log('API response:', res.data))
  //     .catch(err => console.error('Fetch error:', err));
  // }, []);

  // Stores id of selected task from task list to pass to taskDetail component
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [taskToEdit, setTaskToEdit] = useState(null);

  return (
    <>
      <ToastContainer />
      <h1 className="font-sans text-4xl font-bold tracking-wide pt-4 pb-8">
        Task Manager
      </h1>

      <div className="flex flex-row gap-8 justify-center-safe">
        <TaskForm
          className="w-1/3"
          taskToEdit={taskToEdit}
          clearTaskToEdit={() => setTaskToEdit(null)}
        />
        <TaskList className="w-1/3" onTaskClick={setSelectedTaskId} />
        {selectedTaskId && (
          <TaskDetail
            className="w-1/3"
            taskId={selectedTaskId}
            onEditTask={(taskData) => setTaskToEdit(taskData)}
          />
        )}
      </div>
    </>
  );
};

export default App;
