import {
  ColorSchemeScript,
  mantineHtmlProps,
  MantineProvider,
} from "@mantine/core";
import "@mantine/core/styles.css";
import { theme } from "../theme";
import "./global.css";
import HomePageHeader from "./components/HomePageHeader";

export const metadata = {
  title: "Nice",
  description: "Nice",
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="light">
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <HomePageHeader />
            {children}
          </div>
        </MantineProvider>
      </body>
    </html>
  );
}
