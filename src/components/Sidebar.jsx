import React from 'react';

import { BsCollection } from 'react-icons/bs';
import { AiOutlineUser, AiOutlineLogout } from 'react-icons/ai';
import '../App.css';
export default function Sidebar(props) {

    return (
        <div class="sidebar">
            <h1> ToDoList</h1>
            <div class="sidebar-heading bg-light">Carlos Bernalte</div>
            <div class="list-group list-group-flush">
                <a class="list-group-item list-group-item-action  p-3" href="#!"><AiOutlineUser />  Profile</a>
                <a class="list-group-item list-group-item-action  p-3" href="#!"><BsCollection />  Collections</a>
                <div class="sidebar-footer">
                <a class="list-group-item list-group-item-action  p-3" href="/sign-in"><AiOutlineLogout />  Logout</a>
                </div>
            </div>
        </div>
    );
}