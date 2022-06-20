import React, { useState } from 'react';
import './users.css';
import { Link } from "react-router-dom";
import { postNewUser } from "../../utils/users.js";
export function SignUp(props) {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [msgError, setMsgError] = useState('');

    const addUser = (e) => {
        e.preventDefault();
        if (!isEmail(email)) {
            postNewUser(username, password, email)
            .then((res) => checkPOSTNewUser(res));
        }else{
            setMsgError("Invalid format for email");
        }
    }
    const isEmail = (value) => {

        return /^\w+([-]?\w+)*@\w+([-]?\w+)*(\w{2,4})+$/.test(value);
        
    }
    //Check the response from the server
    const checkPOSTNewUser = (res) => {
        if (res === "OK") {
            setUsername('');
            setEmail('');
            setPassword('');
            setPassword2('');
            setMsgError('');
            props.history.push('/sign-in')
        }
    }

    return (
        <div className="App">
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form>
                        <h3>Sign Up</h3>
                        <div className="form-group">
                            <label>Username*</label>
                            <input type="text" value={username} className="form-control" placeholder="First name" onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Email address*</label>
                            <input type="email" value={email} className="form-control" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                       
                        <p style={{color:"#FF0000"}}>{msgError}</p>
                     
                        <div className="form-group">
                            <label>Password*</label>
                            <input type="password" value={password} className="form-control" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Repeat password*</label>
                            <input type="password" value={password2} className="form-control" placeholder="Repeat password" onChange={(e) => setPassword2(e.target.value)} />
                        </div>
                        {password !== password2 ? (
                            <p style={{color:"#FF0000"}}>Passwords are not the same!</p>
                        ) : (
                            ""
                        )}
                        {!username || !email || !password || !password2 || (password !== password2) ? (
                            <button type="submit" disabled="true" className="btn btn-primary btn-block" onClick={addUser}>Sign Up</button>
                        ) : (
                            <button type="submit" className="btn btn-primary btn-block" onClick={addUser}>Sign Up</button>
                        )}
                        
                        <p className="forgot-password text-right">
                            Already registered? <Link to="/">Sign In</Link>
                        </p>
                        <p className="forgot-password text-left">
                            *Compulsory fields
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );

}