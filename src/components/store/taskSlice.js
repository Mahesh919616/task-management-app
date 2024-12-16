import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

const initialState = {
    taskList: []
}

export const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers:{
        addTask: (state, action) => {
            let userName = sessionStorage.getItem("loggedin-user")
            let userTasks = JSON.parse(localStorage.getItem(`tasks_${userName}`) || "[]")
            state.taskList = [...userTasks]
            let newTask = {
                title: action.payload.title,
                isCompleted: false,
                isPending: true
            }
            state.taskList.push(newTask)
            localStorage.setItem(`tasks_${userName}`, JSON.stringify(state.taskList))
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Task added successfully",
                showConfirmButton: false,
                timer: 2000
            });

        },
        updateTask: (state, action) => {
            let index = action.payload.index
            let userName = sessionStorage.getItem("loggedin-user")
            let userTasks = JSON.parse(localStorage.getItem(`tasks_${userName}`) || "[]")
            state.taskList = [...userTasks]
            state.taskList[index].title = action.payload.title
            localStorage.setItem(`tasks_${userName}`, JSON.stringify(state.taskList))
            toast.success(`Task updated successfully`, {position: 'top-right'})
        },
        deleteTask: (state, action) => {
            let index = action.payload
            let userName = sessionStorage.getItem("loggedin-user")
            let userTasks = JSON.parse(localStorage.getItem(`tasks_${userName}`) || "[]")
            state.taskList = [...userTasks]
            state.taskList.splice(index, 1)
            localStorage.setItem(`tasks_${userName}`, JSON.stringify(state.taskList))
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Task deleted successfully",
                showConfirmButton: false,
                timer: 2000
            });
        },
        markAsCompleteTask: (state, action) => {
            let index = action.payload
            let userName = sessionStorage.getItem("loggedin-user")
            let userTasks = JSON.parse(localStorage.getItem(`tasks_${userName}`) || "[]")
            state.taskList = [...userTasks]
            state.taskList[index].isCompleted = true
            state.taskList[index].isPending = false
            localStorage.setItem(`tasks_${userName}`, JSON.stringify(state.taskList))
            toast.success(`Task marked as completed`, {position: 'top-right'})
        }
    }
})

export const { addTask, updateTask, deleteTask, markAsCompleteTask } = taskSlice.actions;
export default taskSlice.reducer;