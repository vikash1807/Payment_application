import Button from "../components/Button"
import Heading from "../components/Heading"
import SubHeading from "../components/SubHeading"
import BottomWarning from "../components/BottomWarning"
import InputBoxNumber from "../components/InputBoxNumber"
import Appbar from "../components/Appbar"
import { useNavigate, useSearchParams } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"

export function SendMoney() {

    const [inputAmount, setInputAmount] = useState(0);
    const [message, setMessage] = useState(""); 
    const [showPopup, setShowPopup] = useState(false);
    const [user, setUser] = useState("");

    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const name = searchParams.get('name');

    const navigate = useNavigate();

    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/user/info",{
             headers : {Authorization : "Bearer " + localStorage.getItem("token")}
            })
            .then(function (response) {
             setUser(response.data.user)
             // console.log(response.data.user);
            })
     },[]);

    return (
        <div className ="bg-gray-300 min-h-screen flex flex-col">

        <div>
            <Appbar label={user} />
        </div>

        <div className="flex-1 flex justify-center">
        <div className="flex flex-col justify-center">
        {showPopup && (
            <div className="fixed top-2 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
                {message}
            </div>
        )}
        <div className="rounded-lg bg-white text-center px-4 pb-5 h-max space-y-4">
        <Heading label={'Send Money'} />
        <div>
            <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-xl text-white">{name[0].toUpperCase()}</span>
                </div>
                <h3 className="text-xl font-semibold">{name}</h3>
            </div>
        </div>

        <InputBoxNumber onChange={(e) => {
            setInputAmount(e.target.value)
        }} label={'Amount (in Rs)'} placeholder={'Enter amount'} />

        <Button onClick={async () => {
            try{
                const response = await axios.post("http://localhost:3000/api/v1/account/transfer",{
                        receiverId : id,
                        amount : inputAmount
                    }, {
                        headers : {
                            Authorization : "Bearer " + localStorage.getItem("token")
                        }
                    }
                );
                if(response.status === 200) {
                    setMessage("Transfer successful!");
                    setShowPopup(true);
                    setTimeout(() => {
                        setShowPopup(false);
                        navigate('/dashboard');
                    }, 5000);
                }
                
            } catch(error) {
                setMessage("Transfer failure! Money not debited");
                setShowPopup(true);
                setTimeout(() => {
                    setShowPopup(false);
                    navigate('/dashboard');
                }, 5000);
                console.error("error", error.message);
            }
        }} label={'Transfer'} />
        </div>
        </div>
        </div>
        </div>
    )
}