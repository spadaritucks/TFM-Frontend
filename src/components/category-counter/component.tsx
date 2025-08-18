import { ReactNode } from 'react'
import './styles.css'

interface TransactionTotal {
    counter: number
    Icon: ReactNode
    title: string
}


export function CategoryCounter({ counter, Icon, title }: TransactionTotal) {
    return (
        <div className='category-container'>
            <div className='category-header'>
                <span>{title}</span>
                {Icon}
            </div>

            <div className='category-counter'>
                <p>{counter ? counter : 0}</p>
            </div>

        </div>

    )
}