import React from 'react';
import useAuth from '../../hook/useAuth';

const Home = () => {
    const { user } = useAuth();
    return (
        <div>
            <h2>this is home</h2>
            <h2>User : {user.displayName}</h2>
        </div>
    );
};

export default Home;