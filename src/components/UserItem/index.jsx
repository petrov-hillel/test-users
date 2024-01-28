import React from "react";
import { Link } from "react-router-dom";

const UserItem = ({ id, name, email, username }) => {

    return (
        <div className="py-2 border-b-2">
            <Link to={`/users/${id}`}>
              <p>User name: {username}</p>
              <p>Email: {email}</p>
              <p>Name: {name}</p>
            </Link>
        </div>
    );
};

export default UserItem;
