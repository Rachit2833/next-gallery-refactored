import { AppThemeProvider } from "./_app";
import { UserProvider } from "./_lib/context";
import "./global.css";

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        {/* Fonts */}
        {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Knewave&display=swap"
          rel="stylesheet"
        /> */}

        {/* ✅ DARK MODE PRELOAD (THIS IS THE FIX) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  const isDark = localStorage.getItem("dark") === "true";
                  if (isDark) {
                    document.documentElement.classList.add("dark");
                  }
                } catch (_) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <AppThemeProvider>
          {children}
        </AppThemeProvider>
      </body>
    </html>
  );
}
