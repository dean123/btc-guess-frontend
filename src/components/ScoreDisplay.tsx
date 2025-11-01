import React, { useEffect } from "react";
import { useUserScore } from "../hooks/useUserScore";

const ScoreDisplay: React.FC = () => {
  const { score, loading, error, refreshScore } = useUserScore();

  useEffect(() => {
    refreshScore();
  }, [refreshScore]);

  if (loading && score === 0) {
    return null;
  }

  if (error) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-2 bg-linear-to-r from-yellow-400 to-yellow-600 text-gray-900 px-6 py-3 rounded-full shadow-lg">
      <div className="flex flex-col">
        <span className="text-xs font-medium uppercase tracking-wide opacity-90">
          Score: {score}
        </span>
      </div>
    </div>
  );
};

export default ScoreDisplay;
