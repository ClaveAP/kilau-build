import React from "react";

interface TestimoniCardProps {
  name: string;
  testimoni: string;
  rating: number;
}

const TestimoniCard: React.FC<TestimoniCardProps> = ({
  name,
  testimoni,
  rating,
}) => {
  return (
    <div
      className="bg-white rounded-lg p-4 h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
      style={{
        border: "2px solid #e5e7eb",
        boxShadow:
          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      }}
    >
      <div
        className="flex items-center gap-2 mb-3 pb-2"
        style={{ borderBottom: "1px solid #f3f4f6" }}
      >
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm bg-primary-blue">
          {name.charAt(0).toUpperCase()}
        </div>
        <h3 className="font-semibold text-gray-800 text-sm">{name}</h3>
      </div>
      <p className="text-xs text-gray-600 mb-3 grow line-clamp-3 leading-relaxed">
        {testimoni}
      </p>
      <div className="flex gap-0.5 mt-auto">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={
              star <= rating
                ? "text-yellow-400 text-sm"
                : "text-gray-300 text-sm"
            }
          >
            ★
          </span>
        ))}
      </div>
    </div>
  );
};

export default TestimoniCard;
