import {
    CreditCard,
    DollarSign,
    BoxIcon,
    TagIcon
} from "lucide-react"
import { CardContent, CardHeader, CardTitle } from "../ui/card";

function typeIcons(type : string) {
    switch (type) {
        case "revenue": return <DollarSign className="h-4 w-4 text-muted-foreground" />
        case "productsSold": return <BoxIcon className="h-4 w-4 text-muted-foreground" />
        case "sales": return  <CreditCard className="h-4 w-4 text-muted-foreground" />
        case "offers": return  <TagIcon className="h-4 w-4 text-muted-foreground" />
    }
}

export default function AnalyticCard({ title, type, value, percentage }: { title?: string, type?: string, value?: string, percentage?: string }) {
    const icon = typeIcons(type ? type : '');

    return (
        <div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    {title ? title : ''}
                </CardTitle>
                {icon}
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