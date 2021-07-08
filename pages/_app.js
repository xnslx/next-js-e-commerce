import "../styles/index.css";
import Layout from "../components/Layout";

import { useStore } from "../reducer/index";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import { Provider } from "next-auth/client";
import { Provider as ReduxProvider } from "react-redux";

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
  const persistor = persistStore(store, {}, function () {
    persistor.persist();
  });

  return (
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor}>
        <Provider session={pageProps.session}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </PersistGate>
    </ReduxProvider>
  );
}

export default MyApp;
