import { Goal } from "@prisma/client";
import { Beef, Donut, Flame, LucideProps, Utensils, Weight, TrendingUp, TrendingDown, MoveRight } from "lucide-react";

export const icons: Record<string, React.FC<LucideProps>> = {
    calories: Flame,
    fats: Utensils,
    proteins: Beef,
    carbohydrates: Donut,
    weight: Weight,
};

export const goalIcons: Record<Goal, React.FC<LucideProps>> = {
    gain: TrendingUp,
    lose: TrendingDown,
    maintain: MoveRight,
};