# DTS Developer Challenge - Task Manager Front End

This is the front-end for the task manager app as part of the coding challenge for the MOJ Junior Software Developer role. The front-end is written in JavaScript, using the React framework.

To view the task manager app, please type the command `npm run dev`. To ensure all API calls can be correctly made, the backend server must **also** be open. Please see the respective README for instructions on how to run the server.

## Planning

A simple wireframe was created for the layout of the task manager app.

![Task manager app wireframe](public/task-manager-wireframe.png)

## Components

For simplicity and time-management purposes, the app was created as a single page with three separate components all on the same page: the task form, the task list and the task detail card.

Initially, the app will load with only the task form and task list present. Each task in the list has a button which allows the user to view the task detail, appearing on the right hand side of the app. The user also has the option to close the task detail again.

Completed tasks in the list have a different UI. All tasks are listed in due date order, with the earliest dated task at the top. For further improvements, the tasks would also be filtered by their completion status for separation.

In the task detail card, the user is presented with the option to complete the task by clicking a checkbox. The user can also edit the task, which will automatically fill the task form with the relevant information. Finally, the user can delete the task.

All of the above user interactions will display user validation in a form of a toast, telling the user if the action was successfully completed, or an error occured.
