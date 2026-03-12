import React from "react";

export const metadata = {
  title: "TaskFlow Pro",
  description: "Production SaaS example"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "Arial, sans-serif", margin: 0, padding: 24 }}>
        {children}
      </body>
    </html>
  );
}