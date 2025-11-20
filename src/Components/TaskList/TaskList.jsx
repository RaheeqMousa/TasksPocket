import TaskCard from "../TaskCard/TaskCard";
import Style from './TaskList.module.scss';
import { FaPlus } from "react-icons/fa";
import { DragDropContext } from "../../Context/DragDropContext/DragDropContext";
import { useContext } from "react";
import PropTypes from "prop-types";

function TaskList(props) {

  const { borderColor, checkTask, handleOpenModal }=props;
  const { handleMouseDown, handleMouseUp, handleMove, filteredTasks } = useContext(DragDropContext);

  return (
    <div className={`row ${Style["tasks-list"]}`} onMouseUp={handleMouseUp}>
      <div
        className={`row justify-center ${Style.create} ${Style.card}`}
        onClick={() => handleOpenModal("create")}
        style={borderColor}
        aria-label="Create Task"
      >
        <FaPlus color="#c2d5f6" size={24} />
      </div>

      {filteredTasks?.map((task, index) => (
        <TaskCard
          key={task.id}
          index={index}
          task={task}
          checkTask={checkTask}
          handleOpenModal={handleOpenModal}
          borderColor={borderColor}
          handleMouseDown={handleMouseDown}
          handleMove={handleMove}
        />
      ))}
    </div>
  );
}

export default TaskList;

TaskCard.propTypes = {
  borderColor: PropTypes.object.isRequired,
  checkTask: PropTypes.func.isRequired,
  handleOpenModal: PropTypes.func.isRequired
};