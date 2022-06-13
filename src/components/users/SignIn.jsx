import React from "react";
import { Link } from "react-router-dom";
import './users.css';
export function Login(props) {
    return (
        <div className="App">
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form>
                        <h3>Sign In</h3>
                        <div className="form-group">
                            <label>Email address</label>
                            <input type="email" className="form-control" placeholder="Enter email" />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Enter password" />
                        </div>
                        <div className="form-group">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                            </div>
                        </div>
                        <Link to="/home">
                        <button type="submit" className="btn btn-primary btn-block" onClick={() => props.history.push('/home')}>Submit</button>
                        </Link>
                        <p className="forgot-password text-right">
                            Don't have an account? <Link to="/sign-up">Sing Up</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );

}