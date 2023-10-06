import { useState, useEffect } from 'react';
import Navbar from "./Navbar";
import { GrFormAdd } from "react-icons/gr";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from "axios";
function Home() {
    const [taskdetails, setTaskDetails] = useState([]);
    const [taskInfo, setTaskInfo] = useState({
        task_id: "",
        task_name: "",
        status: "pending"
    })

    const [singletaskInfo, setSingleTaskInfo] = useState({
        task_name: "",
        status: ""
    })

    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const handleShow1 = () => setShow1(true);
    const handleClose1 = () => setShow1(false);
    const [errors, setError] = useState("");
    const [isDuplicateTaskId, setIsDuplicateTaskId] = useState(false);

    const AddTasks = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/add_task/', taskInfo)
            TaskList();
            handleClose();
            alert("Task Added Successfully.")
        } catch (error) {
            if (error.response && error.response.status === 400) {
                const responseErrors = error.response.data;
                if (responseErrors.error === 'Task Id already exists') {
                    setIsDuplicateTaskId(true);
                } else {
                    setError(responseErrors);
                }
            } else {
                console.error('Internal Server Error:', error);
            }
        }
    };

    const TaskList = () => {
        axios.get("http://localhost:5000/api/task_list/")
            .then((response) => { console.log(response.data); setTaskDetails(response.data) });
    }

    useEffect(() => {
        TaskList()
    }, [])

    const getSingleTask = (id) => {
        axios.get(`http://localhost:5000/api/get_task/${id}/`)
            .then((response) => { setSingleTaskInfo(response.data); });
    }

    const EditTasks = (id) => {
        let formData = new FormData();
        formData.append('task_name', singletaskInfo.task_name);
        formData.append('status', singletaskInfo.status);
        fetch(`http://localhost:5000/api/edit_task/${id}/`,
            { method: 'PUT', body: formData })
        window.location.reload()
    };


    const DeleteTasks = async (Id) => {
        try {
            const confirm = window.confirm("Are You Sure?")
            if (confirm) {
                const response = await axios.delete(`http://localhost:5000/api/delete_task/${Id}`);
                console.log(response);
                TaskList();
                alert("Task Deleted Successfully.")
            }
        } catch (error) {
            console.error(`Error deleting Employee with ID ${Id}:`, error);
        }
    }


    return (
        <div className='vh-100' style={{ backgroundColor: "aliceblue" }}>
            <Navbar />
            <div className="w-100 mt-5" >
                <div>
                    <div className="p-5 pb-2 pt-3 d-flex justify-content-end">
                        <a className='btn btn-sm btn-primary' type='button' onClick={() => { handleShow() }}><GrFormAdd />&nbsp;Add Task</a>
                    </div>
                    {taskdetails.length > 0 ? (
                        <div>
                            {taskdetails.map((task) =>
                            (
                                <div className='p-5 pt-0' key={task.id}>
                                    <div className='card border-dark rounded-1 shadow'>
                                        <div className='card-header d-flex bg-light justify-content-between'>
                                            <div><strong> Task Id:&nbsp;</strong>{task.task_id}</div>
                                            <div> <strong>Task Status:&nbsp;</strong>{task.status}</div>
                                            <div className='float-end'><strong>Added Date:&nbsp;</strong>{new Date(task.added_date).toLocaleDateString('en-US')}</div>
                                        </div>

                                        <div className='card-body'>
                                            <p className='card-title text-primary fw-normal fs-5'>{task.task_name}</p>
                                            <div className='d-flex justify-content-end pt-3'>
                                                <a className='btn btn-sm btn-primary m-1' type='button' onClick={() => { handleShow1(); getSingleTask(task._id) }}><BiEdit />&nbsp;Edit</a>
                                                <a className='btn btn-sm btn-danger m-1' type='button' onClick={() => { DeleteTasks(task._id) }}><RiDeleteBinLine />&nbsp;Delete</a>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            ))}

                        </div>
                    ) : (<p className='text-center p-3 m-5 bg-warning text-light fs-3'>No Task Available To Show...!</p>)}

                </div>
            </div>


            <Modal show={show} onHide={handleClose} centered >
                <Modal.Header closeButton>
                    <Modal.Title>Add Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className='p-3' onSubmit={AddTasks}>
                        <div className='row mb-2'>
                            <div className='col-md-12'>
                                <label className='form-label'>Task Id</label>
                                <input type='text' className='form-control form-control-sm'
                                    required onChange={(e) => setTaskInfo({ ...taskInfo, task_id: e.target.value })} />
                                {isDuplicateTaskId !== false && <p className="error text-danger">Task ID already exists.</p>}
                                {errors.task_id && <p className="error">{errors.task_id}</p>}
                            </div>
                        </div>
                        <div className='row mb-2'>
                            <div className='col-md-12'>
                                <label className='form-label'>Task</label>
                                <input type='text' className='form-control form-control-sm'
                                    required onChange={(e) => setTaskInfo({ ...taskInfo, task_name: e.target.value })} />
                            </div>
                        </div>

                        <div className='d-flex justify-content-end'>
                            <button className='btn btn-success btn-sm text-light w-25' type='submit'>Add</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

            <Modal show={show1} onHide={handleClose1} centered >
                <Modal.Header closeButton>
                    <Modal.Title>Add Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className='p-2' onSubmit={() => EditTasks(singletaskInfo._id)}>
                        <div className='row mb-2'>
                            <div className='col-md-12'>
                                <label className='form-label'>Task</label>
                                <input type='text' value={singletaskInfo.task_name} className='form-control form-control-sm'
                                    required onChange={(e) => setSingleTaskInfo({ ...singletaskInfo, task_name: e.target.value })} />
                            </div>
                        </div>

                        <div className='row mb-5'>
                            <div className='col-md-12'>
                                <label className='form-label'>Task Status</label>
                                <Form.Select size='sm' aria-label="Default select example" value={singletaskInfo.status}
                                    required onChange={(e) => setSingleTaskInfo({ ...singletaskInfo, status: e.target.value })}>
                                    <option value="">------Task Status------</option>
                                    <option value="pending">Pending</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </Form.Select>
                            </div>
                        </div>
                        <div className='d-flex justify-content-end'>
                            <button className='btn btn-sm btn-outline-primary w-25' type='submit'>Update</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal >

        </div >
    )
}

export default Home