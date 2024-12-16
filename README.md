########## Project Instruction ##########

Task Management APP

GitHub Repository Link 
https://github.com/Mahesh919616/task-management-app.git
•	Clone repository from the above git hub repository link run following commands to run the project in local machine.
npm install
npm run dev

Project URL Hosted in Vercel Platform
https://task-management-app-livid-one.vercel.app/

Technologies Used:
•	HTML
•	CSS, Tailwind CSS
•	JavaScript
•	React JS
•	Redux Tool Kit

Project Code Structure:
•	src -> component folder contains all Register, Login, Task, Store and Router components.

Feature Developed:
•	Register user by entering username and password. Given validations for both fields with minimum 4 characters and maximum 20 characters, empty fields are not allowed and username should not be duplicated. Showing error message when user enters existing user.
•	Login user by entering registered username and password. Showing error message on submitting invalid username or password.
•	After login user can add new task. After task adding it will be listed in below table. Table shows task title, status (pending or completed) and actions (edit, delete, mark as complete).
•	User can perform actions like edit, delete and mark as complete. Only pending tasks can edit and mark them as complete. On completion of each action showing alert notification with message.
•	User can view tasks by filtering them. By default, all tasks will be shown and pending, completed tasks will be shown separately when user selects them from dropdown select.
•	User can logout by pressing logout button provided. Once logged-out user session will be expired. Access tasks user has to login again

Requirements Achieved:
•	All given requirements are achieved successfully 
•	On user registration credentials are stored in local storage.
•	On login, registered data stored in the local storage will be verified and login details stored in the session storage.
•	On task creation all tasks are stored in the local storage with key name “tasks_$(username)” separately for each individual user.
•	User can filter tasks to view them according to the requirement.
•	On click of logout user will be redirected to login page and his sessions removed from session storage.
•	When user logged in again all tasks and details of tasks belonging to the logged-in user persists as they are.
•	All tasks persist across page reloads and are tied to the correct user.
•	Used Redux Tool Kit to store and manage states globally.
•	Additionally implemented protected routing which protects user to redirect to task management interface after logout when press browser’s back button, it leads to login page again.
•	Additionally implemented 404 page not found error page when wrong url is triggered.

