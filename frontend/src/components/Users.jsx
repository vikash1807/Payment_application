import { useEffect, useState } from "react"
import InputBox from "./InputBox"
import Button from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState('');

    // implemented debouncing to reduce api call while typing in search bar

    useEffect( () => {
        const fetchUsers = setTimeout(async () => {
            if(filter) {
                const response = await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`);
                setUsers(response.data.users);
            } else {
                setUsers([]);
            }
        },150);
        return () => clearTimeout(fetchUsers);
    }, [filter]);

    return (
        <div className="mx-3">
            <InputBox onChange={ (e) => {
                setFilter(e.target.value);
            }} label={'Users'} placeholder={'Search user'} />
            <div>
                {users.map(user => <User user={user} key={user._id} />)}
            </div>
        </div>

    )
}

function User({user}) {
    const navigate = useNavigate();
    return (
        <div className="flex justify-between my-2 hover:bg-slate-400">
            <div className="flex flex-col justify-center mx-2 font-medium">{user.firstName + " " + user.lastName}</div>
            <div>
                <Button onClick={()=>{
                    navigate(`/send?id=${user._id}&name=${user.firstName}`);
                }} label={'Send money'} />
            </div>
        </div>
    )
}