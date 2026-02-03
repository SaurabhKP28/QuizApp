"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode
} from "react";

/* ================= TYPES ================= */

interface PointsContextType {
  points: number;
  setPoints: React.Dispatch<React.SetStateAction<number>>;
}

/* ================= CONTEXT ================= */

const PointsContext = createContext<PointsContextType | undefined>(
  undefined
);

/* ================= PROVIDER ================= */

interface PointsProviderProps {
  children: ReactNode;
}

export const PointsProvider = ({
  children
}: PointsProviderProps) => {
  const [points, setPoints] = useState<number>(0);

  return (
    <PointsContext.Provider
      value={{ points, setPoints }}
    >
      {children}
    </PointsContext.Provider>
  );
};

/* ================= HOOK ================= */

export const usePoints = (): PointsContextType => {
  const context = useContext(PointsContext);

  if (!context) {
    throw new Error(
      "usePoints must be used within a PointsProvider"
    );
  }

  return context;
};
