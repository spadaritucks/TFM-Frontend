import { InputHTMLAttributes } from "react";
import './styles.css'
import FormError from "../form-error/component";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label? : string
    errorMessage? : string
}


export default function Input ({label, errorMessage, ...rest} : InputProps) {

    return (
        <div className="input-wrapper">
            <label htmlFor={label}>{label}</label>
            <input {...rest} />
            {errorMessage ? <FormError message={errorMessage} /> : null}
        </div>
    )
}