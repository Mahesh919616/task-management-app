import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import  noDataImage  from '/no-data-6.svg'
import { useDispatch, useSelector } from 'react-redux';
import { addTask, deleteTask, markAsCompleteTask, updateTask } from '../store/taskSlice';
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoMdCheckmarkCircle } from "react-icons/io";
import Swal from 'sweetalert2'

const Dashboard = () => {

    const [title, setTitle] = useState("")
    const [userTask, setUserTask] = useState([])
    const navigate = useNavigate();
    const task = useSelector((state) => state.task)
    const dispatch = useDispatch();
    const categories = ['All', 'Pending', 'Completed' ];
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [userName, setUserName] = useState("")

    useEffect(() => {
        const loggedinUser = sessionStorage.getItem("loggedin-user")
        setUserName(loggedinUser)
        const tempTasks = JSON.parse(localStorage.getItem(`tasks_${loggedinUser}`))
        
        if(tempTasks){
            setUserTask(tempTasks)
        }
    }, [task])

    const handleInput = (event) => {
        setTitle(event.target.value)
    }

    const addTaskToList = (event) => {
        event.preventDefault();
        if(title !== ""){
            let allTask = { 
                title: title,
            }
            dispatch(addTask(allTask))
            setTitle("")
        }
    }

    const handleLogout = () => {
        sessionStorage.removeItem("loggedin-user")
        navigate("/")
    }

    const editTask = (index) => {
        Swal.fire({
            input: "text",
            inputLabel: "Update Task",
            inputValue: userTask[index].title,
            showCancelButton: true,
            inputValidator: (value) => {
              if (value) {
                let allTask = { 
                    title: value,
                    index: index
                }
                dispatch(updateTask(allTask))
              }
            }
        });
    }
    const deleteUserTask = (index) => {
        dispatch(deleteTask(index))
    }
    const markComplete = (index) => {
        dispatch(markAsCompleteTask(index))
    }

    const filterUserTask = selectedCategory === 'All' ? userTask : 
        selectedCategory === 'Pending' ? userTask.filter((item) => item.isPending == true) : 
        userTask.filter((item) => item.isCompleted == true)

    return (
        <>
            <div className='m-4 bg-white rounded-md page-height'>
                <div className='flex justify-between items-center'>
                    <p className='text-2xl font-bold ml-8'>Welcome  {userName}</p>
                    <button onClick={handleLogout} className='text-md text-white float-end mr-4 font-semibold bg-red-700 px-8 py-2 rounded-md hover:bg-red-900 mt-2'>Logout</button>
                </div>
                <form onSubmit={(e) => addTaskToList(e)}>
                    <div className='w-full flex justify-center items-center h-60'>
                        <input type="text" value={title} placeholder='Enter Task' maxLength={80} required onChange={(e) => handleInput(e)}
                        className='px-3 py-2 border-2 w-1/2 rounded-md mt-1'/>
                        <button className='text-md text-white ml-4 font-semibold bg-blue-700 px-8 py-2 rounded-md hover:bg-blue-900'>Add New Task</button>
                    </div>
                </form>
                {
                    filterUserTask.length === 0 && selectedCategory == 'All'?
                    <div className='h-72 text-center text-sm font-semibold'>
                        <img src={noDataImage} alt="no data" className='w-full size-64 p-4 text-center' />
                        <p>No Task Added Yet..!</p>
                    </div>
                    : 
                    <div>
                        <div className='flex justify-start items-center m-auto w-fit'>
                            <p className='text-md font-bold mr-2'>Show Task : </p>
                            <select onChange={(e) => setSelectedCategory(e.target.value)} name="category" id="category"
                            className='border bg-indigo-50 border-gray-300 rounded-md px-4 py-1 focus:outline-none cursor-pointer'>
                                {
                                    categories.map((category, index) => 
                                        <option key={index} value={category}>{category}</option>
                                    )
                                }
                            </select>
                        </div>
                        <table className='border border-seperate border-slate-500 m-auto mt-8 w-fit bg-indigo-50'>
                            <thead>
                                <tr>
                                    <th className='border border-seperate border-slate-500 p-2 text-md w-1/12'>SL. NO.</th>
                                    <th className='border border-seperate border-slate-500 p-2 text-md w-7/12'>Task Title</th>
                                    <th className='border border-seperate border-slate-500 p-2 text-md w-2/12'>Status</th>
                                    <th className='border border-seperate border-slate-500 p-2 text-md w-2/12'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filterUserTask.map((data, index) => 
                                        <tr key={index}>
                                            <td className='border border-seperate border-slate-500 p-2 text-center'>{index + 1}</td>
                                            <td className={`border border-seperate border-slate-500 p-2 ${data.isCompleted ? 'line-through' : ''}`}>{data.title}</td>
                                            <td className='border border-seperate border-slate-500 p-2 text-center'>{data.isCompleted ? 
                                                <span className='text-green-700'>Completed</span> : 
                                                <span className='text-orange-700'>Pending</span>}
                                            </td>
                                            <td className='border border-seperate border-slate-500 p-2 text-center'> 
                                                <span className='flex justify-center items-center'> 
                                                    {   data.isPending ?
                                                        <FaPencilAlt onClick={() => editTask(index)} className='text-blue-700 hover:text-blue-800 size-5 cursor-pointer mr-2' title='Edit'/>
                                                        : ""
                                                    }
                                                    <MdDelete onClick={() => deleteUserTask(index)} className='text-red-700 hover:text-red-800 size-6 cursor-pointer ml-2' title='Delete'/>
                                                    {   data.isPending ? <IoMdCheckmarkCircle onClick={() => markComplete(index)} className='text-green-700 hover:text-green-800 size-6 cursor-pointer ml-2' title='Mark As Complete' />
                                                        : ""
                                                    }
                                                </span>                                         
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        </>
    )
}

export default Dashboard