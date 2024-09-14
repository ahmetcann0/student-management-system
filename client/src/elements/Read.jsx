import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function Read() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        axios
            .get(`/get_student/${id}`)
            .then((res) => {
                setData(res.data);
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

    return (
        <div className="container-fluid vw-100 vh-100 bg-light d-flex flex-column align-items-center py-5">
            <div className="w-75">
                <h1 className="mb-4">User {id}</h1>
                <Link to="/" className="btn btn-success mb-4">
                    Back
                </Link>
                <div className="card">
                    <div className="card-body">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <b>ID:</b>
                                <span>{data?.id || 'N/A'}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <b>Name:</b>
                                <span>{data?.name || 'N/A'}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <b>Email:</b>
                                <span>{data?.email || 'N/A'}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <b>Gender:</b>
                                <span>{data?.gender || 'N/A'}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <b>Age:</b>
                                <span>{data?.age || 'N/A'}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Read;
