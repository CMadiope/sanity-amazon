import React, { useState, useEffect } from "react";
import client from "../../utils/client";
import Layout from "../../components/Layout";
import {
  Alert,
  Box,
  Button,
  Card,
  CircularProgress,
  Grid,
  List,
  ListItem,
  Rating,
  Typography,
  Link as muiLink,
} from "@mui/material";
import Link from "next/link";
import classes from "../../utils/classes";
import Image from "next/image";
import { urlFor } from "../../utils/image";

const ProductScreen = (props) => {
  const { slug } = props;
  const [state, setState] = useState({
    product: null,
    loading: true,
    error: "",
  });

  const { product, loading, error } = state;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const product = await client.fetch(
          `
          *[_type == "product" && slug.current == $slug][0]
        `,
          { slug }
        );
        setState({ ...state, product, loading: false });
      } catch (error) {
        setState({ ...state, error: error.message, lading: false });
      }
    };
    fetchData();
  }, []);

  return (
    <Layout title={product?.title}>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert variant='error'>{error.message}</Alert>
      ) : (
        <Box>
          <Box sx={classes.section}>
            <Link href='/' passHref>
              <muiLink>
                <Typography>Back to results</Typography>
              </muiLink>
            </Link>
          </Box>
          <Grid container spacing={1}>
            <Grid item md={6} xs={12}>
              <Image
                src={urlFor(product.image)}
                alt={product.name}
                layout='responsive'
                width={640}
                height={640}
              />
            </Grid>
            <Grid md={3} xs={12}>
              <List>
                <ListItem>
                  <Typography component='h1' variant='h1'>
                    {product.name}
                  </Typography>
                </ListItem>
                <ListItem>Category: {product.category}</ListItem>
                <ListItem>Brand: {product.brand}</ListItem>
                <ListItem>
                  <Rating value={product.rating} readOnly></Rating>
                  <Typography sx={classes.smallText}>
                    ( {product.numReviews} reviews)
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography>Description: {product.description}</Typography>
                </ListItem>
              </List>
            </Grid>
          </Grid>
          <Grid item md={3} xs={12}>
            <Card>
              <List>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Price</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>${product.price}</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Status</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>
                        {product.countInstock > 0 ? "In stock" : "unavailable"}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Button fullWidth variant='contained'>
                    Add to card
                  </Button>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Box>
      )}
    </Layout>
  );
};

export default ProductScreen;

export function getServerSideProps(context) {
  return {
    props: { slug: context.params.slug },
  };
}

// 1:37:31