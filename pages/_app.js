import "../styles/globals.css";
import { Provider } from "react-redux";
import { store } from "../store";
import { ThemeProvider } from "@mui/material/styles";
import themes from '../theme';
import { CssBaseline } from "@mui/material";
import '../styles/mapPopUp.css'
import '../styles/Spinner.scss'
import { SnackbarProvider } from "notistack";
import { motion, AnimatePresence } from "framer-motion"
// import { BrowserRouter } from "react-router-dom";
import Footer from "../components/Home/Footer/Footer";
import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress
import Head from "next/head";
//Binding events. 
Router.onRouteChangeStart = url => {
  NProgress.start()
}
Router.onRouteChangeComplete = () => NProgress.done()

Router.onRouteChangeError = () => NProgress.done()
function MyApp({ Component, pageProps, router }) {
  // const customization = useSelector((state) => state.customization);

  return (
    <Provider store={store}>
      {/* <BrowserRouter> */}
      <ThemeProvider theme={themes({ fontFamily: 'Raleway, Arial' })}>
        <SnackbarProvider>
          <CssBaseline />
          {/* <AnimatePresence>
            <motion.div key={router.route} initial="pageInitial" animate="pageAnimate" exit="pageExit" variants={{

              pageAnimate: {
                opacity: 1
              },
              pageExit: {
                backgroundColor: "white",
                opacity: 0
              }
            }}> */}
          <Head>
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
            />
          </Head>
          <Component {...pageProps} />
          {/* </motion.div>
          </AnimatePresence> */}
        </SnackbarProvider>
        {/* <Footer /> */}
      </ThemeProvider>
      {/* </BrowserRouter> */}
    </Provider>
  );
}

export default MyApp;
