import { CacheProvider } from "@emotion/react";
import "../styles/globals.css";
import createCache from "@emotion/cache";
import { StoreProvider } from "../utils/store";

const clientSideEmotionCache = createCache({ key: "css" });

function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}) {
  return (
    <CacheProvider value={emotionCache}>
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
    </CacheProvider>
  );
}

export default MyApp;
