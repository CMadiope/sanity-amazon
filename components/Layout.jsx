import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  Link as MUILink,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
  Switch,
} from "@mui/material";
import Head from "next/head";
import React, { useContext } from "react";
import Link from "next/link";
import classes from "../utils/classes";
import { Store } from "../utils/store";
import jsCookies from "js-cookie";

export default function Layout({ title, description, children }) {
  const { state, dispatch } = useContext(Store);
  const { darkMode } = state;
  const theme = createTheme({
    components: {
      MuiLink: {
        defaultProps: {
          underline: "hover",
        },
      },
    },
    typography: {
      h1: {
        fontSize: "1.6rem",
        flexWeight: "400",
        margin: "1rem 0",
      },
      h2: {
        fontSize: "1.4rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
    },
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#f0c000",
      },
      secondary: {
        main: "#208080",
      },
    },
  });

  const darkModeChangeHandler = () => {
    dispatch({ type: darkMode ? "DARK_MODE_OFF" : "DARK_MODE_ON" });
    const newDarkMode = !darkMode;
    jsCookies.set("darkMode", newDarkMode ? "ON" : "OFF");
  };

  return (
    <>
      <Head>
        <title>{title ? `${title} - Sanity Amazon` : "Sanity Amazon"}</title>
        {description && <meta name='description' content={description}></meta>}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position='static' sx={classes.appbar}>
          <Toolbar sx={classes.toolbar}>
            <Box display='flex' alignItems='center'>
              <Link href='/'>
                <Typography sx={classes.brand}>Amazon</Typography>
              </Link>
            </Box>
            <Box>
              <Switch
                checked={darkMode}
                onChange={darkModeChangeHandler}
              ></Switch>
            </Box>
          </Toolbar>
        </AppBar>
        <Container component='main' sx={classes.main}>
          {children}
        </Container>
        <Box component='footer' sx={classes.footer}>
          <Typography>All right reserved</Typography>
        </Box>
      </ThemeProvider>
    </>
  );
}
