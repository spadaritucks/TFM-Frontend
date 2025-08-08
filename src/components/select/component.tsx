import { SelectHTMLAttributes } from "react";
import './styles.css'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label? : string
}


export default function Select ({label, ...rest} : SelectProps) {

    return (
        <div className="select-wrapper">
            <label htmlFor={label}>{label}</label>
            <select {...rest} />
        </div>
    )
}