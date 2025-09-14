import { useState } from "react";

const useUserTasks = () => {
    return useState(() => {
        const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        const tasksArray = Array.isArray(tasks) ? tasks : [tasks];
        return tasksArray.filter(
            (t) => String(t.userId) === String(localStorage.getItem("userId"))
        );
    });
};

export default useUserTasks;