import React from "react";
import SectionHeading from "@/components/Helper/SectionHeading";
import PossibilityCard from "./PossibilityCard";
import { usePossibilities } from "@/constans/constant";
import { useTranslations } from "next-intl";

const Possibilities = () => {
  const t = useTranslations("HomePage.Possibilities");
  const possibilities = usePossibilities();

  return (
    <div id="possibilities" className="pt-16 pb-16 bg-gradient-to-r from-[#003b8b] to-[#6aa9ff]">
      <SectionHeading>{t("title")}</SectionHeading>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 w-[80%] mx-auto mt-20">
        {possibilities.map((possibility,i) => {
          return (
            <div
              key={possibility.id}
              data-aos="fade-left"
              data-aos-anchor-placement="top-center"
              data-aos-delay={`${i * 150}`}
            >
              <PossibilityCard possibility={possibility} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Possibilities;