import React from "react";
import styled from './CreateModal.module.css';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { toast } from 'react-toastify';


function CreateModal (props) {
    const isOpenedCreate = props.toggle;
    const action = props.action;

    const Schema = yup.object({
        name:yup
            .string()
            .required()
            .min(2)
            .max(40),
        email:yup
            .string()
            .email()
            .required()
            .min(2)
            .max(40),
        password:yup 
            .string()
            .required()
            .min(8)
            .max(20),
        password_confirmation:yup 
            .string()
            .required()
            .min(8)
            .max(20)
            .oneOf([yup.ref('password')], 'Your passwords do not match.'),
        role:yup 
            .string()
            .required()
    });

    const formOptions = { resolver: yupResolver(Schema) }
    const { register, handleSubmit, formState } = useForm(formOptions)
    const { errors } = formState

    const getFormErrorMessage = (name) => {
        return errors[`${name}`] && <p className="mt-2 p-error text-danger text-xs p-0 m-0">
            {JSON.stringify(errors[`${name}`]?.message).slice(-1,1)}
        </p>
    };
    
    const submitForm = (data) => {
        console.log(data);
        let formData = new FormData();
        formData.append('name' , data.name);
        formData.append('email' , data.email);
        formData.append('password' , data.password);
        formData.append('password_confirmation' , data.password_confirmation);
        formData.append('role' , data.role);

        axios.post(`http://127.0.0.1:8000/api/users` , formData).then((res) => {
            action();
            props.update();
            console.log(res);
            toast.success(res.data.message, {
                position: toast.POSITION.TOP_RIGHT
            });
        }).catch((error) => {
            console.log(error);
        })
    };

    return  (
        <>
            <div id="myModal" className={isOpenedCreate ? `${styled.openedModal}` : `${styled.modal}`}>
                <div className={`${styled.modal_content}`}>
                    <span className={`${styled.close}`} onClick={action}>&times;</span>
                    <form onSubmit={handleSubmit(submitForm)}>
                        <div className="col mb-3">
                            <label>Name</label>
                                <input 
                                    type="text"
                                    id="name"
                                    {...register('name')}
                                    placeholder="Name"
                                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                />                            
                            {getFormErrorMessage('name')}
                        </div>

                        <div className="col mb-3">
                            <label>E-mail</label>
                                <input 
                                    type="text"
                                    id="email"
                                    {...register('email')}
                                    placeholder="E-mail"
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                />
                            {getFormErrorMessage('email')}
                        </div>

                        <div className="col mb-3">
                            <label>Password</label>
                            <input 
                                type="password"
                                id="password"
                                {...register('password')}
                                placeholder="Password"
                                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            />
                            {getFormErrorMessage('password')}
                        </div>

                        <div className="col mb-3">
                            <label>Confirm Password</label>
                            <input 
                                type="password"
                                id="password_confirmation"
                                {...register('password_confirmation')}
                                placeholder="Confirm Password"
                                className={`form-control ${errors.password_confirmation ? 'is-invalid' : ''}`}
                            />
                            {getFormErrorMessage('password_confirmation')}
                        </div>

                        <div className="col mb-3">
                            <label>Role</label>
                            <select 
                                name="role" 
                                id="role" 
                                {...register('role')}
                                className={`form-control ${errors.role ? 'is-invalid' : ''}`}
                            >
                                <option value=''>-- choose role --</option>
                                <option value="admin">Admin</option>
                                <option value="viewer">Viewer</option>
                                <option value="editor">Editor</option>

                            </select>
                            {getFormErrorMessage('role')}
                        </div>

                        <div className="col mb-3">
                            <button className="btn btn-success">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default CreateModal;