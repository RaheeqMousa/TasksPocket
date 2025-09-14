import PropTypes from "prop-types";
import { FaEdit, FaTrash, FaInfoCircle } from "react-icons/fa";
import { MdDragIndicator } from "react-icons/md";
import Style from './TaskCard.module.scss';
import { memo } from "react";
import { TbUrgent } from "react-icons/tb";
import { IoIosWarning } from "react-icons/io";
import { FaCalendar } from "react-icons/fa";

function TaskCard(props) {

   const { task, index, handleMouseDown, handleMove, checkTask, borderColor, handleOpenModal }=props;

   const FormattedDate = memo(({ dateString }) => (
    <>{new Date(dateString).toLocaleDateString()}</>
    ));

    const today= new Date();
    const due= new Date(task.dueDate);
    const diff= due -today;
    const daysLeft= Math.ceil(diff/(1000* 24* 60* 60));
    let dateClass="";
    if(daysLeft>=0 && daysLeft<=3){
        dateClass="warning";
    }else if(daysLeft<0){
        dateClass="urgent";
    }else{
        dateClass="coming";
    }

  return (
    <div
      aria-label="Task, draggable"
      className={`row justify-center ${Style.card}`}
      style={borderColor}
      onMouseDown={handleMouseDown(index)}
      onMouseMove={handleMove(index)}
    >
      <div className={`row ${Style['drag-icon']}`} aria-label="Drag icon">
        {dateClass==='urgent'? <TbUrgent color="red" size={26} /> : dateClass==='warning'? <IoIosWarning color="orange" size={26} />: <FaCalendar color="green" size={24} />}
        <MdDragIndicator />
      </div>

      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <time className={`${Style[dateClass] }`}>
        <FormattedDate dateString={task.dueDate} />
      </time>

      <div className={`row justify-center ${Style["options"]}`}>
        <button aria-label={`Delete task ${task.title}`} onClick={() => handleOpenModal("delete", task)}>
          <FaTrash color="red" size={22} />
        </button>

        <button aria-label={`Edit task ${task.title}`} onClick={() => handleOpenModal("update", task)}>
          <FaEdit color="#c2d5f6" size={22} />
        </button>

        <button aria-label={`Display details of task ${task.title}`} onClick={() => handleOpenModal("details", task)}>
          <FaInfoCircle color="black" size={22} />
        </button>

        <input
          type="checkbox"
          checked={task.isCompleted}
          onChange={() => checkTask(task)}
          aria-label={`Mark task ${task.title} as completed`}
        />
      </div>
    </div>
  );

}

export default TaskCard;

TaskCard.propTypes = {
  task: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    dueDate: PropTypes.instanceOf(Date).isRequired,
    isCompleted: PropTypes.bool
  }).isRequired,
  index: PropTypes.number.isRequired,
  handleMouseDown: PropTypes.func.isRequired,
  handleMove: PropTypes.func.isRequired,
  checkTask: PropTypes.func.isRequired,
  handleOpenModal: PropTypes.func.isRequired,
  borderColor: PropTypes.object
};