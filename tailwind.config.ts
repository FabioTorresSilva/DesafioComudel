import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
      whiteBlueBackground: "#BFF0FD",
        whiteBlueBorder: "#90E5FC",
        
      },
    },
  },
  plugins: [],
};
export default config;
