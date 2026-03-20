import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#11212d",
        mist: "#ccd6dc",
        ember: "#f26b38",
        sand: "#f3efe7",
        sage: "#5f7a61"
      },
      boxShadow: {
        card: "0 18px 40px rgba(17, 33, 45, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
