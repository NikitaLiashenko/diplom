import { Card, CardContent } from "@/components/ui/card";
import DefaultLoader from "@/components/ui/loading/default-loader";
import { Suspense } from "react";
import CurrentWeight from "./components/current-weight";
import WeightChartData from "./components/weight-chart-data";

const WeightPage = () => {
    return (
        <Card>
            <CardContent className="flex flex-col gap-4">
                <Suspense fallback={<DefaultLoader />}>
                    <CurrentWeight />
                </Suspense>
            </CardContent>
            <Suspense fallback={<DefaultLoader />}>
                <WeightChartData />
            </Suspense>
        </Card>
    );
}

export default WeightPage;