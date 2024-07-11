import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import '../App.css'; 

const ProfilePage = () => {
    const token = Cookies.get('authToken');
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/users/${token}`);
                if (response.status !== 200) {
                    throw new Error('User not found');
                }
                const userData = await response.json();
                setUser(userData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user:', error);
                setLoading(false);
            }
        };

        fetchUser();
    }, [token]);

    if (loading) {
        return <div className="profile-loading">Loading...</div>;
    }

    if (!user) {
        return <div className="profile-error">User not found</div>;
    }

    const dateTimeString = user.date;
    const dateObject = new Date(dateTimeString);
    const formattedDate = dateObject.toISOString().split('T')[0];

    return (
        <div className="profile-container">
            <h2>My Profile</h2>
            <div className="profile-details">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Location:</strong> {user.location}</p>
                <p><strong>Date created:</strong> {formattedDate}</p>
            </div>
        </div>
    );
};

export default ProfilePage;
