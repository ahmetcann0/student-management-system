import React, { useState } from "react";
import axios from 'axios'; 
import { Link, useNavigate } from "react-router-dom";

function Create() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        age: '',
        gender: ''
    });

    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        axios.post('/add_user', values)
            .then((res) => {
                navigate('/');
                console.log(res);
            })
            .catch((err) => {
                console.error("Error while saving data:", err);
            });        
    }

    return (
        <div className='container vh-100 vw-100 bg-light'>
            <div className='row justify-content-center'>
                <div className='col-md-8 col-lg-6'>
                    <h3 className='text-center mb-4'>Add Student</h3>
                    <div className='d-flex justify-content-end mb-3'>
                        <Link to='/' className='btn btn-primary'>Home</Link>
                    </div>
                    <form onSubmit={handleSubmit} className='bg-white p-4 rounded shadow-sm'>
                        <div className="form-group my-3">
                            <label htmlFor="name">Name</label>
                            <input 
                                type="text" 
                                id="name" 
                                name='name' 
                                className='form-control' 
                                value={values.name} 
                                required 
                                onChange={(e) => setValues({ ...values, name: e.target.value })}
                            />
                        </div>

                        <div className="form-group my-3">
                            <label htmlFor="email">Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                name='email' 
                                className='form-control' 
                                value={values.email} 
                                required 
                                onChange={(e) => setValues({ ...values, email: e.target.value })}
                            />
                        </div>

                        <div className="form-group my-3">
                            <label htmlFor="gender">Gender</label>
                            <input 
                                type="text" 
                                id="gender" 
                                name='gender' 
                                className='form-control' 
                                value={values.gender} 
                                required 
                                onChange={(e) => setValues({ ...values, gender: e.target.value })}
                            />
                        </div>

                        <div className="form-group my-3">
                            <label htmlFor="age">Age</label>
                            <input 
                                type="number" 
                                id="age" 
                                name='age' 
                                className='form-control' 
                                value={values.age} 
                                required 
                                onChange={(e) => setValues({ ...values, age: e.target.value })}
                            />
                        </div>

                        <div className="form-group my-3 text-center">
                            <button type="submit" className="btn btn-success">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
} 

export default Create;
