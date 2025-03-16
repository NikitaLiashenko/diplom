import SectionHeading from "@/components/Helper/SectionHeading";
import appPreview1 from "@/public/images/app-preview.jpg";
import appPreview2 from "@/public/images/app-preview2.jpg";

import { CircleCheckBig } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const About = () => {
  const t = useTranslations("HomePage.About");

  const features = [
    t("features.first"),
    t("features.second"),
    t("features.third"),
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const images = [appPreview1, appPreview2];

  return (
    <div id="about" className="pt-16 pb-16 bg-blue-100">
      <SectionHeading>{t("title")}</SectionHeading>
      <div className="w-[80%] mx-auto flex flex-col lg:flex-row gap-8 items-center mt-20">
        {/* Text Content */}
        <div data-aos="fade-left" data-aos-anchor-placement="top-center" >
          <h3 className="text-bg text-xl sm:text-4xl font-bold">
            {t("subTitle")}
          </h3>
          <p className="mt-6 md:text-lg">
            {t("pText")}
          </p>
          <div className="mt-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2 mb-6">
                <CircleCheckBig className="" />
                <p className="text-sm sm:text-base md:text-lg font-bold text-black">
                  {feature}
                </p>
              </div>
            ))}
          </div>
        </div>
        {/* Image Slider */}
        <div
          data-aos="zoom-in"
          data-aos-anchor-placement="top-center"
          data-aos-delay="150"
          className="w-full max-w-xl"
        >
          <Slider {...sliderSettings}>
            {images.map((item, index) => (
              <div key={index} className="px-4 relative h-full w-full object-cover">
                <Image 
                  src={item.src} 
                  alt={`Slide ${index + 1}`} 
                  width={700}
                  height={300}
                  className="rounded-2xl"
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default About;
