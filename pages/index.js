import { Typography } from "@mui/material";
import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Sanity Amazon</title>
        <meta
          name='description'
          content='The e-commerce website created by Next and Sanity'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Typography component='h1' variant='h1'>Sanity Amazon</Typography>
    </div>
  );
}
