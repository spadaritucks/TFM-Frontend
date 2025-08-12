import { SelectHTMLAttributes } from "react";
import './styles.css'
import FormError from "../form-error/component";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label? : string
    errorMessage? : string
}


export default function Select ({label,errorMessage, ...rest} : SelectProps) {

    return (
        <div className="select-wrapper">
            <label htmlFor={label}>{label}</label>
            <select {...rest} />
            {errorMessage ? <FormError message={errorMessage} /> : null}
        </div>
    )
}