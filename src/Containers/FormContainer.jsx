import React from 'react'
import {useForm} from 'react-hook-form'

function FormContainer(props){
    const {children, onSubmit, serverError,initialData=null} = props;
    const {register, handleSubmit, formState:{errors}} = useForm({defaultValues:initialData});

    return(
        <form onSubmit={handleSubmit(onSubmit)} className='form-style flex flex-direction-column'>
            {React.cloneElement(children, {register,errors})}
            <p className='error'>{serverError}</p>
            <button type='submit' className='form-button'>Submit</button>
        </form>
    );
}
export default FormContainer