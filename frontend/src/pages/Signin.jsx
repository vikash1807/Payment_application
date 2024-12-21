import Button from "../components/Button"
import Heading from "../components/Heading"
import InputBox from "../components/InputBox"
import SubHeading from "../components/SubHeading"
import BottomWarning from "../components/BottomWarning"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export function Signin() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    return (
        <div className ="bg-gray-300 min-h-screen flex justify-center">
        <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white text-center px-4 pb-5 h-max">

        <Heading label={'Sign in'} />
        <SubHeading label={'Enter your login information'} />

        <InputBox onChange={e => {
            setUsername(e.target.value)}} label={'Username'} placeholder={'example@gmail.com'} />
        <InputBox onChange={e => {
            setPassword(e.target.value)}} label={'Password'} placeholder={'Minimum of 6 chars'} />
        
        <Button onClick = { async () => {
            try {
                const response = await axios.post('http://localhost:3000/api/v1/user/signin', {
                    username,
                    password
                })
                if(response.status === 200) {
                    console.log('Logged in');
                    localStorage.setItem("token", response.data.token);
                    navigate(`/dashboard`)
                }
                console.log(response.status);
            } catch(error) {
                console.error("login failed : ", error.message);
            }
        }} label={'Sign in'}/>

        <BottomWarning label={`Don't have an account?`} buttontext={'Sign up'} redirect={'/signup'} />
        </div>
        </div>
        </div>
    )
}