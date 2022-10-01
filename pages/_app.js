import "../styles/globals.css";
import { Provider } from "react-redux";
import { store } from "../store";
import { ThemeProvider } from "@mui/material/styles";
import themes from '../theme';
import { CssBaseline } from "@mui/material";
import '../styles/mapPopUp.css'

// import { BrowserRouter } from "react-router-dom";
import Footer from "../components/Home/Footer/Footer";
function MyApp({ Component, pageProps }) {
  // const customization = useSelector((state) => state.customization);

  return (
    <Provider store={store}>
        {/* <BrowserRouter> */}
      <ThemeProvider theme={themes({ fontFamily: 'Raleway, Arial'})}>
      <CssBaseline/>
        <Component {...pageProps} />
        {/* <Footer /> */}
      </ThemeProvider>
      {/* </BrowserRouter> */}
    </Provider>
  );
}

export default MyApp;
