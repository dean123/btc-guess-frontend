import React, { useState, useEffect } from "react";
import { api } from "../services/api";

interface ScoreDisplayProps {
  refreshTrigger?: number;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ refreshTrigger }) => {
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchScore = async () => {
    try {
      setLoading(true);
      setError(null);
      const user = await api.getCurrentUser();
      setScore(user.score);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch score");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScore();
  }, [refreshTrigger]);

  if (loading && score === null) {
    return null;
  }

  if (error) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 px-6 py-3 rounded-full shadow-lg">
      <div className="flex flex-col">
        <span className="text-xs font-medium uppercase tracking-wide opacity-90">
          Score: {score ?? 0}
        </span>
      </div>
    </div>
  );
};

export default ScoreDisplay;
