import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    const [isauthenticated, setIsauthenticated] = useState(false);

    useEffect(()=>{
        const token = localStorage.getItem("token") || "";
        axios.get('http://localhost:3000/api/v1/auth/verify',{
            headers : {
                Authorization : `Bearer ${token}`
            } 
        }).then(function (response) {
            if(response.status === 200) {
                setIsauthenticated(true);
            }
        }).catch(()=>{
            navigate(`/signin`);
        })
    },[isauthenticated]);

    return isauthenticated ? children : null;
}