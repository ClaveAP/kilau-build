import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

export interface BerandaPortofolioItem {
  id: number;
  title: string;
  image: string;
  category: "done" | "ongoing" | "interior";
}

interface BerandaPortofolioContextType {
  portofolioItems: BerandaPortofolioItem[];
  setPortofolioItems: React.Dispatch<
    React.SetStateAction<BerandaPortofolioItem[]>
  >;
}

const defaultPortofolioItems: BerandaPortofolioItem[] = [
  {
    id: 1,
    title: "Project Done",
    image: "/design.png",
    category: "done",
  },
  {
    id: 2,
    title: "Ongoing Project",
    image: "/bgadminlogin-new.jpg",
    category: "ongoing",
  },
  {
    id: 3,
    title: "Design Interior",
    image: "/housedesign.png",
    category: "interior",
  },
];

const BerandaPortofolioContext = createContext<
  BerandaPortofolioContextType | undefined
>(undefined);

export const BerandaPortofolioProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [portofolioItems, setPortofolioItems] = useState<
    BerandaPortofolioItem[]
  >(defaultPortofolioItems);

  return (
    <BerandaPortofolioContext.Provider
      value={{ portofolioItems, setPortofolioItems }}
    >
      {children}
    </BerandaPortofolioContext.Provider>
  );
};

export const useBerandaPortofolio = () => {
  const context = useContext(BerandaPortofolioContext);
  if (context === undefined) {
    throw new Error(
      "useBerandaPortofolio must be used within a BerandaPortofolioProvider"
    );
  }
  return context;
};
