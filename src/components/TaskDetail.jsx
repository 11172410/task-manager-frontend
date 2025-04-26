import { Button, Card } from "flowbite-react";

import React, { useState, useEffect } from "react";
import api from "../api/axiosDefaults";

function TaskDetail() {
  const [taskDetail, setTaskDetail] = useState({
    title: "",
    description: "",
    due_date: "",
    due_time: "",
    status: false,
  });
  const { title, description, due_date, due_time, status } = taskDetail;

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await api.get(`/tasks/1/`);
        setTaskDetail(data);
        // setIsLoaded(true);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    // setIsLoaded(false);
    handleMount();
  }, []);

  return (
    <Card className="max-w-sm">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Noteworthy technology acquisitions 2021
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        Here are the biggest enterprise technology acquisitions of 2021 so far,
        in reverse chronological order.
      </p>
      <div className="flex flex-row">
        <Button color="alternative">Edit</Button>
        <Button color="red">Delete</Button>
      </div>
    </Card>
  );
}

export default TaskDetail;
