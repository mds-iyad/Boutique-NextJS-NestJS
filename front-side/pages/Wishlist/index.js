import Default from "../../components/Layout/Default";
import * as React from 'react';
import { Box, Typography, Card, CardActions, CardContent, CardMedia, Button, Container } from "@mui/material";
import Link from "next/link";
import axios from "axios";
import { useUser } from "../../context/UserContext";
import { useEffect, useState } from "react";


export default function Wishlist ()
{
    const {user, token} = useUser();


    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(
                `http://localhost:3000/wishlist?username=${user.username}`);
            const data = await res.json();
            setData(data);
        };
        fetchData();
    }, []);




    return(

        <Default>
            <Container>
                <Box style={{display:'flex', justifyContent:'space-between'}}>
                <Typography sx={{fontSize:25}} component="h1">
                    List of wishlists
                </Typography>
                </Box>

                {data.map( (product) => {
                    return(
                        <Card style={{ marginBottom:10 }} sx={{ maxWidth: 345 }}>
                            <CardMedia
                                component="img"
                                height="140"
                                image={product.productId.image}
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                {product.productId.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                {product.productId.details}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Link href={`/Products/${product.productId._id}`} passHref>
                                    <Button size="small">Learn More</Button>
                                </Link>
                            </CardActions>
                        </Card>
                ) 
                })}


            </Container>
        </Default>
    )
}



