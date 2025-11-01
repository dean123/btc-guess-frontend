import { useState, useCallback } from "react";
import { api, UserProfile } from "../services/api";

export const useUserScore = () => {
  const [score, setScore] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshScore = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const profile: UserProfile = await api.getCurrentUser();
      setScore(profile.score);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch score");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    score,
    loading,
    error,
    refreshScore,
  };
};
