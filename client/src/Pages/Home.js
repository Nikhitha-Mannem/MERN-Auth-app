import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Home.module.css'; // Import the CSS module

const Home = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');

    useEffect(() => {
        const accesstoken = localStorage.getItem("accessToken");
        if (!accesstoken) {
            navigate('/login');
        } else {
            const username = localStorage.getItem("username");
            setUsername(username);
        }
    }, [navigate]);

    return (
        <div className={styles.container}>
            <h2>Welcome {username}</h2>
            <Link to='/logout' className={styles.logoutButton}>Logout</Link>
        </div>
    );
};

export default Home;
