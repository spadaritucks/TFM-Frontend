
interface SeparatorProps {
    width: string
    height : string
    color : string
}

export default function Separator ({width, height, color} : SeparatorProps) {
    
    return <div style={{width : width, height : height, backgroundColor : color }}></div>
}