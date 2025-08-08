import { TextareaHTMLAttributes } from "react";
import './styles.css'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label? : string
}


export default function Textarea ({label, ...rest} : TextareaProps) {

    return (
        <div className="textarea-wrapper">
            <label htmlFor={label}>{label}</label>
            <textarea {...rest} />
        </div>
    )
}