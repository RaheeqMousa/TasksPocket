import { useState, useEffect, useCallback, useRef } from "react";
import { FaPlus, FaEdit, FaTrash, FaInfoCircle } from "react-icons/fa";
import DropDown from "../../Components/DropDown/DropDown";
import Style from "./Tasks.module.scss";
import TaskContainer from "../../Components/TaskContainer/TaskContainer";
import axios from "axios";

function Tasks() {
  const [mode, setMode] = useState("create");
  const [displayModal, setDisplayModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [theme, setTheme] = useState(
    localStorage.getItem("themeColor")
      ? localStorage.getItem("themeColor")
      : "#c2d5f6"
  );
  const draggedItem = useRef(null);

  const handleMouseDown = (index) => {
    draggedItem.current = index;
  };

  const handleMouseUp = () => {
    draggedItem.current = null;
  };

  const handleMove = (index) => {
    if (draggedItem.current === null) return;

    const newItems = [...filteredTasks];
    const dragged = newItems[draggedItem.current];

    // remove and reinsert
    newItems.splice(draggedItem.current, 1);
    newItems.splice(index, 0, dragged);

    setFilteredTasks(newItems);
    setTasks(newItems); // keep main state in sync
    draggedItem.current = index;
  };

  // Fetch tasks for the current user
  const fetchTasks = useCallback(async () => {
    try {
      const res = await axios.get(
        `https://localhost:7092/api/Tasks/user/${localStorage.getItem(
          "userId"
        )}`
      );
      if (res.data) {
        // sort once on fetch
        const sorted = [...res.data].sort(
          (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
        );
        setTasks(sorted);
        setFilteredTasks(sorted);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Open modal for create or update
  const handleOpenModal = (mode, task = null) => {
    setMode(mode);
    setSelectedTask(task);
    setDisplayModal(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setDisplayModal(false);
    setSelectedTask(null);
  };

  // Update tasks state after creating/updating/delete a task
  const handleTaskSuccess = (task) => {
    if (mode === "create") {
      const updated = [...tasks, task].sort(
        (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
      );
      setTasks(updated);
      setFilteredTasks(updated);
    } else if (mode === "delete") {
      const updated = tasks.filter((t) => t.id !== task);
      setTasks(updated);
      setFilteredTasks(updated);
    } else {
      const updated = tasks.map((t) => (t.id === task.id ? task : t));
      setTasks(updated);
      setFilteredTasks(updated);
    }
    handleCloseModal();
  };

  const getCompletedTasks = () => {
    setFilteredTasks(tasks.filter((t) => t.isCompleted === true));
  };

  const getNonCompletedTasks = () => {
    setFilteredTasks(tasks.filter((t) => t.isCompleted === false));
  };

  const getAllTasks = () => {
    setFilteredTasks(tasks);
  };

  const setCardTheme = (color) => {
    setTheme(color);
    localStorage.setItem("themeColor", color);
  };

  const borderColor = {
    border: `4px solid ${theme}`,
  };

  return (
    <>
      <section className={`row justify-center ${Style.tasks}`}>
        <div className={`row ${Style.filter}`}>
          <input type="color" onChange={(e) => setCardTheme(e.target.value)} />
          <DropDown
            items={["All", "Completed", "Not completed"]}
            Actions={[getAllTasks, getCompletedTasks, getNonCompletedTasks]}
          />
        </div>

        {/* Modal */}
        {displayModal && (
          <TaskContainer
            mode={mode}
            initialTask={selectedTask}
            onClose={handleCloseModal}
            onSuccess={handleTaskSuccess}
          />
        )}

        {/* Task list */}
        <div
          className={`row ${Style["tasks-list"]}`}
          onMouseUp={handleMouseUp}
        >
          {/* Create button */}
          <div
            className={`row justify-center ${Style.create} ${Style.card}`}
            onClick={() => handleOpenModal("create")}
            style={borderColor}
          >
            <FaPlus color="#c2d5f6" size={24} />
          </div>

          {filteredTasks?.map((task, index) => (
            <div
              key={task.id}
              className={`row justify-center ${Style.card}`}
              style={borderColor}
              onMouseDown={() => handleMouseDown(index)}
              onMouseMove={() => handleMove(index)}
            >
              <h2>{task.title}</h2>
              <p>{task.description}</p>
              <time>{new Date(task.dueDate).toLocaleDateString()}</time>

              <div className={`row justify-center ${Style["options"]}`}>
                <FaTrash
                  color="red"
                  size={22}
                  onClick={() => handleOpenModal("delete", task)}
                />
                <FaEdit
                  color="#c2d5f6"
                  size={22}
                  onClick={() => handleOpenModal("update", task)}
                />
                <FaInfoCircle
                  color="black"
                  size={22}
                  onClick={() => handleOpenModal("details", task)}
                />
                <input
                  type="checkbox"
                  checked={task.isCompleted}
                  onChange={() => checkTask(task, setTasks)}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

const checkTask = async (task, setTasks) => {
  try {
    const updatedTask = { ...task, isCompleted: !task.isCompleted };
    const res = await axios.put(
      `https://localhost:7092/api/Tasks/update/${task.id}`,
      {
        Title: updatedTask.title,
        Description: updatedTask.description,
        DueDate: updatedTask.dueDate,
        IsCompleted: updatedTask.isCompleted,
        UserId: localStorage.getItem("userId"),
      }
    );
    if (res.data) {
      setTasks((prev) => prev.map((t) => (t.id === task.id ? res.data : t)));
    }
  } catch (err) {
    console.error(err);
  }
};

export default Tasks;
