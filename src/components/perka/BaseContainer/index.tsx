import { cn } from "lib/utils";
import React, { ReactNode } from "react";
import "./styles.css";
import ShineBorder from "components/ui/shine-border";

interface BaseContainerProps {
  children: ReactNode;
  className?: string;
}

const BaseContainer: React.FC<BaseContainerProps> = ({
  children,
  className,
}) => {
  return (
    <ShineBorder
      className={cn("InternalStyles md:shadow-xl", className)}
      color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
    >
      {children}
    </ShineBorder>
  );
};

export default BaseContainer;
