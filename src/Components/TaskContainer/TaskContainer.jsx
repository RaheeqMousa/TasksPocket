import CreateTaskForm from "../CreateTaskForm/CreateTaskForm";
import UpdateTaskForm from "../UpdateTaskForm/UpdateTaskForm";
import FormContainer from '../FormContainer'
import Style from './Tasks.module.scss'
import { useState,useEffect } from "react";
import axios from 'axios'
import MessageAlert from "../Alert/MessageAlert";
import Confirmation from "../Alert/Confirmation";
import TaskDetails from "../TaskDetails/TaskDetails";


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
        try{
            if(mode==="create"){
                const res=await axios.post('https://localhost:7092/api/Tasks/create',
                    {
                        Title:data.title,
                        Description:data.description,
                        DueDate:data.duedate,
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
                    DueDate: data.duedate,
                    IsCompleted: data.IsCompleted,
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

    return (
        <>
        {(mode==="create" || mode==="update" || mode==="details") && (
        <div className={`${Style['modal']} `}>
            <button className={Style['close-btn']} onClick={()=>{ handleCloseForm();}}>X</button>
            <div className={`flex flex-direction-column ${Style['modal-content']} ${closing ? Style.hide : Style.show}`}>
                {
                    mode==='details'? <TaskDetails task={initialTask} />:
                    <FormContainer onSubmit={handleSubmit} serverError={error}>
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