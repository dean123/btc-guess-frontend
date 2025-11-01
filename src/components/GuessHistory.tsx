import React, { useState, useEffect } from "react";
import { api, Guess } from "../services/api";

interface GuessHistoryProps {
  refreshTrigger?: number;
}

const GuessHistory: React.FC<GuessHistoryProps> = ({ refreshTrigger }) => {
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGuesses = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getUserGuesses();
      setGuesses(
        data.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch guesses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGuesses();
  }, [refreshTrigger]);

  const getStatusBadge = (isCorrect: boolean | null) => {
    if (isCorrect === null) {
      return (
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
          Pending
        </span>
      );
    }
    if (isCorrect) {
      return (
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
          ✓ Correct
        </span>
      );
    }
    return (
      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
        ✗ Wrong
      </span>
    );
  };

  const getDirectionBadge = (direction: "UP" | "DOWN") => {
    if (direction === "UP") {
      return (
        <span className="px-3 py-1 rounded text-xs font-semibold bg-green-600 text-white">
          UP
        </span>
      );
    }
    return (
      <span className="px-3 py-1 rounded text-xs font-semibold bg-red-600 text-white">
        DOWN
      </span>
    );
  };

  const renderContent = () => {
    if (loading) {
      return <div className="text-center text-gray-400">Loading...</div>;
    }

    if (error) {
      return (
        <div className="bg-red-500 text-white p-3 rounded-lg text-center">
          {error}
        </div>
      );
    }

    if (guesses.length === 0) {
      return <></>;
    }

    return (
      <>
        <div className="bg-gray-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase">
                    Time
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-300 uppercase">
                    Direction
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-300 uppercase">
                    Result
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {guesses.map((guess) => {
                  const date = new Date(guess.createdAt);
                  return (
                    <tr
                      key={guess.id}
                      className="hover:bg-gray-700/50 transition-colors"
                    >
                      <td className="px-4 py-3 text-sm text-gray-300">
                        {date.toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-300">
                        {date.toLocaleTimeString()}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {getDirectionBadge(guess.direction)}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {getStatusBadge(guess.isCorrect)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  };

  return <div className="max-w-4xl mx-auto p-5">{renderContent()}</div>;
};

export default GuessHistory;
