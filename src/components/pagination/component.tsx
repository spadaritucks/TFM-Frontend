'use client'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import "./styles.css"

export interface PaginationProps {
    page: number;
    totalElements: number;
    size: number;
    onPageChange: (pageIndex: number) => Promise<void> | void
}

export function Pagination({page, totalElements, size, onPageChange} : PaginationProps) {

    const pages = Math.ceil(totalElements/ size) || 1

    return (
        <div className="pagination-content">
            <div className="pagination-items-count"><span>Total de {totalElements} item (s)</span></div>
            <div className="pagination-number-page">Pagina {page + 1} de {pages}</div>
            <div className="pagination-actions">
                <button className="pagination-button" onClick={() => onPageChange(0)} disabled={page === 0}>
                    <ChevronsLeft />
                </button>
                <button className="pagination-button" onClick={() => onPageChange(page -1)} disabled={page === 0}>
                    <ChevronLeft />
                </button>
                <button className="pagination-button" onClick={() => onPageChange(page + 1)} disabled={pages <= page + 1}>
                    <ChevronRight />
                </button>
                <button className="pagination-button"  onClick={() => onPageChange(pages - 1)} disabled={pages <= page + 1}>
                    <ChevronsRight />
                </button>
            </div>
        </div>
    )
}