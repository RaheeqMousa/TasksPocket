import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';

function LoginForm(props){
    const {register, errors}=props;
    return(
        <div className={`flex flex-direction-column controls`}>
            <div className={`flex field`}>
                <label htmlFor="username">Username</label>
                <input id="username" name="username" {...register("username", {required:'Username is required'})}/>
            </div>
            <p className="error">{errors.username?errors.username.message:''}</p>
            <div className={`flex field`}>
                <label htmlFor="password">Password</label>
                <input id="password" type="password" name="password" {...register("password", {required:'Password is required'})} />
            </div>
            <p className="error">{errors.password?errors.password.message:''}</p>
            <Link to="/auth/register">Don't have an account?</Link>
        </div>
    );
}
export default LoginForm;

LoginForm.propTypes = {
    register:PropTypes.func.isRequired,
    errors: PropTypes.object
};