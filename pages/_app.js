import "../styles/globals.css";
import { Provider } from "react-redux";
import { store } from "./store";
import { ThemeProvider } from "@mui/material/styles";
import themes from './theme';

function MyApp({ Component, pageProps }) {
  // const customization = useSelector((state) => state.customization);

  return (
    <Provider store={store}>
      <ThemeProvider theme={themes(null)}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
