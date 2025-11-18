import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

interface StatistikItem {
  id: number;
  label: string;
  value: string;
}

interface StatistikContextType {
  statistikData: StatistikItem[];
  setStatistikData: React.Dispatch<React.SetStateAction<StatistikItem[]>>;
}

const StatistikContext = createContext<StatistikContextType | undefined>(
  undefined
);

export const StatistikProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [statistikData, setStatistikData] = useState<StatistikItem[]>([
    { id: 1, label: "Tahun Pengalaman", value: "23" },
    { id: 2, label: "Proyek Selesai", value: "470" },
    { id: 3, label: "Klien Puas", value: "5" },
    { id: 4, label: "Kota", value: "75" },
  ]);

  return (
    <StatistikContext.Provider value={{ statistikData, setStatistikData }}>
      {children}
    </StatistikContext.Provider>
  );
};

export const useStatistik = () => {
  const context = useContext(StatistikContext);
  if (context === undefined) {
    throw new Error("useStatistik must be used within a StatistikProvider");
  }
  return context;
};

export type { StatistikItem };
