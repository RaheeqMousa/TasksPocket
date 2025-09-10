import { useState, useEffect, useCallback, useRef } from "react";
import { FaPlus, FaEdit, FaTrash, FaInfoCircle } from "react-icons/fa";
import DropDown from "../../Components/DropDown/DropDown";
import Style from "./Tasks.module.scss";
import TaskContainer from "../../Containers/TaskContainer/TaskContainer";
import axios from "axios";

function Tasks() {
  const [mode, setMode] = useState("create");
  const [displayModal, setDisplayModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState(() => {
    let stored = JSON.parse(localStorage.getItem("tasks") || "[]");
    if (!Array.isArray(stored)) stored = [stored];
    const userTasks = stored.filter(
      (t) => String(t.userId) === String(localStorage.getItem("userId"))
    );
    return userTasks;
  });
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [theme, setTheme] = useState(
    localStorage.getItem("themeColor") || "#c2d5f6"
  );
  const draggedItem = useRef(null);

  // Drag handlers
  const handleMouseDown = useCallback((index) => {
    draggedItem.current = index;
  }, []);

  const handleMouseUp = useCallback(() => {
    draggedItem.current = null;
  }, []);

  const handleMove = useCallback(
    (index) => {
      if (draggedItem.current === null) return;

      const newItems = [...filteredTasks];
      const dragged = newItems[draggedItem.current];

      newItems.splice(draggedItem.current, 1);
      newItems.splice(index, 0, dragged);

      setFilteredTasks(newItems);
      setTasks(newItems);

      let allTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      if (!Array.isArray(allTasks)) allTasks = [allTasks];

      const otherUsers = allTasks.filter(
        (t) => String(t.userId) !== String(localStorage.getItem("userId"))
      );

      const merged = [...otherUsers, ...newItems];
      localStorage.setItem("tasks", JSON.stringify(merged));

      draggedItem.current = index;
    },
    [filteredTasks]
  );

  // Fetch tasks
  const fetchTasks = useCallback(async () => {
    try {
      const res = await axios.get(
        `https://localhost:7092/api/Tasks/user/${localStorage.getItem("userId")}`
      );
      if (res.data) {
        const sorted = [...res.data].sort(
          (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
        );
        setTasks(sorted);
        setFilteredTasks(sorted);
      }
    } catch (e) {
      console.error(e);
      let tasksFromStorage = JSON.parse(localStorage.getItem("tasks") || "[]");
      if (!Array.isArray(tasksFromStorage)) tasksFromStorage = [tasksFromStorage];

      const userTasks = tasksFromStorage.filter(
        (t) => t.userId === localStorage.getItem("userId")
      );


      setTasks(userTasks);
      setFilteredTasks(userTasks);
    }
  }, []);

  useEffect(() => {
    const run = async () => {
      await fetchTasks();
    };
    run();
  }, [fetchTasks]);

  // Modal handlers
  const handleOpenModal = useCallback((mode, task = null) => {
    setMode(mode);
    setSelectedTask(task);
    setDisplayModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setDisplayModal(false);
    setSelectedTask(null);
  }, []);


  const insertTaskByDueDate = (tasks, newTask) => {
    const newDate = new Date(newTask.dueDate);
    const index = tasks.findIndex(t => new Date(t.dueDate) > newDate);

    if (index === -1) return [...tasks, newTask]; // append if last

    return [...tasks.slice(0, index), newTask, ...tasks.slice(index)];
  };
  // Task updates
  const handleTaskSuccess = useCallback(
    (task) => {
      if (mode === "create") {
        const updated= insertTaskByDueDate(tasks,task);
        setTasks(updated);
        setFilteredTasks(updated);
        let allTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        const otherUsers = allTasks.filter(
          (t) => t.userId !== localStorage.getItem('userId')
        );
        localStorage.setItem("tasks", JSON.stringify([...otherUsers, ...updated]));
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
    },
    [mode, tasks, handleCloseModal]
  );

  // Filter actions
  const getCompletedTasks = useCallback(() => {
    setFilteredTasks(tasks.filter((t) => t.isCompleted));
  }, [tasks]);

  const getNonCompletedTasks = useCallback(() => {
    setFilteredTasks(tasks.filter((t) => !t.isCompleted));
  }, [tasks]);

  const getAllTasks = useCallback(() => {
    setFilteredTasks(tasks);
  }, [tasks]);

  const setCardTheme = (color) => {
    setTheme(color);
    localStorage.setItem("themeColor", color);
  };

  const borderColor = { border: `4px solid ${theme}` }

  return (
    <section className={`row justify-center ${Style.tasks} container`}>
      <div className={`row ${Style.filter}`}>
        <input type="color" onChange={(e) => setCardTheme(e.target.value)} />
        <DropDown
          items={["All", "Completed", "Not completed"]}
          Actions={[getAllTasks, getCompletedTasks, getNonCompletedTasks]}
          aria-label="Filter tasks"
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
      <div className={`row ${Style["tasks-list"]}`} onMouseUp={handleMouseUp}>
        {/* Create button */}
        <div
          className={`row justify-center ${Style.create} ${Style.card}`}
          onClick={() => handleOpenModal("create")}
          style={borderColor}
          aria-label="Create Task"
        >
          <FaPlus color="#c2d5f6" size={24} />
        </div>

        {filteredTasks?.map((task, index) => (
          <div
            key={task.id} // Use task id instead of index
            className={`row justify-center ${Style.card}`}
            style={borderColor}
            onMouseDown={() => handleMouseDown(index)}
            onMouseMove={() => handleMove(index)}
          >
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <time>{new Date(task.dueDate).toLocaleDateString()}</time>

            <div className={`row justify-center ${Style["options"]}`}>
              <button
                aria-label={`Delete task ${task.title}`}
                onClick={() => handleOpenModal("delete", task)}
              >
                <FaTrash color="red" size={22} />
              </button>

              <button
                aria-label={`Edit task ${task.title}`}
                onClick={() => handleOpenModal("update", task)}
              >
                <FaEdit color="#c2d5f6" size={22} />
              </button>

              <button
                aria-label={`Display details of task ${task.title}`}
                onClick={() => handleOpenModal("details", task)}
              >
                <FaInfoCircle color="black" size={22} />
              </button>

              <input
                type="checkbox"
                checked={task.isCompleted}
                onChange={() => checkTask(task, setTasks, setFilteredTasks)}
                aria-label={`Mark task ${task.title} as completed`}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const checkTask = async (task, setTasks, setFilteredTasks) => {
  const updatedTask = { ...task, isCompleted: !task.isCompleted };

  try {
    const res = await axios.put(
      `https://localhost:7092/api/Tasks/update/${task.id}`,
      updatedTask
    );

    if (res.data) {
      setTasks((prev) => prev.map((t) => (t.id === task.id ? res.data : t)));
      setFilteredTasks((prev) =>
        prev.map((t) => (t.id === task.id ? res.data : t))
      );
    }
  } catch (err) {
    console.error(err);
    const localTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const updatedTasks = localTasks.map((t) =>
      t.id === task.id ? { ...t, ...updatedTask } : t
    );
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
  }
};

export default Tasks;
