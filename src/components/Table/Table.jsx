import React from "react";
import { useState } from "react";
import UpdateModal from "../UpdateModal/UpdateModal";

function Table(props) {
    const users = props.data;
    const [isOpenedUpdate , setIsOpenedUpdate] = useState(false);
    const [userId , setUserId] = useState('');

    const updateUser = (e) => {
        console.log(e);
        setUserId(e);
        setIsOpenedUpdate(!isOpenedUpdate);
    };

    const deleteUser = (e) => {
        e.preventDefault();
        console.log('ali');
    };
    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th className="scope">#</th>
                        <th className="scope">Name</th>
                        <th className="scope">Email</th>
                        <th className="scope">Role</th>
                        <th className="scope">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? users.map(user => {
                        return (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <button onClick={() => updateUser(user.id)} className="btn btn-success">Edit</button>
                                    &nbsp;&nbsp;
                                    <button onClick={() => deleteUser(user.id)} className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        )
                    }) 
                    :
                    (
                        <tr colSpan={5}><td>No Data</td></tr>
                    )}
                </tbody>
            </table>
            <UpdateModal toggle={isOpenedUpdate} action={updateUser} userId={userId} updateTable={props.update}/>
        </>
    );
}

export default Table;