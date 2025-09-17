
import PropTypes from "prop-types";
function RegisterForm(props){
    const {register, errors }=props;
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

RegisterForm.propTypes = {
    register:PropTypes.func.isRequired,
    errors: PropTypes.object
};