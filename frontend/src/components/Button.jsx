export default function Button({label, onClick}) {
    return (
        <button onClick={onClick} className="w-full border rounded border-black py-1 text-white font-medium bg-gray-500 hover:bg-gray-700 px-1">{label}</button>
    )
}