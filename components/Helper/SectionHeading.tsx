import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const SectionHeading = ({ children }: Props) => {
  return (
    <h2 className="bg-primary text-primary-foreground w-fit text-center px-4 py-3 mx-auto text-2xl sm:text-3xl md:text-4xl uppercase -rotate-6">
      {children}
    </h2>
  );
};

export default SectionHeading;