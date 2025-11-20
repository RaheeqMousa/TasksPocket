import React from 'react'
import { useForm } from 'react-hook-form'
import PropTypes from 'prop-types';

function FormContainer(props) {
    const { children, onSubmit, serverError, initialData = null } = props;
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialData });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='form-style flex flex-direction-column'>
            {React.cloneElement(children, { register, errors })}
            <p className='error'>{serverError}</p>
            <button type='submit' className='form-button'>Submit</button>
        </form>
    );
}
export default FormContainer

FormContainer.propTypes = {
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func.isRequired,
  serverError: PropTypes.string,
  initialData: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    dueDate: PropTypes.oneOfType([
      PropTypes.instanceOf(Date),
      PropTypes.string,
    ]),
  }),
};