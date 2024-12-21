import { useState } from "react"
import BottomWarning from "../components/BottomWarning"
import Button from "../components/Button"
import Heading from "../components/Heading"
import InputBox from "../components/InputBox"
import SubHeading from "../components/SubHeading"
import axios from 'axios';
import { useNavigate } from "react-router-dom"

export function Signup() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    return (
        <div className ="bg-gray-300 min-h-screen flex justify-center">
        <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white text-center p-3 h-max">

        <Heading label={'Sign up'} />
        <SubHeading label={'Enter your information to create an account'} />

        <InputBox onChange={e => {
            setFirstName(e.target.value)}} label={'First Name'} placeholder={'john'} />
        <InputBox onChange={e => {
            setLastName(e.target.value)}} label={'Last Name'} placeholder={'Doe'} />
        <InputBox onChange={e => {
            setUsername(e.target.value)}} label={'Username'} placeholder={'example@gmail.com'} />
        <InputBox onChange={e => {
            setPassword(e.target.value)}} label={'Password'} placeholder={'Minimum of 6 chars'} />

        <Button onClick = { async () => {
            try {
                const response = await axios.post('http://localhost:3000/api/v1/user/signup', {
                    username,
                    firstName,
                    lastName,
                    password
                })
                if(response.status === 200) {
                    console.log('Logged in');
                    localStorage.setItem("token", response.data.token);
                    navigate(`/dashboard`)
                }
            } catch(error) {
                console.error("login failed : ", error.message);
            }

        }} label={'Sign up'}/>

        <BottomWarning label={'Already have an account?'} buttontext={'Sign in'} redirect={'/signin'} />

        </div>
        </div>
        </div>
    )
}