import { ButtonHTMLAttributes } from "react";
import './styles.css'

type ButtonVariants = "default" | "success" | "destructive" | "link"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    name? : string
    variant: ButtonVariants
}


export default function Button ({name, variant, ...rest} : ButtonProps ) {
    return <button className={variant} {...rest}>{name}</button>
}