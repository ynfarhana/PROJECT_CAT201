import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginSignup.css';

function LoginSignup() {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    
    const navigate = useNavigate();

    const changeHandler = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const login = async () => {
        console.log("Login Function Executed", formData);
        
        // 1. Connect to YOUR Java Backend (Port 8081)
        try {
            const response = await fetch('http://localhost:8080/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.status === 'success') {
                // 2. Login Successful!
                alert(data.message);
                // Save the token/role to browser storage
                localStorage.setItem('auth-token', 'fake-token'); 
                localStorage.setItem('user-role', 'admin'); 
                
                // 3. Redirect to the Admin Dashboard (We need to create this page!)
                navigate('/admin'); 
            } else {
                alert(data.message); // "Invalid Credentials"
            }
        } catch (error) {
            console.error("Error connecting to Java Backend:", error);
            alert("Connection Failed. Is the Java Server running?");
        }
    }

    return (
        <div className='loginsignup'>
            <div className="loginsignup-container">
                <h1>Admin Login</h1>
                <div className="loginsignup-fields">
                    <input type="text" name="username" value={formData.username} onChange={changeHandler} placeholder='Username' />
                    <input type="password" name="password" value={formData.password} onChange={changeHandler} placeholder='Password' />
                </div>
                <button onClick={login}>Continue</button>
                <p className="loginsignup-login">
                    Not an Admin? <span>Contact Support</span>
                </p>
            </div>
        </div>
    )
}

export default LoginSignup;