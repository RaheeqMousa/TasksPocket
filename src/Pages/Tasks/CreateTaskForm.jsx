
function CreateTaskForm({register, errors}){

    return(
        <div className={`flex flex-direction-column controls`}>
            <div className={`flex field`}>
                <label htmlFor="title">Title:</label>
                <input id="title" type="text" placeholder="Enter task's title"  {...register('title',{required:"Title is required"})}/>
            </div>
            <p className="error">{errors.title? errors.title.message:''}</p>
            <div className={`flex field`}>
                <label htmlFor="description">Description:</label>
                <textarea id="description" name="description" placeholder="Enter task's description"  cols={15} rows={3} {...register('description',{required:"Description is required"})}/>
            </div>
            <p className="error">{errors.description? errors.description.message:''}</p>
            <div className={`flex field`}>
                <label htmlFor="duedate">Due Date:</label>
                <input id="duedate" name="duedate" type="date" placeholder="Enter task's duedate"  {...register('duedate',{required:"Duedate is required"})}/>
            </div>
            <p className="error">{errors.duedate? errors.duedate.message:''}</p>
        </div>
    );
}
export default CreateTaskForm;