import { Button, Card } from "flowbite-react";
import { RiErrorWarningLine } from "react-icons/ri";

import React, { useState, useEffect } from "react";
import api from "../api/axiosDefaults";
import { formatDate } from "../functions/dateFormats";
import LoadingSpinner from "./LoadingSpinner";

function TaskList({ className = "" }) {
  const [taskList, setTaskList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // used to compare current date to task due date
  const now = new Date();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await api.get("/tasks/");
        setTaskList(data);
        setIsLoaded(true);
      } catch (error) {
        console.log("there was an error", error);
      }
    };

    setIsLoaded(false);
    handleMount();
  }, []);

  return (
    // {isLoaded ? () : ()}
    <div className={`${className}`}>
      <Card className="max-w-sm scroll-smooth max-h-[581px] overflow-auto">
        <h5 className="text-3xl font-medium leading-none text-gray-900">
          Task List
        </h5>
        <div className="flow-root text-left">
          {isLoaded ? (
            <ol className="divide-y divide-gray-200">
              {taskList.map((task) => {
                // Takes due date and formats it before displaying in each task
                const formattedDate = formatDate(task.due_date);
                //   Convert due date to date format to check if task is overdue
                const dueDate = new Date(task.due_date);
                //   over due comparison
                const isOverdue = now > dueDate;
                return (
                  <li className="py-3" key={task.id}>
                    <div className="flex items-center space-x-4">
                      <div className="shrink-0"></div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-lg font-medium text-gray-900">
                          {task.title}{" "}
                          {/* Shows overdue label when task is overdue and not completed */}
                          {!task.status && isOverdue && (
                            <span className="flex items-center font-light text-base text-red-500 gap-1">
                              <RiErrorWarningLine />
                              Overdue
                            </span>
                          )}
                        </p>
                        <p className="truncate text-sm text-gray-600">
                          {formattedDate} {task.due_time}
                        </p>
                      </div>
                      <div className="inline-flex items-center">
                        <Button className="bg-blue-500">View</Button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          ) : (
            <LoadingSpinner />
          )}
        </div>
      </Card>
    </div>
  );
}

export default TaskList;
