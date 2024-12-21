import { useEffect, useState } from "react";
import Appbar from "../components/Appbar";
import Balance from "../components/Balance";
import Users from "../components/Users";
import axios from "axios";

export function Dashboard() {
    
    const [balance, setBalance] = useState(0);
    const [user, setUser] = useState({});

    useEffect(()=>{
       axios.get(`http://localhost:3000/api/v1/account/balance`,{
            headers : {
                Authorization : "Bearer " + localStorage.getItem("token")
            }
       }).then(function (response) {
            setBalance(response.data.balance)
       })

       axios.get("http://localhost:3000/api/v1/user/info",{
            headers : {
                Authorization : "Bearer " + localStorage.getItem("token")
            }
        }).then(function (response) {
            setUser(response.data.user)
        })
    },[]);

    return (
        <div className="bg-gray-300 min-h-screen">
            <Appbar label={user} />
            <Balance amount={balance} />
            <Users />
        </div>
    )
}