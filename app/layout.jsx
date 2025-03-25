import "../styles/globals.css";
import Header from "@/components/home_layout/Header";
import Provider from "@/components/Provider";
import SnackBarProvider from "@components/SnackBar/SnackBarProvider";
import ChatBotFAB from "@components/home_layout/ChatBotFAB";
import Footer from "@components/home_layout/Footer";
export const metadata = {
  title: "Get Flats",
  description: "This website helps you to find your dream with 0 brokerage.",
  icons : "/favicon.png"
};

export default function Layout({ children }) {
  'use client'
   
  return (
    <html lang="en">
      <body className="flex flex-col p-0 m-0 relative ">
        <Provider>
          <SnackBarProvider>
            <Header />
            <div className="mt-16 p-1">{children}</div>
            <Footer />
            <ChatBotFAB  />
          </SnackBarProvider>
        </Provider>
      </body>
    </html>
  );
}
