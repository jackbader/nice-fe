import {
  ColorSchemeScript,
  mantineHtmlProps,
  MantineProvider,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { theme } from "../theme";
import "./global.css";
import Header from "./components/Header";
import { AuthProvider } from "./contexts/AuthContext";
import { getUser } from "./contexts/ServerUserContext";

export const metadata = {
  title: "Nice",
  description: "Nice",
};

export default async function RootLayout({ children }: { children: any }) {
  // Fetch user data once at the root level
  const user = await getUser();

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
          <Notifications />
          <AuthProvider initialUser={user}>
            <div className="min-h-screen">
              <Header />
              {children}
            </div>
          </AuthProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
