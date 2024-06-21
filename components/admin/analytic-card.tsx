import { CardContent, CardHeader, CardTitle } from "../ui/card";

export default function AnalyticCard({ title, icon, value, percentage }: { title?: string, icon?: JSX.Element, value?: string, percentage?: string }) {
    return (
        <div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    {title ? title : ''}
                </CardTitle>
                {icon ? icon : ''}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value ? value : ''}</div>
                <p className="text-xs text-muted-foreground">
                    {percentage ? percentage : ''} from last month
                </p>
            </CardContent>
        </div>
    )
}