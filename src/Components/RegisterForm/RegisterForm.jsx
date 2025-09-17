
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
function RegisterForm(props) {
    const {register, errors}=props;

    return (
        <div className='flex flex-direction-column controls'>

            <div className={`flex field`}>
                <label htmlFor='username'>Username</label>
                <input id='username' name='username' {...register("username", { required: 'Username is required', minLength: { value: 3, message: "Username must be at least 3 chracters" }, maxLength: { value: 30, message: "Username must be at most 30 chracters" } })} />
            </div>
            <p className="error">{errors.username ? errors.username.message : ''}</p>

            <div className={`flex field`}>
                <label htmlFor='email'>Email</label>
                <input id='email' name='email' type='email' {...register("email", {
                    required: 'Email is required', pattern: {
                        value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                        message: "Please enter a valid email address"
                    }
                })} />
            </div>
            <p className="error">{errors.email ? errors.email.message : ''}</p>

            <div className={`flex field`}>
                <label htmlFor='password'>Password</label>
                <input id='password' name='password' type='password' {...register("password", {
                    required: 'Password is required', minLength: { value: 6, message: "Password must be atleast 6 chracters" }, maxLength: { value: 30, message: "Password must be at most 30 chracters" }
                    ,
                })} />
            </div>
            <p className="error">{errors.password ? errors.password.message : ''}</p>

            <Link to="/auth/login">Already Have and account?</Link>
        </div>
    );

}
export default RegisterForm;

RegisterForm.propTypes = {
    register:PropTypes.func.isRequired,
    errors: PropTypes.object
};