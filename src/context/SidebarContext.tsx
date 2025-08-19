'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface SidebarContextType {
    isOpen: boolean
    toggle: () => void
    close: () => void
    open: () => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

interface SidebarProviderProps {
    children: ReactNode
}

export function SidebarProvider({ children }: SidebarProviderProps) {
    const [isOpen, setIsOpen] = useState<boolean>(true)

    // Handle responsive behavior
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setIsOpen(false)
            } else {
                setIsOpen(true)
            }
        }

        // Set initial state
        handleResize()

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const toggle = () => setIsOpen(prev => !prev)
    const close = () => setIsOpen(false)
    const open = () => setIsOpen(true)

    return (
        <SidebarContext.Provider value={{ isOpen, toggle, close, open }}>
            {children}
        </SidebarContext.Provider>
    )
}

export function useSidebar() {
    const context = useContext(SidebarContext)
    if (context === undefined) {
        throw new Error('useSidebar must be used within a SidebarProvider')
    }
    return context
}
