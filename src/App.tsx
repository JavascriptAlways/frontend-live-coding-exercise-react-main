import React, { useState, useEffect } from 'react';
import Question from './Question';
import Score from './Score';
import { questions } from './questions';
import { getScores, addScore } from './Storage';

const App: React.FC = () => {
  const [scores, setScores] = useState<Record<number, number>>({});
  const [overallScore, setOverallScore] = useState<number>(0);
  const [runs, setRuns] = useState<number>(0);
  const [averageScore, setAverageScore] = useState<number>(0);

  useEffect(() => {
    const fetchScores = async () => {
      const storedScores = await getScores();
      const totalScore = storedScores.reduce((sum, score) => sum + score, 0);
      const avgScore = storedScores.length > 0 ? totalScore / storedScores.length : 0;
      setRuns(storedScores.length);
      setAverageScore(avgScore);
    };

    fetchScores();
  }, []);

  const handleAnswer = (questionIndex: number, isYes: boolean): void => {
    setScores((prevScores) => {
      const newScores = { ...prevScores, [questionIndex]: isYes ? 1 : 0 };

      if (Object.keys(newScores).length === Object.keys(questions).length) {
        const numberOfYesAnswers = Object.values(newScores).reduce((sum, score) => sum + score, 0);
        const currentScore = (100 * numberOfYesAnswers) / Object.keys(questions).length;
        setOverallScore(currentScore);

        addScore(currentScore).then(() => {
          getScores().then((storedScores) => {
            const totalScore = storedScores.reduce((sum, score) => sum + score, 0);
            const avgScore = storedScores.length > 0 ? totalScore / storedScores.length : 0;
            setRuns(storedScores.length);
            setAverageScore(avgScore);
          });
        });

        return {};
      }

      return newScores;
    });
  };

  return (
    <div className="main__wrap">
      <main className="container">
        <h1>TO DO</h1>

        <Score
          overallScore={overallScore}
          runs={runs}
          averageScore={averageScore}
        />
        <div className="question-list">
          <ul>
            {Object.entries(questions).map(([key, question]) => (
              <li key={key}>
                <Question
                  question={question}
                  onAnswer={(isYes) => handleAnswer(Number(key), isYes)}
                />
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}

export default App;