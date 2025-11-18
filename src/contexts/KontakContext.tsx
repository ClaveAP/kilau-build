import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

export interface KontakItem {
  id: number;
  type: "lokasi" | "kontak" | "email";
  value: string;
  alamat?: string;
  latitude?: number;
  longitude?: number;
  mapsUrl?: string;
}

interface KontakContextType {
  kontakData: KontakItem[];
  setKontakData: React.Dispatch<React.SetStateAction<KontakItem[]>>;
}

const KontakContext = createContext<KontakContextType | undefined>(undefined);

export const KontakProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [kontakData, setKontakData] = useState<KontakItem[]>([
    {
      id: 1,
      type: "lokasi",
      value:
        "Jl. Raya Citayam No.34, RT./Rw.RW.001/004, Pd. Jaya, Kec. Cipayung, Kota Depok, Jawa Barat 16444",
      alamat:
        "Jl. Raya Citayam No.34, RT./Rw.RW.001/004, Pd. Jaya, Kec. Cipayung, Kota Depok, Jawa Barat 16444",
      latitude: -6.4025,
      longitude: 106.7942,
      mapsUrl: "https://www.google.com/maps?q=-6.4025,106.7942",
    },
    { id: 2, type: "kontak", value: "+62 877-7636-0795" },
    { id: 3, type: "email", value: "kilaubuild@gmail.com" },
  ]);

  return (
    <KontakContext.Provider value={{ kontakData, setKontakData }}>
      {children}
    </KontakContext.Provider>
  );
};

export const useKontak = () => {
  const context = useContext(KontakContext);
  if (context === undefined) {
    throw new Error("useKontak must be used within a KontakProvider");
  }
  return context;
};
