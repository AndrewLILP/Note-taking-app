
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import '../styles/UserDetails.css';

const UserDetails = () => {
    const [user, setUser] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then(response => response.json())
            .then(data => setUser(data))
            .catch(error => console.error(error));
    }, [id]);

    if (!user) return <p className="loading">Loading...</p>;

    return (
        <div className="user-detail">
            <h2>{user.name}</h2>
            <p>Email: {user.email}</p>
            <p>City: {user.address.city}</p>
            <p>Phone: {user.phone}</p>
            <p>Website: {user.website}</p>
            <Link to="/users">Back to Users</Link>
        </div>
    );
};

export default UserDetails;