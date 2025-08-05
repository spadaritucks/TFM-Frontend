import { InputHTMLAttributes } from "react";
import './styles.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label? : string
}


export default function Input ({label, ...rest} : InputProps) {

    return (
        <div className="input-wrapper">
            <label htmlFor={label}>{label}</label>
            <input {...rest} />
        </div>
    )
}