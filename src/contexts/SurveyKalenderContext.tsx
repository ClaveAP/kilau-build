import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

export interface Survey {
  id: number;
  name: string;
  date: string; // ISO format
  phone: string;
}

interface SurveyContextType {
  surveys: Survey[];
  setSurveys: React.Dispatch<React.SetStateAction<Survey[]>>;
}

const defaultSurveys: Survey[] = [
  { id: 1, name: "Sherin", date: "2025-11-12T15:00", phone: "085813481751" },
  { id: 2, name: "Andra", date: "2025-11-13T10:00", phone: "085812345678" },
  { id: 3, name: "Budi", date: "2025-11-14T10:00", phone: "085876543210" },
];

const SurveyContext = createContext<SurveyContextType | undefined>(undefined);

export const SurveyProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [surveys, setSurveys] = useState<Survey[]>(defaultSurveys);

  return (
    <SurveyContext.Provider value={{ surveys, setSurveys }}>
      {children}
    </SurveyContext.Provider>
  );
};

export const useSurvey = () => {
  const context = useContext(SurveyContext);
  if (!context) {
    throw new Error("useSurvey must be used within a SurveyProvider");
  }
  return context;
};
