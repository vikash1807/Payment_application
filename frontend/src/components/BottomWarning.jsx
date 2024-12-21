import { Link } from "react-router-dom"
export default function BottomWarning({label, buttontext, redirect}) {
    return (
        <div>
        <div className="pt-2">{label}</div>
        <Link className="underline" to={redirect}>{buttontext}</Link>
        </div>
    )
}