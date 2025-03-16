"use client";

import React from "react";
import Tilt from "react-parallax-tilt";

type Props = {
  possibility: {
    id: number;
    title: string;
    description: string;
    icon: React.ElementType;
  }
};

const PossibilityCard = ({ possibility }: Props) => {
  const Icon = possibility.icon;
  return (
    <Tilt className="shadow-2xl p-6 rounded-lg bg-primary h-full">
      {possibility.icon && (
        <span className="text-primary-foreground">
          <Icon size={32} />
        </span>
      )}
      <h1 className="mt-4 text-2xl font-bold text-primary-foreground">{possibility.title}</h1>
      <p className="mt-3 text-lg text-primary-foreground text-opacity-80">
        {possibility.description}
      </p>
    </Tilt>
  );
};

export default PossibilityCard;
