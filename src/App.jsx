import React from "react";
import TaskForm from "./components/TaskForm";
import { ToastContainer } from "react-toastify";

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
      <h1 className="font-sans text-4xl font-bold tracking-wide">
        Task Manager
      </h1>
      <TaskForm />
    </>
  );
};

export default App;
