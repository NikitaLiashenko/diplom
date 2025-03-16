import { currentUser } from "@/actions/auth";
import { getWeightRecordsBetween } from "@/actions/weight";
import WeightChart from "./weight-chart-client";

const WeightChartData = async () => {
    const weightRecords = await getWeightRecordsBetween({
        order: 'asc'
    });
    const user = await currentUser();

    return (
        <WeightChart
            user={user}
            chartData={weightRecords.map(record => {
                return {
                    weight: record.weight,
                    date: record.date,
                }
            })}
        />
    );
}

export default WeightChartData;