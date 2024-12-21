export default function InputBoxNumber({label, placeholder, onChange}) {
    return (
        <div className="py-2">
            <div className="text-left font-medium text-slate-700 pb-1">{label}</div>
            <input onChange={onChange} type="Number" className="w-full px-1 py-1 border rounded border-slate-300" placeholder={placeholder}/>
        </div>
    )
}