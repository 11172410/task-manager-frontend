import { Button, Card } from "flowbite-react";

import React, { useState, useEffect } from "react";
import api from "../api/axiosDefaults";
import { formatDate } from "../functions/dateFormats";

function TaskDetail({ className = "", taskId }) {
  const [taskDetail, setTaskDetail] = useState({
    title: "",
    description: "",
    due_date: "",
    due_time: "",
    status: false,
  });
  const { title, description, due_date, due_time, status } = taskDetail;

  useEffect(() => {
    if (taskId) {
      const handleMount = async () => {
        try {
          const { data } = await api.get(`/tasks/${taskId}/`);
          setTaskDetail(data);
          // setIsLoaded(true);
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      };
      handleMount();
    }

    // setIsLoaded(false);
  }, [taskId]);

  if (!taskDetail) return <p>Select a task to view details</p>;

  const formattedDate = formatDate(due_date);

  return (
    <Card className="max-w-sm">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900">
        {title}
      </h5>
      <p className="font-normal text-gray-700">
        {description ? description : "No description available"}
      </p>
      <p>
        {formattedDate} {due_time}
      </p>
      <p> {status ? "Completed" : "Incomplete"} </p>
      <div className="flex flex-row">
        <Button color="alternative">Edit</Button>
        <Button color="red">Delete</Button>
      </div>
    </Card>
  );
}

export default TaskDetail;
