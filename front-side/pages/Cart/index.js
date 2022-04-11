import Default from "../../components/Layout/Default";
import { useUser } from "../../context/UserContext";
import { useState } from "react";
import { Button, Card, CardActions, CardContent, CardMedia, Container, Typography } from "@mui/material";
import Link from "next/link";
import { Box } from "@mui/system";





export default function Cart()
{
    const {user} = useUser();
    const panier = user.panier;    

    return(
        <Default>
            <Container>
                <Box style={{display:'flex', justifyContent:'space-between'}}>
                    <Typography sx={{fontSize:25}} component="h1">
                        Cart
                    </Typography>
                </Box>

                <Card style={{ marginBottom:10 }} sx={{ maxWidth: 345 }}>
                    <CardMedia
                        component="img"
                        height="140"
                        image={panier.image}
                        alt=""
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        {panier.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        {panier.details}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Link href='/products' passHref>
                            <Button size="small">Shop More</Button>
                        </Link>
                    </CardActions>
                </Card>
            </Container>
        </Default>
    )
}

