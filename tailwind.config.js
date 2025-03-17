/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--color-background))",
        foreground: "hsl(var(--color-foreground))",
        foregroundMuted: "hsl(var(--color-foreground-muted))",
        muted: "hsl(var(--color-muted))",
        mutedForeground: "hsl(var(--color-muted-foreground  ))",
        primary: "hsl(var(--color-primary))",
        primaryForeground: "hsl(var(--color-primary-foreground))",
        secondary: "hsl(var(--color-secondary))",
        secondaryForeground: "hsl(var(--color-secondary-foreground))",
        success: "hsl(var(--color-success))",
        successForeground: "hsl(var(--color-success-foreground))",
        warning: "hsl(var(--color-warning))",
        warningForeground: "hsl(var(--color-warning-foreground))",
        error: "hsl(var(--color-error))",
        errorForeground: "hsl(var(--color-error-foreground))",
        border: "hsl(var(--color-border))",
        outline: "hsl(var(--color-outline))",
        ring: "hsl(var(--color-ring))",
        accent: "hsl(var(--color-accent))",
      },
    },
  },
  plugins: [],
};
