import React from "react";
import SectionHeading from '@/components/Helper/SectionHeading';
import TechnologyCard from './TechnologyCard';
import { useTechnologies } from '@/constans/constant';
import { useTranslations } from 'next-intl';

const Technology = () => {
  const t = useTranslations("HomePage.Technology")
  const technologiesList = useTechnologies(); 

  return (
    <div id="skills" className="pt-16 pb-16 bg-gradient-to-r from-[#003b8b] to-[#6aa9ff]">
      <SectionHeading>{t("title")}</SectionHeading>
      <div className="mt-20 w-[80%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 items-center">
        {technologiesList.map((technology) => {
          return (
            <div 
              key={technology.id}
              className="self-stretch"
            >
              <TechnologyCard technology={technology} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Technology;