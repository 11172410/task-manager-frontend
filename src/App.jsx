import React from "react";
import TaskForm from "./components/TaskForm";
import { ToastContainer } from "react-toastify";
import TaskList from "./components/TaskList";

const App = () => {
  // Quick check that api fetching is working
  // useEffect(() => {
  //   api.get('/tasks/')
  //     .then(res => console.log('API response:', res.data))
  //     .catch(err => console.error('Fetch error:', err));
  // }, []);

  return (
    <>
      <ToastContainer />
      <h1 className="font-sans text-4xl font-bold tracking-wide pt-4 pb-8">
        Task Manager
      </h1>

      <div className="flex flex-row gap-8 justify-center-safe">
        <TaskForm className="w-64" />
        <TaskList />
      </div>
    </>
  );
};

export default App;
