import React from 'react'
import {useForm} from 'react-hook-form'

function FormContainer({children, onSubmit}){
    const {register, handleSubmit, formState:{errors}} = useForm();

    return(
        <Form onSubmit={handleSubmit(onSubmit)}>
            {React.cloneElement(children, {register,errors})}
            <button type='submit'>Submit</button>
        </Form>
    );
}
export default FormContainer