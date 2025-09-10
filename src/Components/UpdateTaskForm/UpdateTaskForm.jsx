
function UpdateTaskForm({register, errors}){


    return(
        <div className={`flex flex-direction-column controls`}>
            <div className={`flex field`}>
                <label htmlFor="title">Title:</label>
                <input id="title" type="text" placeholder="Enter task's title"  {...register('title',{required:"Title is required", minLength:{value:5, message:"Title must be at least 5 chracters"}, maxLength:{value:32, message:"Title must be at most 32 chracters"} })}/>
            </div>
            <p className="error">{errors.title?.message}</p>
            <div className={`flex field`}>
                <label htmlFor="description">Description:</label>
                <textarea id="description" name="description" placeholder="Enter task's description"  cols={15} rows={3} {...register('description',{required:"Description is required", minLength:{value:5, message:"Title must be at least 10 chracters"}, maxLength:{value:32, message:"Title must be at most 100 chracters"}})}/>
            </div>
            <p className="error">{errors.description?.message}</p>
            <div className={`flex field`}>
                <label htmlFor="duedate">Due Date:</label>
                <input id="duedate" name="duedate" type="date" placeholder="Enter task's duedate" {...register('dueDate',{required:"Duedate is required", validate:(value) => {
                    const today=new Date();
                    today.setHours(0,0,0,0);
                    const selectedDate=new Date(value);
                    return selectedDate>=today || "Duedate can't be in the past!"
                }})}/>
            </div>
            <p className="error">{errors.duedate?.message}</p>
            <div className={`flex field`}>
                <label htmlFor="isCompleted">Completed:</label>
                <input 
                    id="isCompleted"
                    type="checkbox" 
                    {...register('isCompleted', { setValueAs: v => !!v })}
                />
            </div>
            <p className="error">{errors.duedate?.message}</p>
        </div>
    );
}
export default UpdateTaskForm;