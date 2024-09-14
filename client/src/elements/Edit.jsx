import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";

function Edit() {
    const [loading, setLoading] = useState(true);
    const [values, setValues] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`/get_student/${id}`)
            .then((res) => {
                setValues({
                    name: res.data.name,
                    email: res.data.email,
                    gender: res.data.gender,
                    age: res.data.age
                });
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div className="container-fluid vw-100 vh-100 d-flex justify-content-center align-items-center bg-primary text-white">
                <div>Loading...</div>
            </div>
        );
    }

    function handleSubmit(e) {
        e.preventDefault();

        axios.put(`/update_student/${id}`, values)
            .then((res) => {
                navigate('/');
                console.log(res);
            })
            .catch((err) => console.log(err));
    }

    return (
        <div className="container-fluid vw-100 vh-100 bg-light d-flex flex-column align-items-center py-5">
            <div className="w-75">
                <h1 className="mb-4 text-center">Edit User {id}</h1>
                <Link to="/" className="btn btn-success mb-4">
                    Back
                </Link>
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    name="name" 
                                    className="form-control" 
                                    value={values.name || ''} 
                                    required 
                                    onChange={(e) => setValues({...values, name: e.target.value})}
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    className="form-control" 
                                    value={values.email || ''} 
                                    required 
                                    onChange={(e) => setValues({...values, email: e.target.value})}
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label htmlFor="gender" className="form-label">Gender</label>
                                <input 
                                    type="text" 
                                    id="gender" 
                                    name="gender" 
                                    className="form-control" 
                                    value={values.gender || ''} 
                                    required 
                                    onChange={(e) => setValues({...values, gender: e.target.value})}
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label htmlFor="age" className="form-label">Age</label>
                                <input 
                                    type="number" 
                                    id="age" 
                                    name="age" 
                                    className="form-control" 
                                    value={values.age || ''} 
                                    required 
                                    onChange={(e) => setValues({...values, age: e.target.value})}
                                />
                            </div>

                            <div className="form-group mb-3 text-center">
                                <button type="submit" className="btn btn-success">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Edit;
