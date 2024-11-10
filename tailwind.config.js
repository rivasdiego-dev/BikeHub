/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        defaultTheme: {
          "primary": "#ff9900",
          "primary-content": "#160800",
          "secondary": "#1f1f1f",
          "secondary-content": "#cdcdcd",
          "accent": "#9ca3af",
          "accent-content": "#090a0b",
          "neutral": "#17221c",
          "neutral-content": "#cbcecc",
          "base-100": "#0A0A0A",
          "base-200": "#070707",
          "base-300": "#050505",
          "base-content": "#c7c7c7",
          "info": "#00d7ff",
          "info-content": "#001116",
          "success": "#10b981",
          "success-content": "#000d06",
          "warning": "#fde047",
          "warning-content": "#161202",
          "error": "#fb7185",
          "error-content": "#150406",
        },
      },
    ],
  },
  plugins: [
    require('daisyui'),
  ],
}

