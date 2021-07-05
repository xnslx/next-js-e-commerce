import "../styles/index.css";
import Layout from "../components/Layout";
import store from "../reducer/index";
import { Provider } from "next-auth/client";
import { Provider as ReduxProvider } from "react-redux";

function MyApp({ Component, pageProps }) {
  return (
    <ReduxProvider store={store}>
      <Provider session={pageProps.session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </ReduxProvider>
  );
}

export default MyApp;
