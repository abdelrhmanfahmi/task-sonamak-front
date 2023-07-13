import React, { useEffect } from "react";
import { useState } from "react";
import CreateModal from "../components/CreateModal/CreateModal";
import Table from "../components/Table/Table";
import styled from './Todo.module.css';
import { ToastContainer } from 'react-toastify';
import axios from "axios";


function Todo(){
    const [isOpenedCreate , setIsOpenedCreate] = useState(false);
    const [users , setUsers] = useState([]);

    const getData = () => {
        axios.get(`http://127.0.0.1:8000/api/users`).then((res) => {
            setUsers(res.data.data);
        }).catch((err) => {
            console.log(err);
        });
    };

    useEffect(() => {
        getData();
    },[]);

    const createUser = () => {
        setIsOpenedCreate(!isOpenedCreate);
    };
    
    return (
        <>
            <div className="container pt-5">
                <div className="row">
                    <div className="col-md-12 d-flex bd-highlight">
                        <div className={`${styled.styleH3} p-2 flex-grow-1 bd-highlight`}>
                            <h4>Todo List App</h4>
                        </div>
                        
                        <div className="p-2 bd-highlight">
                            <button onClick={createUser} className="btn btn-primary">Create User</button>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <Table data={users} update={getData}/>
                    </div>
                </div>
            </div>
            <CreateModal toggle={isOpenedCreate} action={createUser} update={getData}/>
            <ToastContainer />
        </>
    );
}

export default Todo;