import ReduxProvider from "./Component/Redux/ReduxProvider";
import "./globals.css";


export const metadata = {
  title: "Ilmreel - Your way to learn",
  description: "Ilmreel is a platform for learning and teaching",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
