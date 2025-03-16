import React from "react";
import Image from "next/image";
import hero from '@/public/images/hero.png';
import { useTranslations } from "next-intl";
import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const t = useTranslations("HomePage.Hero");

  return (
    <div
      id="home"
      className="bg-color w-full min-h-screen flex flex-col justify-center overflow-hidden relative"
    >
      <div className="flex justify-center pt-[70px] flex-col w-4/5 mx-auto">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12">
          {/* Text Content */}
          <div>
            {/* Title */}
            <h3 data-aos="fade-right" data-aos-delay="100" className="text-bg mb-10 text-xl sm:text-4xl font-bold md:leading-[3rem]
            xl:leading-[3.5rem] text-white">
              {t("title")}
            </h3>
            {/* Description */}
            <p data-aos="fade-left" data-aos-delay="200" className="mb-10 md:text-lg">
              {t("description")}
            </p>
            {/* Button */}
            <div className="text-center md:text-left mb-10 md:mb-0">
              <LoginButton>
                <Button
                  variant="default"
                  size="lg"
                  data-aos="zoom-in"
                  data-aos-delay="100"
                >
                  {t("button")}
                </Button>
              </LoginButton>
            </div>

          </div>
          {/* Image content */}
          <div
            data-aos="zoom-in"
            data-aos-delay="400"
            className="m-auto rounded-[3rem] overflow-x-hidden"
          >
            <Image
              src={hero}
              alt={"image"}
            />
          </div>
        </div>
      </div>
    </div>
  )
};

export default Hero;
