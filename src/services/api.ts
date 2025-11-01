const API_BASE_URL = "http://localhost:3000";

export interface BTCPrice {
  id: string;
  price: number;
  timestamp: string;
}

export interface GuessResponse {
  success: boolean;
  message: string;
  result?: "win" | "lose";
  correctPrice?: number;
}

export const api = {
  getBTCPrice: async (): Promise<BTCPrice> => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/price-snapshots/latest`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch BTC price");
    }

    return response.json();
  },

  submitGuess: async (
    direction: "UP" | "DOWN",
    priceSnapshotId: string
  ): Promise<GuessResponse> => {
    const token = localStorage.getItem("token");
    console.log(token);
    const response = await fetch(`${API_BASE_URL}/guesses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify({ direction, priceSnapshotId }),
    });

    if (!response.ok) {
      throw new Error("Failed to submit guess");
    }

    return response.json();
  },
};
