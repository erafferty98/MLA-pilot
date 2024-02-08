"use client";
import Footer from "../components/footer";
//import config from "@/lib/config";
import "./globals.css";
import { Providers } from "../components/providers";
import logo from "../img/CFG_logo.png";

/**
 * Default metadata.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata
 */
// export const metadata = {
//   // title: config.siteName,
//   // description: config.siteDescription,
// };

/**
 * The homepage root layout.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/layout
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <Providers>
          <div className="appTitle">
            <h1>MLA Fitness App</h1>
            <img src={logo} alt="CFG Fitness App Logo" id="appLogo" />
          </div>
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
