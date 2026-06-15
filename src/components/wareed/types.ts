export type Donation = {
  id: string;
  center: string;
  date: string; // display date
  volume: string;
  status: "Verified" | "Completed" | "Pending";
};

export type User = {
  name: string;
  email: string;
  phone: string;
  wilaya: string;
  bloodType: string;
  donations: number;
  points: number;
  history: Donation[];
  ineligibleOverride?: boolean;
};

export const WILAYAS = ["Algiers", "Constantine", "Oran", "Annaba", "Blida", "Setif"];
export const BLOOD_TYPES = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
export const CTS_CENTERS = [
  "CTS CHU Mustapha Pacha (Algiers)",
  "CTS CHU Ben Badis (Constantine)",
  "CTS CHU Oran (CHUO)",
  "Centre de Transfusion Sanguine - Tipaza",
  "CTS CHU Bab El Oued (Algiers)",
];

export type TabKey =
  | "dashboard"
  | "eligibility"
  | "appointment"
  | "health"
  | "rewards"
  | "integration";