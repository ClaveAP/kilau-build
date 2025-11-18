import { type ReactNode } from "react";

// Import semua provider yang lu punya
import { StatistikProvider } from "../contexts/StatistikContext";
import { TestimoniProvider } from "../contexts/TestimoniContext";
import { FAQProvider } from "../contexts/FAQContext";
import { KontakProvider } from "../contexts/KontakContext";
import { SurveyProvider } from "../contexts/SurveyKalenderContext";
import { MediaSosialProvider } from "../contexts/MediaSosialContext";
import { BerandaPortofolioProvider } from "../contexts/BerandaPortofolioContext";

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  return (
    <StatistikProvider>
      <TestimoniProvider>
        <FAQProvider>
          <KontakProvider>
            <SurveyProvider>
              <MediaSosialProvider>
                <BerandaPortofolioProvider>
                  {children}
                </BerandaPortofolioProvider>
              </MediaSosialProvider>
            </SurveyProvider>
          </KontakProvider>
        </FAQProvider>
      </TestimoniProvider>
    </StatistikProvider>
  );
};
