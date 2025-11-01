import React, { useState, useEffect } from "react";
import { api, BTCPrice } from "../services/api";
import GuessHistory from "./GuessHistory";
import ScoreDisplay from "./ScoreDisplay";
import { useGuesses } from "../contexts/GuessContext";
import { useUserScore } from "../hooks/useUserScore";

// Backend needs time to fetch and store the new BTC price
// We wait this many seconds after the minute mark before fetching
const BACKEND_PROCESSING_DELAY_SECONDS = 4;

const Guess: React.FC = () => {
  const [btcPrice, setBtcPrice] = useState<BTCPrice | null>(null);
  const [loading, setLoading] = useState(true);
  const [guessing, setGuessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number>(0);
  const [hasGuessedForCurrentSnapshot, setHasGuessedForCurrentSnapshot] =
    useState(false);

  const { refreshGuesses } = useGuesses();
  const { refreshScore } = useUserScore();

  const fetchPrice = async () => {
    try {
      setLoading(true);
      setError(null);
      const price = await api.getBTCPrice();
      setBtcPrice(price);
      // Reset the guess flag when a new price snapshot is fetched
      setHasGuessedForCurrentSnapshot(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch price");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrice();
  }, []);

  useEffect(() => {
    if (!btcPrice) return;

    const updateCountdown = () => {
      // Count down from the price snapshot timestamp to the next minute
      const priceTime = new Date(btcPrice.timestamp).getTime();
      const nextPriceTime =
        priceTime + 60000 + BACKEND_PROCESSING_DELAY_SECONDS * 1000;
      const now = Date.now();
      const remaining = Math.max(0, Math.ceil((nextPriceTime - now) / 1000));
      setCountdown(remaining);
    };

    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);

    return () => clearInterval(countdownInterval);
  }, [btcPrice]);

  useEffect(() => {
    if (countdown <= 0) {
      fetchPrice();
      // Refresh guesses and score when new price comes in
      refreshGuesses();
      refreshScore();
    }
  }, [countdown, refreshGuesses, refreshScore]);

  const handleGuess = async (direction: "UP" | "DOWN") => {
    if (!btcPrice || hasGuessedForCurrentSnapshot) {
      return;
    }

    try {
      setGuessing(true);
      setError(null);

      await api.submitGuess(direction, btcPrice.id);

      // Mark that a guess has been placed for this snapshot
      setHasGuessedForCurrentSnapshot(true);

      // Refresh the guess list and score after submitting
      refreshGuesses();
      refreshScore();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit guess");
    } finally {
      setGuessing(false);
    }
  };

  if (loading && !btcPrice) {
    return (
      <div className="text-center p-5">
        <p>Loading BTC price...</p>
      </div>
    );
  }

  // leaving 5 seconds of buffer in the beginning and end so that the UI changes are less confusing
  const disableActions =
    guessing ||
    loading ||
    countdown < 5 ||
    countdown > 55 ||
    hasGuessedForCurrentSnapshot;
  return (
    <>
      <div className="max-w-2xl mx-auto p-5 text-center">
        <div className="mb-6 flex justify-center">
          <ScoreDisplay />
        </div>

        {error && (
          <div className="bg-red-500 text-white p-3 rounded-lg mb-5">
            {error}
          </div>
        )}

        {btcPrice && (
          <div className="bg-gray-800 p-8 rounded-xl mb-5">
            <h3 className="text-cyan-400 text-xl mb-3">Current BTC Price</h3>
            <div className="text-5xl font-bold text-white mb-3">
              $
              {btcPrice.price.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
            <div className="text-xs text-gray-400 mb-4">
              Last updated: {new Date(btcPrice.timestamp).toLocaleTimeString()}
            </div>

            <div
              className={`text-2xl font-bold p-3 rounded-lg ${
                countdown <= 10
                  ? "text-red-400 bg-red-400/10"
                  : "text-cyan-400 bg-cyan-400/10"
              }`}
            >
              ⏱️ Next price in: {countdown}s
            </div>
          </div>
        )}

        <div className="mb-5">
          <div className="flex gap-5 justify-center">
            <button
              onClick={() => handleGuess("UP")}
              disabled={disableActions}
              className={`px-8 py-4 text-lg font-bold bg-green-600 text-white border-none rounded-lg transition-all duration-300 ${
                disableActions
                  ? "opacity-60 cursor-not-allowed"
                  : "hover:bg-green-700 cursor-pointer"
              }`}
            >
              UP
            </button>

            <button
              onClick={() => handleGuess("DOWN")}
              disabled={disableActions}
              className={`px-8 py-4 text-lg font-bold bg-red-600 text-white border-none rounded-lg transition-all duration-300 ${
                disableActions
                  ? "opacity-60 cursor-not-allowed"
                  : "hover:bg-red-700 cursor-pointer"
              }`}
            >
              DOWN
            </button>
          </div>
        </div>
      </div>

      <GuessHistory />
    </>
  );
};

export default Guess;
