import { useState, useEffect, useCallback, useMemo } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import DropDown from '../../Components/DropDown/DropDown';
import Style from './Tasks.module.scss';
import TaskContainer from "./TaskContainer";
import axios from "axios";


function Tasks() {
    const [mode, setMode] = useState("create");
    const [displayModal, setDisplayModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [tasks, setTasks] = useState([]);

    // Fetch tasks for the current user
    const fetchTasks = useCallback(async () => {
        try {
            const res = await axios.get(
                `https://localhost:7092/api/Tasks/user/${localStorage.getItem('userId')}`
            );
            if (res.data) setTasks(res.data);
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

    // Update tasks state after creating/updating a task
    const handleTaskSuccess = (task) => {
        if (mode === "create") {
            setTasks(prev => [...prev, task]);
        } else if (mode === "delete") {
            setTasks(p => p.filter(t => t.id !== task));
        } else {
            setTasks(prev => prev.map(t => t.id === task.id ? task : t));
        }
        handleCloseModal();
    };

    const sortedTasks = useMemo(() => {
        return [...tasks].sort((a, b) => {
            const dateOfFirst = new Date(a.dueDate);
            const dateOfSec = new Date(b.dueDate);
            return dateOfFirst - dateOfSec;
        });
    }, [tasks]);

    return (
        <>
            <section className={`row justify-center ${Style.tasks}`}>
                <div className={`row justify-center ${Style.filter}`}>
                    <DropDown />
                </div>

                {/* Modal */}
                {displayModal && (
                    <TaskContainer
                        mode={mode}
                        initialTask={selectedTask}
                        onClose={handleCloseModal}
                        onSuccess={handleTaskSuccess} // <-- update task list
                    />
                )}

                {/* Task list */}
                <div className={`row ${Style['tasks-list']}`}>
                    {/* Create button */}
                    <div
                        className={`row justify-center ${Style.create} ${Style.card}`}
                        onClick={() => handleOpenModal("create")}
                    >
                        <FaPlus color="#c2d5f6" size={24} />
                    </div>
                    {sortedTasks?.map((task, index) => (
                        <div key={index} className={`row justify-center ${Style.card}`}>
                            <h2>{task.title}</h2>
                            <p>{task.description}</p>
                            <time>{new Date(task.dueDate).toLocaleDateString()}</time>

                            <div
                                className={`row justify-center ${Style['options']}`}
                            >
                                <FaTrash color="red" size={22} onClick={() => handleOpenModal("delete", task)} />
                                <FaEdit color="#c2d5f6" size={22} onClick={() => handleOpenModal("update", task)} />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}

export default Tasks;
