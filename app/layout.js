import "./globals.css";

export const metadata = {
  title: "Series Daily",
  description: "Daily TV challenges",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}