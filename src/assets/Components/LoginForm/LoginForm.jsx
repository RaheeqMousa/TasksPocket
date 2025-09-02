
function LoginForm(){

    return(
        <div className={`flex flex-direction-column controls`}>
            <div className={`flex field`}>
                <label>Username</label>
                <input name="name" />
            </div>
            <div className={`flex field`}>
                <label>Password</label>
                <input type="password" name="password" />
            </div>
        </div>
    );
}
export default LoginForm;