import { useState, useEffect, useCallback, useMemo } from "react";
import Style from "./Tasks.module.scss";
import TaskContainer from "../../Containers/TaskContainer/TaskContainer";
import axios from "axios";
import TasksFilter from "../../Components/TaskFilters/TasksFilter.jsx";
import TaskList from "../../Components/TaskList/TaskList.jsx";
import { DragDropProvider } from "../../Context/DragDropContext/DragDropProvider.jsx";
import useUserTasks from "../../Hooks/UseUserTasks.jsx";

function Tasks() {
  const [mode, setMode] = useState("create");
  const [displayModal, setDisplayModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useUserTasks();

  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [theme, setTheme] = useState(
    localStorage.getItem("themeColor") || "#c2d5f6"
  );

  const checkTask = useCallback(async (task) => {
    const updatedTask = { ...task, isCompleted: !task.isCompleted };

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/${task.id}`,
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
      setTasks(prev => prev.map(t => t.id === task.id ? { ...t, ...updatedTask } : t));
      setFilteredTasks(prev => prev.map(t => t.id === task.id ? { ...t, ...updatedTask } : t));

      const allTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      const updatedAllTasks = allTasks.map(t => t.id === task.id ? { ...t, ...updatedTask } : t);
      localStorage.setItem("tasks", JSON.stringify(updatedAllTasks));
    }
  }, [setTasks]);

  const fetchTasks = useCallback(async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/Tasks/user/${localStorage.getItem("userId")}`
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
  }, [setTasks]);

  useEffect(() => {
    const run = async () => {
      await fetchTasks();
    };
    run();
  }, [fetchTasks]);


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


  const handleTaskSuccess = useCallback(
    (task) => {
      if (mode === "create") {
        const updated = insertTaskByDueDate(tasks, task);
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
    [mode, tasks, handleCloseModal,setTasks]
  );


  const borderColor = useMemo(() => ({
    border: `4px solid ${theme}`
  }), [theme])



  return (
    <section className={`row justify-center ${Style.tasks} container`}>

      <TasksFilter setTheme={setTheme} setFilteredTasks={setFilteredTasks} tasks={tasks} />

      {displayModal && (
        <TaskContainer
          mode={mode}
          initialTask={selectedTask}
          onClose={handleCloseModal}
          onSuccess={handleTaskSuccess}
        />
      )}


      <DragDropProvider
        filteredTasks={filteredTasks}
        setFilteredTasks={setFilteredTasks}
        setTasks={setTasks}
      >
        <TaskList
          borderColor={borderColor}
          checkTask={checkTask}
          handleOpenModal={handleOpenModal}
        />
      </DragDropProvider>

    </section>
  );
}



export default Tasks;
