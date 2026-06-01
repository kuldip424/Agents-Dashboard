// ─── Domain types ─────────────────────────────────────────────────────────────

export type Role   = "Agent" | "Manager";
export type Status = "Active" | "Inactive";

export interface Agent {
  id:       number;
  name:     string;
  username: string;
  email:    string;
  phone:    string;
  role:     Role;
  status:   Status;
}

// ─── Form types ───────────────────────────────────────────────────────────────

export interface FormState {
  name:            string;
  email:           string;
  phone:           string;
  country:         string;
  role:            Role;
  username:        string;
  password:        string;
  confirmPassword: string;
  active:          boolean;
}

export type FormErrors = Partial<Record<keyof FormState, string>>;

// ─── Utility types ────────────────────────────────────────────────────────────

export interface Country {
  code:      string;
  flag:      string;
  name:      string;
  minDigits: number;  // expected subscriber number digit count (min)
  maxDigits: number;  // expected subscriber number digit count (max)
}

export interface AvatarColor {
  bg:   string;
  text: string;
}

export type FilterRole = "All" | Role;

export interface Activity {
  id:        number;
  action:    "Added" | "Updated" | "Deleted";
  agentName: string;
  timestamp: string;
  details:   string;
}
