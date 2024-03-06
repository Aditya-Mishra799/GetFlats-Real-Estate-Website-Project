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
      <head>
        <meta
          name="google-site-verification"
          content="dgms-iT1EFL706tiJ3A0GneU_SZp8n_wvh1dJzZ1waI"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
          integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
          crossorigin=""
        />
      </head>
      <body className="flex flex-col p-0 m-0 ">
        <Provider>
          <Header />
          <div className="mt-16 p-1">{children}</div>
        </Provider>
      </body>
    </html>
  );
}
