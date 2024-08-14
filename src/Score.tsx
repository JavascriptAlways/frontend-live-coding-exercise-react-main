import React from 'react';

interface ScoreProps {
  overallScore: number;
  runs: number;
  averageScore: number;
}

const Score: React.FC<ScoreProps> = ({ overallScore, runs, averageScore }) => {
  return (
    <div>
      <h2>Score: {overallScore.toFixed(2)}</h2>
      <h2>Average Score: {averageScore.toFixed(2)}</h2>
    </div>
  );
}

export default Score;