import CreateTaskForm from "./CreateTaskForm";
import FormContainer from '../../Components/FormContainer'
import Style from './Tasks.module.scss'
import { useState } from "react";
import axios from 'axios'
import MessageAlert from "../../Components/Alert/MessageAlert";


function TaskContainer({mode,initialTask,onClose,onSuccess}) {

    const [closing, setClosing] = useState(false);
    const [showAlert, setShowAlert]=useState(false);
    
    const [error,setError]=useState("");

    const handleCloseForm = () => {
        setClosing(true);

        setTimeout(() => {
            if (onClose) onClose();
        }, 300);
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
                    console.log("Task Created successfully");
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
                const res = await axios.put(`https://localhost:7092/api/Tasks/update/${initialTask.Id}`, {
                    Title: data.title,
                    Description: data.description,
                    DueDate: data.duedate,
                    IsCompleted: data.IsCompleted,
                    UserId: localStorage.getItem('userId')
                });
                if (res.data) {
                    console.log("Task Updated successfully");
                    handleCloseForm();
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
        <div className={`${Style['modal']} `}>
            <button className={Style['close-btn']} onClick={()=>{ handleCloseForm();}}>X</button>
            <div className={`flex flex-direction-column ${Style['modal-content']} ${closing ? Style.hide : Style.show}`}>
                <FormContainer onSubmit={handleSubmit} serverError={error}>
                    {mode==='create'? <CreateTaskForm /> : <CreateTaskForm />}
                </FormContainer>
            </div>
        </div>
        {showAlert && <MessageAlert message="Task has been Created Successully" duration={2000} type="success" />}
        </>
    );

}
export default TaskContainer;