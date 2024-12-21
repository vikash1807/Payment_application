import { useNavigate } from "react-router-dom";

export default function Appbar({label}){
    const navigate = useNavigate();

    return (
        <div className="flex justify-between shadow border border-slate-400 text-xl font-medium py-2">
            <div className="flex mx-2">
                <div className="flex flex-col justify-center bg-blue-300 rounded-full border border-gray-500">
                    <div className="mx-2 ">
                        {label.firstName ? label.firstName[0].toUpperCase() : "G"}
                    </div>
                </div>
                <div className="flex flex-col justify-center mx-2">
                    {label.firstName || "guest"}
                </div>
            </div>
            <button  onClick = {()=>{
                localStorage.removeItem("token");
                navigate('/signin');
            }} className=" p-1 mx-3 border rounded border-slate-400 hover:bg-slate-500">Log out</button>
        </div>
    )
}