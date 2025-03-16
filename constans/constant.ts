"use client";

import { useTranslations } from "next-intl";
import reactSvg from "@/public/images/react.svg";
import cssSvg from "@/public/images/css.svg";
import jsSvg from "@/public/images/js.svg";
import tsSvg from "@/public/images/ts.svg";
import htmlSvg from "@/public/images/html.svg";
import nodeSvg from "@/public/images/node.svg";
import nextjSvg from "@/public/images/nextjs.svg";
import tailwindSvg from "@/public/images/tailwind.svg";
import { Beef, Calendar, ChartNoAxesColumn, Target } from "lucide-react";

export const useNavLinks = () => {
  const t = useTranslations("HomePage.NavLinks");

  return [
    { id: 1, url: "home", label: t("home") },
    { id: 2, url: "about", label: t("about") },
    { id: 3, url: "possibilities", label: t("possibilities") },
    { id: 4, url: "skills", label: t("skills") },
  ];
};

export const usePossibilities = () => {
  const t = useTranslations("HomePage.PossibilitiesList");

  return [
    { id: 1, title: t("title_id1"), description: t("description_id1"), icon: ChartNoAxesColumn },
    { id: 2, title: t("title_id2"), description: t("description_id2"), icon: Calendar },
    { id: 3, title: t("title_id3"), description: t("description_id3"), icon: Beef },
    { id: 4, title: t("title_id4"), description: t("description_id4"), icon: Target }
  ]
}

export const useTechnologies = () => {
  const t = useTranslations("HomePage.TechnologiesList");

  return [
    { id: 1, title: t("nextjs"), image: nextjSvg },
    { id: 2, title: t("node"), image: nodeSvg },
    { id: 3, title: t("react"), image: reactSvg },
    { id: 4, title: t("tailwind"), image: tailwindSvg },
    { id: 5, title: t("css"), image: cssSvg },
    { id: 6, title: t("js"), image: jsSvg },
    { id: 7, title: t("ts"), image: tsSvg },
    { id: 8, title: t("html"), image: htmlSvg },
  ]
}