import React from 'react'
import {useForm} from 'react-hook-form'

function FormContainer({children, onSubmit}){
    const {register, handleSubmit, formState:{errors}} = useForm();

    return(
        <form onSubmit={handleSubmit(onSubmit)} className='form-style flex flex-direction-column'>
            {React.cloneElement(children, {register,errors})}
            <button type='submit' className='form-button'>Submit</button>
        </form>
    );
}
export default FormContainer