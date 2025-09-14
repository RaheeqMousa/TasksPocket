import { useRef, useCallback } from "react";
import PropTypes from "prop-types";
import {DragDropContext} from './DragDropContext';

export function DragDropProvider(props) { 
   
  const {children,filteredTasks, setFilteredTasks, setTasks} = props;

  const draggedItem = useRef(null);

  const handleMouseDown = useCallback((index) => () => {
    draggedItem.current = index;
  }, []);

  const handleMouseUp = useCallback(() =>  {
    draggedItem.current = null;
  }, []);

    const handleMove = useCallback(
    (index) => 
    ()=>{
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
    [filteredTasks, setTasks, setFilteredTasks]
  );

  return (
    <DragDropContext.Provider value={{ handleMouseDown, handleMouseUp, handleMove, filteredTasks }}>
      {children}
    </DragDropContext.Provider>
  );
}

DragDropProvider.propTypes = {
  children: PropTypes.node.isRequired,
  filteredTasks: PropTypes.array.isRequired,
  setFilteredTasks: PropTypes.func.isRequired,
  setTasks: PropTypes.func.isRequired,
};