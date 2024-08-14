
export const getScores = async (): Promise<number[]> => {
    const scores = localStorage.getItem('scores');
    return scores ? JSON.parse(scores) : [];
};

export const addScore = async (score: number): Promise<void> => {
    const scores = await getScores();
    scores.push(score);
    localStorage.setItem('scores', JSON.stringify(scores));
};