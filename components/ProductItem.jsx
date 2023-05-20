import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import Link from "next/link";
import { urlForThumbnail } from "../utils/image";

const ProductItem = ({ product }) => {
  return (
    <Card>
      <Link href={`/product/${product.slug.current}`} passHref>
        <CardActionArea>
          <CardMedia
            component='img'
            image={urlForThumbnail(product.image)}
            title={product.name}
          />
          <CardContent>
            <Typography>{product.name}</Typography>
            <Typography>
              {product.rating} {product.numReviews} revies
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions>
        <Typography>${product.price}</Typography>
        <Button size='small' color='primary'>
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductItem;
