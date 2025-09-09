

function RegisterForm({register, errors }){

    return (
        <div className='flex flex-direction-column controls'>

            <div className={`flex field`}>
                <label htmlFor='username'>New Username</label>
                <input id='username' name='username' {...register("username", {required:'Username is required', minLength:{value:3, message:"Username must be at least 3 chracters"}, maxLength:{value:30, message:"Username must be at most 30 chracters"} })}/>
            </div>
            <p className="error">{errors.username?errors.username.message:''}</p>

        </div>
    );

}
export default RegisterForm;