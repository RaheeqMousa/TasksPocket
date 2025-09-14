import Style from '../../Containers/TaskContainer/Tasks.module.scss'
import PropTypes from 'prop-types'
import {memo} from 'react'
import Styles from './TaskDetails.module.scss';

function TaskDetails({task}){

    const FormattedDate = memo(({ dateString }) => (
        <>{new Date(dateString).toLocaleDateString()}</>
    ));

    if(!task) 
        return <div>No available task data</div>

    return(
        <>
            <h3>{task.title}</h3>
            <p className={Styles.desc}>{task.description}</p>
            <time className={Style.duedate}>
                <FormattedDate dateString={task.dueDate} />
            </time>
        </>
    );
}
export default TaskDetails;

TaskDetails.PropTypes={
    task: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        dueDate:PropTypes.instanceOf(Date).isRequired
    }).isRequired
}