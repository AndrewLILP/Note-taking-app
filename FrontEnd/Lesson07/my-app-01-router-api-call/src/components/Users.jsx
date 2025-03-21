import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Users.css';

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div className="users-container">
            <h2>Users List</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id} className="user-card">
                        <h3>{user.name}</h3>
                        <p>{user.email}</p>
                        <Link to={`/users/${user.id}`}>View Details</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Users;