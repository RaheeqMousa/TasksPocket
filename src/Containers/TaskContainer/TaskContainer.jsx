import CreateTaskForm from "../../Components/CreateTaskForm/CreateTaskForm";
import UpdateTaskForm from "../../Components/UpdateTaskForm/UpdateTaskForm";
import FormContainer from '../FormContainer'
import Style from './Tasks.module.scss'
import { useState, useEffect, useMemo, useCallback } from "react";
import axios from 'axios'
import MessageAlert from "../../Components/Alert/MessageAlert";
import Confirmation from "../../Components/Alert/Confirmation";
import TaskDetails from "../../Components/TaskDetails/TaskDetails";

function TaskContainer({ mode, initialTask, onClose, onSuccess }) {

    const [closing, setClosing] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [showConfirm, setShowConfirm] = useState(true);
    const [alertMessage, setAlertMessage] = useState("");
    const [error, setError] = useState("");

    const handleCloseForm = useCallback(() => {
        setClosing(true);

        setTimeout(() => {
            if (onClose) onClose();
        }, 300);
    },[onClose]);

    useEffect(() => {
        if (mode === "delete") {
            setShowConfirm(true);
        } else {
            setShowConfirm(false);
        }
    }, [mode]);

    const handleConfirm = useCallback( async (choice) => {
        setShowConfirm(false);
        if (choice === true && initialTask) {
            try {
                const res = await axios.delete(`https://localhost:7092/api/Tasks/delete/${initialTask.id}`);
                if (res.status === 200) {
                    if (onSuccess) onSuccess(initialTask.id); // Pass deleted task id
                    handleCloseForm();
                }
            } catch (e) {
                console.log(e);
                let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
                tasks = tasks.filter((task) => task.id !== initialTask.id);
                localStorage.setItem('tasks', JSON.stringify(tasks));
                if (onSuccess) onSuccess(initialTask.id);
                handleCloseForm();
            }
        }
    },[onSuccess, initialTask, handleCloseForm]);

    const handleSubmit = useCallback( async (data) => {
        try {
            if (mode === "create") {
                console.log(data);
                const res = await axios.post('https://localhost:7092/api/Tasks/create',
                    {
                        title: data.title,
                        description: data.description,
                        dueDate: new Date(data.dueDate),
                        isCompleted: false,
                        userId: localStorage.getItem('userId')
                    }
                );
                if (res.data) {
                    setAlertMessage("Task Created successfully");
                    setShowAlert(true);

                    if (onSuccess) {
                        setTimeout(() => {
                            onSuccess(res.data);
                            handleCloseForm();
                            setShowAlert(false);
                        }, 2000);

                    }
                }
                
            } else {
                const res = await axios.put(`https://localhost:7092/api/Tasks/update/${initialTask.id}`, {
                    title: data.title,
                    description: data.description,
                    dueDate: new Date(data.dueDate),
                    isCompleted: data.isCompleted,
                    userId: localStorage.getItem('userId')
                });
                if (res.data) {
                    setAlertMessage("Task has been updated successfully");
                    setShowAlert(true);

                    if (onSuccess) {
                        setTimeout(() => {
                            onSuccess(res.data);
                            handleCloseForm();
                            setShowAlert(false);
                        }, 2000);

                    }
                }
            }
        } catch (er) {

            console.log(er)
            setError('');

            if (mode === "create") {
                const newData = {
                    id: `task-${Date.now()}`,
                    title: data.title,
                    description: data.description,
                    dueDate: new Date(data.dueDate),
                    isCompleted: false,
                    userId: localStorage.getItem('userId')
                };

                let localTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
                if (!Array.isArray(localTasks)) {
                    localTasks = [localTasks];
                }
                localTasks.push(newData);
                localStorage.setItem('tasks', JSON.stringify(localTasks));


                setAlertMessage("Task has been created successfully");
                setShowAlert(true);

                if (onSuccess) {
                    setTimeout(() => {
                        onSuccess(newData);
                        handleCloseForm();
                        setShowAlert(false);
                    }, 2000);
                }
            }
            else {
                const newData = {
                    id: data.id, // keep the same id for updating
                    title: data.title,
                    description: data.description,
                    dueDate: new Date(data.dueDate),
                    isCompleted: data.isCompleted,
                    userId: localStorage.getItem('userId')
                };

                // Load tasks safely
                const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

                // Update the matching task
                const updatedTasks = tasks.map(t =>
                    t.id === data.id ? { ...t, ...newData } : t
                );

                // Save back to localStorage
                localStorage.setItem("tasks", JSON.stringify(updatedTasks));

                // Find updated task
                const updatedTask = updatedTasks.find(t => t.id === data.id);
                console.log(updatedTask);

                // Success message
                setAlertMessage("Task has been updated successfully");
                setShowAlert(true);

                if (onSuccess) {
                    setTimeout(() => {
                        onSuccess(updatedTask);
                        handleCloseForm();
                        setShowAlert(false);
                    }, 2000);
                }
            }


        }
    },[handleCloseForm, onSuccess, mode, initialTask])

    const modalTitles = useMemo(() => ({
        create: "Create Task",
        update: "Update Task",
        details: "Task Details"
    }), []);

    const initialFormData = useMemo(() => ({
        ...initialTask,
        isCompleted: initialTask?.isCompleted || false,
        dueDate: initialTask?.dueDate
            ? new Date(initialTask.dueDate).toISOString().split('T')[0]
            : ''
    }), [initialTask]);

    return (
        <>
            {(mode === "create" || mode === "update" || mode === "details") && (
                <div className={`${Style['modal']} `} role="dialog" aria-label={`${mode} task modal`} aria-modal="true" aria-describedby={`modal-title`} >
                    <button className={Style['close-btn']} onClick={() => { handleCloseForm(); }} aria-label="Close modal">X</button>
                    <div className={`flex flex-direction-column ${Style['modal-content']} ${closing ? Style.hide : Style.show}`}>
                        <h3 id="modal-title">{modalTitles[mode]}</h3>
                        {
                            mode === 'details' ? <TaskDetails task={initialTask} /> :
                                <FormContainer onSubmit={handleSubmit} serverError={error} initialData={initialFormData}>
                                    {mode === 'create' ? <CreateTaskForm /> : <UpdateTaskForm initialTask={initialTask} />}
                                </FormContainer>
                        }
                    </div>
                </div>)}
            {showAlert && <MessageAlert message={alertMessage} duration={2000} type="success" />}

            {showConfirm && <Confirmation
                message={`Are you sure you want to delete the task "${initialTask?.title}"?`}
                onClose={handleConfirm}
            />}
        </>
    );

}
export default TaskContainer;