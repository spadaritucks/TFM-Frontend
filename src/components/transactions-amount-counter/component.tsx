import { ReactNode } from 'react'
import './styles.css'


interface TranscationTotal {
    counter: number
    Icon: ReactNode
    title: string
}




export function TransactionsAmountCounter({ counter, Icon, title }: TranscationTotal) {




    return (
        <div className='container'>
            <div className='header'>
                <span>{title}</span>
                {Icon}
            </div>

            <div className='counter'>
                <p>{counter.toLocaleString('pt-br', {
                    style: "currency",
                    currency: "BRL"
                })}</p>
            </div>

        </div>

    )
}