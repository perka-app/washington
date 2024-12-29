import React, { ReactNode } from "react";
import "./styles.css";

interface BoardProps {
  children: ReactNode;
  className?: string;
}

const Board: React.FC<BoardProps> = ({ children }) => {
  return <div className="InternalStyles">{children}</div>;
};

export default Board;
