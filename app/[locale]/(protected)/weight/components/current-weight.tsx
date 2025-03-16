import { currentUser } from "@/actions/auth";
import { getEarliestWeightRecord, getLatestWeightRecord } from '@/actions/weight';
import CurrentWeightCLient from "./current-weight-client";

const CurrentWeight = async () => {
    const startWeight = await getEarliestWeightRecord();
    const latestWeight = await getLatestWeightRecord(new Date());
    const user = await currentUser();
    
    return (
        <CurrentWeightCLient startWeight={startWeight} latestWeight={latestWeight} user={user} />
    );
}

export default CurrentWeight;