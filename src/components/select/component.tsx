import { SelectHTMLAttributes } from "react";
import './styles.css'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label? : string
}


export default function Input ({label, ...rest} : SelectProps) {

    return (
        <div className="select-wrapper">
            <label htmlFor={label}>{label}</label>
            <select {...rest} />
        </div>
    )
}