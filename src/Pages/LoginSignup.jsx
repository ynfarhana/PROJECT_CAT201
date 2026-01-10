import React, { useState } from 'react';
import './LoginSignup.css';
import { useNavigate } from 'react-router-dom';

const LoginSignup = () => {

  const [state, setState] = useState("Login");
  const [isAdmin, setIsAdmin] = useState(false); // <--- NEW: Track if user is Admin
  
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: ""
  });

  const navigate = useNavigate();

  const changeHandler = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  // === THE SMART LOGIN FUNCTION ===
  const login = async () => {
    
    // DECISION 1: Is this an Admin Login?
    if (isAdmin) {
        // --- ADMIN PATH ---
        console.log("Admin Login Executed");
        try {
            // Note: Admins use 'username' in your old code, but this form uses 'email'.
            // We will send the email as the username for now, or you can type your username in the email box.
            const adminData = {
                username: formData.email, // Using the email input as username
                password: formData.password
            };

            const response = await fetch('http://localhost:8080/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(adminData),
            });
            const data = await response.json();

            if (data.status === 'success') {
                localStorage.setItem('auth-token', 'admin-token');
                localStorage.setItem('user-role', 'admin');
                navigate('/admin'); // <--- Go to Dashboard
            } else {
                alert("Admin Login Failed: " + data.message);
            }
        } catch (error) {
            alert("Admin Connection Failed");
        }

    } else {
        // --- CUSTOMER PATH ---
        console.log("Customer Login Executed");
        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();

            if (data.success) {
                localStorage.setItem('auth-token', data.token);
                localStorage.setItem('user-info', JSON.stringify(data.user)); 
                navigate('/'); // <--- Go to Shop
                window.location.reload();
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert("Customer Connection Failed");
        }
    }
  }

  // Function 2: Sign Up (Always for Customers)
  const signup = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });
        const data = await response.json();

        if (data.success) {
            alert("Account Created! Please Login.");
            setState("Login");
        } else {
            alert(data.message);
        }
    } catch (error) {
        alert("Connection Failed");
    }
  }

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        
        <div className="loginsignup-fields">
          {state === "Sign Up" ? 
            <input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Your Name' /> 
            : <></>
          }
          
          {/* Note: For Admin, type your Username here. For User, type Email. */}
          <input name='email' value={formData.email} onChange={changeHandler} type="text" placeholder='Email Address (or Username)' />
          
          <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Password' />
        </div>

        {/* --- PROFESSIONAL ADMIN SWITCH --- */}
        {state === "Login" ? (
            <div className="admin-toggle-container">
                <span>Customer</span>
                <label className="switch">
                    <input 
                        type="checkbox" 
                        checked={isAdmin} 
                        onChange={(e) => setIsAdmin(e.target.checked)} 
                    />
                    <span className="slider"></span>
                </label>
                <span style={{color: isAdmin ? "#ff4141" : "#555"}}>Admin</span>
            </div>
        ) : null}

        <button onClick={() => {state === "Login" ? login() : signup()}}>Continue</button>
        
        {state === "Sign Up"
          ? <p className="loginsignup-login">Already have an account? <span onClick={() => {setState("Login"); setIsAdmin(false)}}>Login here</span></p>
          : <p className="loginsignup-login">Create an account? <span onClick={() => {setState("Sign Up"); setIsAdmin(false)}}>Click here</span></p>
        }
        
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup;