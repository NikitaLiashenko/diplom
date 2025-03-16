"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useNavLinks } from "@/constans/constant";
import { Link, usePathname } from "@/i18n/routing";
import logo from "@/public/images/logo.png";
import { Languages } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";
import { HiBars3BottomRight } from "react-icons/hi2";

type Props = {
  openNav: () => void;
};

const Nav = ({ openNav }: Props) => {
  const pathname = usePathname();
  const t = useTranslations("HomePage.Nav");
  const navLinks = useNavLinks();
  const [navBg, setNavBg] = useState(false);

  useEffect(() => {
    const handler = () => setNavBg(window.scrollY >= 90);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleScroll = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      const yOffset = -120;
      const y = section.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  if (pathname !== "/en" && pathname !== "/") return null;

  return (
    <div
      className={`fixed ${navBg ? "bg-blue-200" : "bg-transparent"} h-[70px] z-10 w-full transition-all duration-300`}
    >
      <div className="flex items-center h-full justify-between w-[85%] sm:w-[90%] xl:w-[80%] mx-auto">
        {/* LOGO */}
        <div className="flex h-full w-auto items-center">
          <Image src={logo} alt="LOGO" className="ml-[-1.5rem] h-full w-auto sm:ml-0 mix-blend-multiply p-2 transition-all rounded-full object-contain" />
          <span className=" text-lg">{t("logoTitle")}</span>
        </div>

        {/* Nav Links */}
        <div className="flex items-center space-x-10">
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((navlink) => (
              <button key={navlink.id} onClick={() => handleScroll(navlink.url)} className="nav__link text-blue-500">
                {navlink.label}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {/* Language Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none">
                <Languages className="h-6 w-6 cursor-pointer text-blue-500" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <Link href={pathname} locale="en">
                  <DropdownMenuItem>{t("en")}</DropdownMenuItem>
                </Link>
                <Link href={pathname} locale="uk">
                  <DropdownMenuItem>{t("uk")}</DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Burger */}
            <HiBars3BottomRight onClick={openNav} className="w-8 h-8 cursor-pointer text-blue-500 lg:hidden" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
