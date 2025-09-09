import Style from '../../Containers/TaskContainer/Tasks.module.scss'

function TaskDetails({task}){
    return(
        <>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p className={Style.duedate}>{new Date(task.dueDate).toLocaleDateString()}</p>
        </>
    );
}
export default TaskDetails;