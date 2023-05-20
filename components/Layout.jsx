import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  Link as muiLink,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";
import Head from "next/head";
import React from "react";
import Link from "next/link";
import classes from "../utils/classes";

export default function Layout({ title, description, children }) {
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
      mode: "light",
      primary: {
        main: "#f0c000",
      },
      secondary: {
        main: "#208080",
      },
    },
  });

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
            <Link href='/' passHref>
              <muiLink>
                <Typography sx={classes.brand}>Amazon</Typography>
              </muiLink>
            </Link>
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
