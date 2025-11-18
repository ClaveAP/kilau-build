import React from 'react';

interface CardStatistikProps {
  title: string;
  value: string;
  icon?: React.ReactNode;
}

const CardStatistik: React.FC<CardStatistikProps> = ({ title, value, icon }) => {
  return (
    <div className="card-statistik">
      {icon && <div className="card-statistik-icon">{icon}</div>}
      <div className="card-statistik-content">
        <h3>{title}</h3>
        <p>{value}</p>
      </div>
    </div>
  );
};

export default CardStatistik;

