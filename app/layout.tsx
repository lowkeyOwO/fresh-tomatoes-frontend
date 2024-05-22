import "@/styles/globals.css";
import ReactQueryProvider from "@/components/ReactQuery/ReactQueryProvider";



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryProvider>
      <html lang="en">
        <head>
        <link rel="icon" href="/Images/icon.png" />
        </head>
        <body>
          <main className="h-screen max-w-full p-0 m-0 bg-gray-900 flex flex-col place-items-center">
            {children}
          </main>
        </body>
      </html>
    </ReactQueryProvider>
  );
}
