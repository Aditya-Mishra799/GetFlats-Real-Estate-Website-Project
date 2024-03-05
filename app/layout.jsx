import "../styles/globals.css";
import Header from "@/components/home_layout/Header";
import Provider from "@/components/Provider";
export const metadata = {
  title: "Get Flats",
  description: "This website helps you to find your dream with 0 brokerage.",
};

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col p-0 m-0 ">
        <Provider>
          <Header />
          <div className="mt-16 p-1">{children}</div>
        </Provider>
      </body>
    </html>
  );
}
