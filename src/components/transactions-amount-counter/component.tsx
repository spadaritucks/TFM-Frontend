import { LucideProps } from 'lucide-react'
import './styles.css'
import { TransactionResponseDTO } from '@/@types/DTOs/Transactions/TransactionResponseDTO'
import { ForwardRefExoticComponent, ReactNode } from 'react'

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