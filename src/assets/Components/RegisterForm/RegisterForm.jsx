
import {Link} from 'react-router-dom'
function RegisterForm({register, errors }){

    return (
        <div className='flex flex-direction-column controls'>

            <div className={`flex field`}>
                <label htmlFor='username'>Username</label>
                <input id='username' name='username' {...register("username", {required:'Username is required'})}/>
            </div>
            <p className="error">{errors.username?errors.username.message:''}</p>

            <div className={`flex field`}>
                <label htmlFor='email'>Email</label>
                <input  id='email' name='email' type='email' {...register("email",{required:'Email is required'})}/>
            </div>
            <p className="error">{errors.email?errors.email.message:''}</p>

            <div className={`flex field`}>
                <label htmlFor='password'>Password</label>
                <input id='password' name='password' type='password' {...register("password",{required:'Password is required'})}/>
            </div>
            <p className="error">{errors.password?errors.password.message:''}</p>

            <Link to="/auth/login">Already Have and account?</Link>
        </div>
    );

}
export default RegisterForm;