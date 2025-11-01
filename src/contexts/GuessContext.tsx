import React, { createContext, useContext, useState, useCallback } from "react";
import { api, Guess } from "../services/api";

interface GuessContextType {
  guesses: Guess[];
  loading: boolean;
  error: string | null;
  refreshGuesses: () => Promise<void>;
  addOptimisticGuess: (guess: Guess) => void;
}

const GuessContext = createContext<GuessContextType | undefined>(undefined);

export const useGuesses = () => {
  const context = useContext(GuessContext);
  if (!context) {
    throw new Error("useGuesses must be used within a GuessProvider");
  }
  return context;
};

export const GuessProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshGuesses = useCallback(async () => {
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
  }, []);

  // Optimistically add a guess to the UI before the API confirms
  const addOptimisticGuess = useCallback((guess: Guess) => {
    setGuesses((prev) => [guess, ...prev]);
  }, []);

  const value: GuessContextType = {
    guesses,
    loading,
    error,
    refreshGuesses,
    addOptimisticGuess,
  };

  return (
    <GuessContext.Provider value={value}>{children}</GuessContext.Provider>
  );
};
