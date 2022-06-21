import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './users.css';
import { existsUser } from "../../utils/users.js";
export function Login(props) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [msgError, setMsgError] = useState('');
    const sumbitUser = async (e) => {
        e.preventDefault();
        existsUser(username, password).then((res) => checkExistsUser(res));
        // existsUser('tasty', '123').then((res) => checkExistsUser(res));
    }
    let navigate = useNavigate(); 
    const checkExistsUser = (res) => {
        if (res !== false) {
            console.log("CORRECT!");
            props.setUser(res);
            sessionStorage.setItem('id', res._id);
            sessionStorage.setItem('username', res.username);
            sessionStorage.setItem('email', res.email);
            sessionStorage.setItem('admin', res.admin);
            navigate("/home/"+res.username);
        }else{
            setMsgError("User and password are incorrect!");
        }
    }
    return (
        
        <div className="App">
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form>
                        <h3>Sign In</h3>
                        <div className="form-group">
                            <label>Username</label>
                            <input type="email" className="form-control" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Enter password" onChange={(e) => setPassword(e.target.value) }/>
                        </div>
                        <p color="danger" className="text-left">
                            {msgError}
                        </p>
                        {!username  || !password  ? (
                            <button type="submit" disabled={true} className="btn btn-primary btn-block" onClick={sumbitUser}>Sign In</button>
                        ) : (
                            <button type="submit" className="btn btn-primary btn-block" onClick={sumbitUser}>Sign In</button>
                        )}
                        <p className="forgot-password text-right">
                            Don't have an account? <Link to="/sign-up">Sign Up</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );

}