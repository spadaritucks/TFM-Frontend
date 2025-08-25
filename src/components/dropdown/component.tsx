import React, { useState } from 'react';
import './styles.css'
import { ArrowDown } from 'lucide-react';
import Image from 'next/image';

interface DropdownProps {

    itens: { label: string, onClick: () => void }[]
    name: string
    actionsName?: string
    image?: string
}

export default function Dropdown({ itens, name, image, actionsName }: DropdownProps) {

    const [open, setOpen] = useState<boolean>(false)


    return (
        <div className='root'>

            <div className='trigger' onClick={() => setOpen(!open)}>
                {image ? <Image width={40} height={40} src={image} className='avatar' alt='' /> : null}
                <p>{name}</p>
                <ArrowDown color='#1f83a7' width={20} height={20} />
            </div>

            <div className={`content ${open ? "open" : ""}`}>
                {actionsName && <div className='dropdown-header'>
                    <p>{actionsName}</p>
                </div>}
                <div className='items'>
                    {itens.map((item, index) => (<div className='item' key={index} onClick={item.onClick}>{item.label}</div>))}
                </div>
            </div>

        </div>
    );
}