import { useCallback, useMemo } from "react";
import Style from './TasksFilter.module.scss';
import {FILTER_ITEMS} from './constants.js'
import DropDown from "../DropDown/DropDown.jsx";
import PropTypes from "prop-types";

function TasksFilter(props){

  const {setFilteredTasks, tasks, setTheme}=props

  const getCompletedTasks = useCallback(() => {
    setFilteredTasks(tasks.filter((t) => t.isCompleted));
  }, [tasks, setFilteredTasks]);

  const getNonCompletedTasks = useCallback(() => {
    setFilteredTasks(tasks.filter((t) => !t.isCompleted));
  }, [tasks, setFilteredTasks]);

  const getAllTasks = useCallback(() => {
    setFilteredTasks(tasks);
  }, [tasks, setFilteredTasks]);

    const nearestDueDateAction = useCallback(() => {
      const sortedTasks = [...tasks].sort((a, b) => 
        new Date(a.dueDate) - new Date(b.dueDate)
      );
      setFilteredTasks(sortedTasks);
    },[tasks, setFilteredTasks]);

  const setCardTheme = useCallback( (color) => {
    setTheme(color);
    localStorage.setItem("themeColor", color);
  },[setTheme]);

  
    const filterActions = useMemo(() => [
      getAllTasks,
      getCompletedTasks,
      getNonCompletedTasks,
      nearestDueDateAction
    ], [getAllTasks, getCompletedTasks, getNonCompletedTasks, nearestDueDateAction]);


    return (
    <div className={`row ${Style.filter}`}>
        <input type="color" onChange={(e) => setCardTheme(e.target.value)} aria-label="Choose your theme color" />
        <DropDown
          items={FILTER_ITEMS}
          Actions={filterActions}
          aria-label="Filter tasks"
        />
    </div>
    );

}
export default TasksFilter;

TasksFilter.PropTypes={
  setFilteredTasks: PropTypes.func.isRequired,
  setTheme: PropTypes.func.isRequired,
  tasks: PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    isCompleted: PropTypes.bool.isRequired,
    dueDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  })).isRequired,
};