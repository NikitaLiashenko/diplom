"use client";

import React from "react";
import Image from "next/image";

type Props = {
  technology: {
    id: number;
    title: string;
    image: string;
  }
}

const TechnologyCard = ({ technology }: Props) => {
  const { image, title } = technology;

  return (
    <div className="p-6 hover:bg-blue-900 duration-300 transition-all cursor-pointer text-center rounded-lg bg-gray-900 h-full flex flex-col justify-center items-center">
      <Image
        src={image}
        alt={title}
        width={80}
        height={80}
        className="object-cover mx-auto"
      />
      <h1 className="text-[18px] mt-4 text-white font-[600]">{title}</h1>
    </div>
  );
};

export default TechnologyCard;