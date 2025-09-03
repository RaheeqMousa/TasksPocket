

function RegisterForm({register, errors }){

    return (
        <div className='flex flex-direction-column controls'>

            <div className={`flex field`}>
                <label htmlFor='username'>New Username</label>
                <input id='username' name='username' {...register("username", {required:'Username is required'})}/>
            </div>
            <p className="error">{errors.username?errors.username.message:''}</p>

        </div>
    );

}
export default RegisterForm;