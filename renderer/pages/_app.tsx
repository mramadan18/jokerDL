import type { AppProps } from "next/app";
import Head from "next/head";
import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/router";
import "../styles/globals.css";
import MainLayout from "../components/layout/MainLayout";
import { APP_CONFIG } from "../config/app-config";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{`${APP_CONFIG.name} - ${APP_CONFIG.titleSuffix}`}</title>
      </Head>
      <HeroUIProvider navigate={router.push}>
        <NextThemesProvider attribute="class" defaultTheme="dark">
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </NextThemesProvider>
      </HeroUIProvider>
    </>
  );
}

export default MyApp;
