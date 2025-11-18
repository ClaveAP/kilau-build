import React from 'react';

interface StatistikCardProps {
  title: string;
  value: string;
}

const StatistikCard: React.FC<StatistikCardProps> = ({ title, value }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-gray-600 text-sm mb-2">{title}</h3>
      <p className="text-3xl font-bold text-primary-blue">{value}</p>
    </div>
  );
};

export default StatistikCard;

