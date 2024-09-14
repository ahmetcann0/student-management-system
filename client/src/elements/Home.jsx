import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
    const [data, setData] = useState([]);
    const [deleted, setDeleted] = useState(false);

    useEffect(() => {
        axios.get('/students')
            .then((res) => {
                setData(res.data);
                setDeleted(false);
            })
            .catch((err) => console.log(err));
    }, [deleted]);

    function handleDelete(id) {
        axios.delete(`/delete_user/${id}`)
            .then((res) => {
                setDeleted(true);
            })
            .catch((err) => console.log(err));
    }

    return (
        <div className='container-fluid bg-light vh-100 vw-100'>
            <h3 className='text-center my-4'>Students</h3>
            <div className='d-flex justify-content-end mb-3'>
                <Link className='btn btn-primary' to='/create'>Add Student</Link>
            </div>
            <div className='table-responsive'>
                <table className='table table-striped table-bordered'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Gender</th>
                            <th>Age</th>
                            <th>Operations</th>

                        </tr>
                    </thead>
                    <tbody>
                        {data.map((student) => (
                            <tr key={student.id}>
                                <td>{student.id}</td>
                                <td>{student.name}</td>
                                <td>{student.email}</td>
                                <td>{student.gender}</td>
                                <td>{student.age}</td>

                                <td>
                                    <Link className='btn btn-info mx-1' to={`/read/${student.id}`}>Read</Link>
                                    <Link className='btn btn-warning mx-1' to={`/edit/${student.id}`}>Edit</Link>
                                    <button 
                                        onClick={() => handleDelete(student.id)} 
                                        className='btn btn-danger mx-1'
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Home;
