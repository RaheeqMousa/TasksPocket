import CreateTaskForm from "../../Components/CreateTaskForm/CreateTaskForm";
import UpdateTaskForm from "../../Components/UpdateTaskForm/UpdateTaskForm";
import FormContainer from '../FormContainer'
import Style from './Tasks.module.scss'
import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import axios from 'axios'
import MessageAlert from "../../Components/Alert/MessageAlert";
import Confirmation from "../../Components/Alert/Confirmation";
import TaskDetails from "../../Components/TaskDetails/TaskDetails";
const API_BASE_URL= import.meta.env.VITE_API_BASE_URL;
import PropTypes from "prop-types";

function TaskContainer(props) {

    const { mode, initialTask, onClose, onSuccess } = props;
        
    const [closing, setClosing] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [showConfirm, setShowConfirm] = useState(true);
    const [alertMessage, setAlertMessage] = useState("");
    const [error, setError] = useState("");
    const alertMessageData = useRef(null);

    const handleCloseForm = useCallback(() => {
        setClosing(true);

        setTimeout(() => {
            if (onClose) onClose();
        }, 300);

    },[onClose]);

    useEffect(() => {
        if (!showAlert) return;

        const timer = setTimeout(() => {
            if (onSuccess) {
                onSuccess(alertMessageData.current);
            }
            handleCloseForm();
            setShowAlert(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, [showAlert, onSuccess, handleCloseForm]);

    useEffect(() => {
        if (mode === "delete") {
            setShowConfirm(true);
        } else {
            setShowConfirm(false);
        }
    }, [mode, initialTask]);

    const handleOverlayClick=(e)=>{
        if(e.target === e.currentTarget){
            handleCloseForm();
        }
    }

    
    useEffect(() => {
        const handleEsc = (e) => {
          if (e.key === "Escape") {
            handleCloseForm();
          }
        };
        document.addEventListener("keydown", handleEsc);
    
        return () => {
          document.removeEventListener("keydown", handleEsc);
        };
    }, [handleCloseForm]);


    const handleConfirm = useCallback( async (choice) => {
        setShowConfirm(false);
        if (choice === true && initialTask) {
            try {
                const res = await axios.delete(`${API_BASE_URL}/Tasks/delete/${initialTask.id}`);
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


    const createTask = useCallback(async (data) => {
        try{
            const res = await axios.post(`${API_BASE_URL}/Tasks/create`,
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
                    alertMessageData.current=res.data;
                    setShowAlert(true);
                }
        }catch(e){
            console.log(e)
            setError('');
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
                alertMessageData.current=newData;
                setShowAlert(true);

                if (onSuccess) {
                    setTimeout(() => {
                        onSuccess(newData);
                        handleCloseForm();
                        setShowAlert(false);
                    }, 2000);
                }
        }
    }, [handleCloseForm, onSuccess]);

    const updateTask = useCallback(async (data) => {
        try{
        const res = await axios.put(`${API_BASE_URL}/Tasks/update/${initialTask.id}`, {
                    title: data.title,
                    description: data.description,
                    dueDate: new Date(data.dueDate),
                    isCompleted: data.isCompleted,
                    userId: localStorage.getItem('userId')
                });
                if (res.data) {
                    setAlertMessage("Task has been updated successfully");
                    alertMessageData.current=res.data;
                    setShowAlert(true);
                }
            }catch(e){
                console.log(e);
                const newData = {
                    id: data.id, // keep the same id for updating
                    title: data.title,
                    description: data.description,
                    dueDate: new Date(data.dueDate),
                    isCompleted: data.isCompleted,
                    userId: localStorage.getItem('userId')
                };

                //Load tasks
                const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

                //Update the matching task
                const updatedTasks = tasks.map(t =>
                    t.id === data.id ? { ...t, ...newData } : t
                );

                //Save to localStorage
                localStorage.setItem("tasks", JSON.stringify(updatedTasks));

                //Find updated task
                const updatedTask = updatedTasks.find(t => t.id === data.id);

                //Success message
                setAlertMessage("Task has been updated successfully");
                alertMessageData.current=updatedTask;
                setShowAlert(true);
            }
    }, [initialTask]);

    const handleSubmit = useCallback( async (data) => {
            if (mode === "create") {

                createTask(data);
                
            } else {
                updateTask(data);
            }
    },[mode, createTask, updateTask])

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

    const deleteMessage = useMemo(
        () => `Are you sure you want to delete the task "${initialTask?.title}"?`,
        [initialTask?.title],
    );

    return (
        <>
        {(mode === "create" || mode === "update" || mode === "details") && (
            <div onClick={handleOverlayClick} className={Style.overlay} role="presentation">
                
                    <div className={`${Style['modal']} `} role="dialog" aria-label={`${mode} task modal`} aria-modal="true" aria-describedby={`modal-title`} >
                        <button className={Style['close-btn']} onClick={handleCloseForm} aria-label="Close modal">X</button>
                        <div className={`flex flex-direction-column ${Style['modal-content']} ${closing ? Style.hide : Style.show}`}>
                            <h3 id="modal-title">{modalTitles[mode]}</h3>
                            {
                                mode === 'details' ? <TaskDetails task={initialTask} /> :
                                    <FormContainer onSubmit={handleSubmit} serverError={error} initialData={initialFormData}>
                                        {mode === 'create' ? <CreateTaskForm /> : <UpdateTaskForm initialTask={initialTask} />}
                                    </FormContainer>
                            }
                        </div>
                    
                        {showAlert && <MessageAlert message={alertMessage} duration={2000} type="success" />}
                    </div>
            </div>)}
            {showConfirm && 
                <Confirmation message={deleteMessage} onClose={handleConfirm}/>
                }
        </>
    );

}
export default TaskContainer;

TaskContainer.propTypes = {
  mode: PropTypes.oneOf(["create", "edit", "delete"]).isRequired,
  initialTask: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    description: PropTypes.string,
    dueDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
  }),
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};