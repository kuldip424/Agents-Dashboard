import type { Country, AvatarColor, FormState } from "@/types";



export const COUNTRIES: Country[] = [
  { code: "+91", flag: "🇮🇳", name: "India",         minDigits: 10, maxDigits: 10 },
  { code: "+1",  flag: "🇺🇸", name: "US / Canada",   minDigits: 10, maxDigits: 10 },
  { code: "+44", flag: "🇬🇧", name: "UK",             minDigits: 7,  maxDigits: 10 },
  { code: "+61", flag: "🇦🇺", name: "Australia",      minDigits: 9,  maxDigits: 9  },
  { code: "+49", flag: "🇩🇪", name: "Germany",        minDigits: 10, maxDigits: 11 },
  { code: "+33", flag: "🇫🇷", name: "France",         minDigits: 9,  maxDigits: 9  },
  { code: "+81", flag: "🇯🇵", name: "Japan",          minDigits: 10, maxDigits: 11 },
  { code: "+86", flag: "🇨🇳", name: "China",          minDigits: 11, maxDigits: 11 },
  { code: "+55", flag: "🇧🇷", name: "Brazil",         minDigits: 10, maxDigits: 11 },
  { code: "+971",flag: "🇦🇪", name: "UAE",            minDigits: 9,  maxDigits: 9  },
  { code: "+92", flag: "🇵🇰", name: "Pakistan",       minDigits: 10, maxDigits: 10 },
  { code: "+880",flag: "🇧🇩", name: "Bangladesh",     minDigits: 10, maxDigits: 10 },
  { code: "+7",  flag: "🇷🇺", name: "Russia",         minDigits: 10, maxDigits: 10 },
  { code: "+82", flag: "🇰🇷", name: "South Korea",    minDigits: 9,  maxDigits: 10 },
  { code: "+65", flag: "🇸🇬", name: "Singapore",      minDigits: 8,  maxDigits: 8  },
];

export const AVATAR_COLORS: AvatarColor[] = [
  { bg: "#dbeafe", text: "#1d4ed8" },
  { bg: "#dcfce7", text: "#15803d" },
  { bg: "#fce7f3", text: "#be185d" },
  { bg: "#fef3c7", text: "#b45309" },
  { bg: "#ede9fe", text: "#7c3aed" },
  { bg: "#ffedd5", text: "#c2410c" },
];



export const DEFAULT_FORM: FormState = {
  name:            "",
  email:           "",
  phone:           "",
  country:         "+91",
  role:            "Agent",
  username:        "",
  password:        "",
  confirmPassword: "",
  active:          true,
};
