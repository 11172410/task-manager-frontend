import {
  Accordion,
  AccordionContent,
  AccordionPanel,
  AccordionTitle,
  Button,
} from "flowbite-react";

import React, { useState, useEffect } from "react";
import api from "../api/axiosDefaults";

function TaskList({ className = "" }) {
  const [taskList, setTaskList] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await api.get("/tasks/");
        setTaskList(data);
        // setIsLoaded(true);
      } catch (error) {
        console.log("there was an error", error);
      }
    };

    // setIsLoaded(false);
    handleMount();
  }, []);

  return (
    <div className={` ${className}`}>
      <h2 className="text-4xl pb-2">Task List</h2>

      <Accordion collapseAll className="">
        {taskList.map((task) => (
          <AccordionPanel key={task.id}>
            <AccordionTitle>
              {task.title}
              <br /> {task.due_date} {task.due_time}
            </AccordionTitle>
            <AccordionContent>
              <Button>View task</Button>
            </AccordionContent>
          </AccordionPanel>
        ))}

        {/* <AccordionPanel>
          <AccordionTitle>Is there a Figma file available?</AccordionTitle>
          <AccordionContent>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              Flowbite is first conceptualized and designed using the Figma
              software so everything you see in the library has a design
              equivalent in our Figma file.
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              Check out the
              <a
                href="https://flowbite.com/figma/"
                className="text-cyan-600 hover:underline dark:text-cyan-500"
              >
                Figma design system
              </a>
              based on the utility classes from Tailwind CSS and components from
              Flowbite.
            </p>
          </AccordionContent>
        </AccordionPanel>
        <AccordionPanel>
          <AccordionTitle>
            What are the differences between Flowbite and Tailwind UI?
          </AccordionTitle>
          <AccordionContent>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              The main difference is that the core components from Flowbite are
              open source under the MIT license, whereas Tailwind UI is a paid
              product. Another difference is that Flowbite relies on smaller and
              standalone components, whereas Tailwind UI offers sections of
              pages.
            </p>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              However, we actually recommend using both Flowbite, Flowbite Pro,
              and even Tailwind UI as there is no technical reason stopping you
              from using the best of two worlds.
            </p>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              Learn more about these technologies:
            </p>
            <ul className="list-disc pl-5 text-gray-500 dark:text-gray-400">
              <li>
                <a
                  href="https://flowbite.com/pro/"
                  className="text-cyan-600 hover:underline dark:text-cyan-500"
                >
                  Flowbite Pro
                </a>
              </li>
              <li>
                <a
                  href="https://tailwindui.com/"
                  rel="nofollow"
                  className="text-cyan-600 hover:underline dark:text-cyan-500"
                >
                  Tailwind UI
                </a>
              </li>
            </ul>
          </AccordionContent>
        </AccordionPanel> */}
      </Accordion>
    </div>
  );
}

export default TaskList;
