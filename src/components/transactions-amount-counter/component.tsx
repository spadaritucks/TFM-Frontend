import { ReactNode } from 'react'
import './styles.css'

interface TransactionTotal {
    counter: number
    Icon: ReactNode
    title: string
}

export function TransactionsAmountCounter({ counter, Icon, title }: TransactionTotal) {

    return (
        <div className='container'>
            <div className='header'>
                <span>{title}</span>
                {Icon}
            </div>

            <div className='counter'>
                <p>{ counter ? counter.toLocaleString('pt-br', {
                    style: "currency",
                    currency: "BRL"
                }): 0}</p>
            </div>

        </div>

    )
}