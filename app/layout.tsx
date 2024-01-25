import "@/styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className="h-screen max-w-full justify-center content-center bg-gray-900 flex">{children}</main>
      </body>
    </html>
  );
}
