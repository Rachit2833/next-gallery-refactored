import { UserProvider } from "./_lib/context";
import "./global.css";

export default function RootLayout({ children }) {
  return (
 <html lang="en" className="">
      <head className="">
        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Knewave&display=swap" rel="stylesheet" />

        {/* Preload theme script (runs before hydration) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem("theme") || "default";
                  const isDark = localStorage.getItem("isDark") === "true";
                  const themes = ${JSON.stringify(require("./_lib/themes").themes)};
                  const themeClasses = themes[theme]?.lightClass || themes["default"].lightClass;
                  document.documentElement.className = themeClasses + (isDark ? " dark" : "");
                } catch(e) {
                  console.error(e);
                }
              })();
            `,
          }}
        />
      </head>
      <body>
        <UserProvider>
{children}
        </UserProvider>
      </body>
    </html>
  );
}
