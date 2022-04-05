import React from "react";
import './users.css';
export default function Login(props) {
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
                        <button type="submit" className="btn btn-primary btn-block" onClick={() => props.history.push('/home')}>Submit</button>
                        <p className="forgot-password text-right">
                            Don't have an account?  <a href="/sign-up">Sing Up</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );

}