'use client'
import { useModal } from "@/context/modal"
import { X } from "lucide-react"
import "./styles.css"

export default function Modal () {

    const { modalTitle, modalBody, modalOpen, hideModal} = useModal()

    
    if(!modalOpen){
        return null
    }


    return (
        <section className="modal-section">
            <div className="modal-overlay"></div>
            <div className="modal-content">
                <div className="modal-header">
                    <h3>{modalTitle}</h3>
                    <X onClick={hideModal} />
                </div>
                <div className="modal-body">
                    {modalBody}
                </div>
            </div>
        </section>
    )
}