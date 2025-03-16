import { Card } from "@/components/ui/card";

interface MealStatsProps {
    icon: React.ElementType;
    value: string | number;
    color: string;
}

const MealStats = ({ icon: Icon, value, color }: MealStatsProps) => {
    return (
        <Card className="flex flex-col justify-center items-center py-1 sm:py-2 px-2 sm:px-4 text-sm sm:text-base" >
            <span style={{ color: color }}><Icon /></span> <span className="text-nowrap">{value}</span>
        </Card>
    );
}

export default MealStats;