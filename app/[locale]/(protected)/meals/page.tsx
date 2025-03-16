import { Metadata } from "next";
import { createTranslator } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import MealsCalendar from "./components/meals-calendar";
import { MealFormProvider } from "./meals-form-context";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const messages = await getMessages();
  const t = createTranslator({ locale, messages });

  return {
    title: t("MealPage.metaTitle"),
    description: t("MealPage.metaDescription"),
  }
}

const FoodCaloriesPage = () => {
  return (
    <div>
      <MealFormProvider>
        <MealsCalendar />
      </MealFormProvider>
    </div>
  );
}

export default FoodCaloriesPage;