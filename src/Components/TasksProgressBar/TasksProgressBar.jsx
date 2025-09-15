import { Progress, Completed } from './ProgressBar.styles.js';
import PropTypes from 'prop-types'

function TasksProgressBar(props){

    const {tasks} = props

    const completed= tasks.filter(t=> t.isCompleted).length;
    const percentage = tasks.length > 0 ? Math.round((completed / tasks.length) * 100) : 0;

    return (
        <>
            <Progress>
                <Completed width={`${percentage}%`} />

            </Progress>
             <div>
                {completed}/{tasks.length} ({percentage} %)
            </div>
        </>
    );

}
export default TasksProgressBar;

TasksProgressBar.PropTypes={
    tasks: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            title: PropTypes.string,
            description: PropTypes.string,
            isCompleted: PropTypes.bool.isRequired,
            dueDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    })
    ),
}