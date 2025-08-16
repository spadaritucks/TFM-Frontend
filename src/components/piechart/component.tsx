import { PieChart, PieChartProps } from "@mui/x-charts"
import './styles.css'

interface PieChartComponentProps extends PieChartProps  {
    title : string;
}

export default function PieChartComponent({title, ...rest} : PieChartComponentProps) {

    return (
        <div className="chart">
            <div className="chart-header">
                <span>{title}</span>
            </div>
            <PieChart {...rest}/>

        </div>
    )
}