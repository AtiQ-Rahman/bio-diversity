import "../styles/globals.css";
import { Provider } from "react-redux";
import { store } from "../store";
import { ThemeProvider } from "@mui/material/styles";
import themes from '../theme';
import { CssBaseline } from "@mui/material";

function MyApp({ Component, pageProps }) {
  // const customization = useSelector((state) => state.customization);

  return (
    <Provider store={store}>
      <ThemeProvider theme={themes({ fontFamily: 'Raleway, Arial'})}>
      <CssBaseline/>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
