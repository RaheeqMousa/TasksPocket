import CreateTaskForm from "../../Components/CreateTaskForm/CreateTaskForm";
import UpdateTaskForm from "../../Components/UpdateTaskForm/UpdateTaskForm";
import FormContainer from '../FormContainer'
import Style from './Tasks.module.scss'
import { useState,useEffect } from "react";
import axios from 'axios'
import MessageAlert from "../../Components/Alert/MessageAlert";
import Confirmation from "../../Components/Alert/Confirmation";
import TaskDetails from "../../Components/TaskDetails/TaskDetails";


function TaskContainer({mode,initialTask,onClose,onSuccess}) {
    console.log(mode);
    console.log(initialTask);

    const [closing, setClosing] = useState(false);
    const [showAlert, setShowAlert]=useState(false);
    const [showConfirm, setShowConfirm]=useState(true);
    const [alertMessage,setAlertMessage] = useState("");  
    const [error,setError]=useState("");

    const handleCloseForm = () => {
        setClosing(true);

        setTimeout(() => {
            if (onClose) onClose();
        }, 300);
    };

    useEffect(() => {
    if (mode === "delete") {
            setShowConfirm(true);
        } else {
            setShowConfirm(false);
        }
}, [mode]);

    const handleConfirm = async (choice) => {
        setShowConfirm(false);
        if (choice === true && initialTask) {
            const res = await axios.delete(`https://localhost:7092/api/Tasks/delete/${initialTask.id}`);
            if (res.status === 200) {
                if (onSuccess) onSuccess(initialTask.id); // Pass deleted task id
                handleCloseForm();
            }
        }
    };

    const handleSubmit=async (data)=>{
        console.log(data);
        console.log("submit");
        try{
            if(mode==="create"){
                console.log(data);
                const res=await axios.post('https://localhost:7092/api/Tasks/create',
                    {
                        Title:data.title,
                        Description:data.description,
                        DueDate:new Date(data.dueDate),
                        IsCompleted:false,
                        UserId:localStorage.getItem('userId')
                    }
                );
                if (res.data) {
                    setAlertMessage("Task Created successfully");
                    setShowAlert(true);

                    if (onSuccess){
                        setTimeout(() => {
                            onSuccess(res.data);
                            handleCloseForm();
                            setShowAlert(false);
                        }, 2000);
                        
                    }
                }
            }else{
                const res = await axios.put(`https://localhost:7092/api/Tasks/update/${initialTask.id}`, {
                    Title: data.title,
                    Description: data.description,
                    DueDate: new Date(data.dueDate),
                    isCompleted: data.isCompleted, 
                    UserId: localStorage.getItem('userId')
                });
                if (res.data) {
                    setAlertMessage("Task has been updated successfully");
                    setShowAlert(true);

                    if (onSuccess){
                        setTimeout(() => {
                            onSuccess(res.data);
                            handleCloseForm();
                            setShowAlert(false);
                        }, 2000);
                        
                    }
                }
            }
        }catch(er ){
            const message =
                er.response && er.response.data && er.response.data.message
                ? er.response.data.message
                : er.message || "Unexpected error";

            setError(message);
        }
    }

    const modalTitles = {
        create: "Create Task",
        update: "Update Task",
        details: "Task Details"
    };

    return (
        <>
        {(mode==="create" || mode==="update" || mode==="details") && (
        <div className={`${Style['modal']} `} role="dialog" aria-label={`${mode} task modal`} aria-modal="true" aria-describedby={`modal-title`} >
            <button className={Style['close-btn']} onClick={()=>{ handleCloseForm();}} aria-label="Close modal">X</button>
            <div className={`flex flex-direction-column ${Style['modal-content']} ${closing ? Style.hide : Style.show}`}>
                 <h3 id="modal-title">{modalTitles[mode]}</h3>
                {
                    mode==='details'? <TaskDetails task={initialTask} />:
                    <FormContainer onSubmit={handleSubmit} serverError={error}  initialData={{
    ...initialTask,
    isCompleted:initialTask?.isCompleted ||false,
    dueDate: initialTask?.dueDate
      ? new Date(initialTask.dueDate).toISOString().split('T')[0]
      : ''
  }}>
                        {mode==='create' ? <CreateTaskForm /> : <UpdateTaskForm initialTask={initialTask} />}
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