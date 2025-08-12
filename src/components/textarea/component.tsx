import { TextareaHTMLAttributes } from "react";
import './styles.css'
import FormError from "../form-error/component";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label? : string
    errorMessage? : string
}


export default function Textarea ({label,errorMessage, ...rest} : TextareaProps) {

    return (
        <div className="textarea-wrapper">
            <label htmlFor={label}>{label}</label>
            <textarea {...rest} />
            {errorMessage ? <FormError message={errorMessage} /> : null}
        </div>
    )
}