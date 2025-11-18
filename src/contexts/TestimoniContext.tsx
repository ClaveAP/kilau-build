import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

export interface TestimoniData {
  id: number;
  name: string;
  text: string;
  rating: number;
}

// Re-export as type for better compatibility
export type { TestimoniData as TestimoniDataType };

interface TestimoniContextType {
  testimonials: TestimoniData[];
  setTestimonials: React.Dispatch<React.SetStateAction<TestimoniData[]>>;
}

const TestimoniContext = createContext<TestimoniContextType | undefined>(
  undefined
);

export const TestimoniProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [testimonials, setTestimonials] = useState<TestimoniData[]>([
    {
      id: 1,
      name: "Vian",
      text: "Sangat memuaskan. Tim komunikatif, pengerjaan rapi, dan tepat waktu.",
      rating: 5,
    },
    {
      id: 2,
      name: "Alina Humaira",
      text: "Amanah dan terpercaya. Sukses terus Kilau Build.",
      rating: 3,
    },
    {
      id: 3,
      name: "Tiara Ary",
      text: "Kualitas sangat baik dan profesional.",
      rating: 5,
    },
    {
      id: 4,
      name: "Lidya Shanaya",
      text: "Pekerjaannya berkualitas. Terimakasih Kilau Build.",
      rating: 5,
    },
  ]);

  return (
    <TestimoniContext.Provider value={{ testimonials, setTestimonials }}>
      {children}
    </TestimoniContext.Provider>
  );
};

export const useTestimoni = () => {
  const context = useContext(TestimoniContext);
  if (context === undefined) {
    throw new Error("useTestimoni must be used within a TestimoniProvider");
  }
  return context;
};

// Explicit type export for better module resolution
