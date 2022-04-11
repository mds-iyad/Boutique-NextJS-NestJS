import { useRouter } from "next/router";
import Default from "../../../components/Layout/Default";
import axios from "axios";
import { grey, red } from '@mui/material/colors';
import Container from '@mui/material/Container';
import Image from "next/image";
import { Grid, Card, CardMedia, CardHeader, CardActions, CardContent, Typography, Collapse, Box } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import { useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IconButton } from "@mui/material";
import ReactStars from 'react-stars'


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

const ratingChanged = (newRating) => {
    console.log(newRating)
}


export default function Id({data}) {
    const router = useRouter();

    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    //console.log(router)
    // console.log(data)
    return (
            <Default>
                <Container>
                    <Box style={{display:'flex', justifyContent:'space-between'}}>
                        <Typography sx={{fontSize:25}} component="h1">
                            A product
                        </Typography>
                    </Box>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardHeader
                            avatar={
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                P
                            </Avatar>
                            }
                            title={data.name}
                            subheader={data.date}
                        />
                        <CardMedia
                            component="img"
                            height="194"
                            image={data.image}
                            alt=""
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                            {data.price} €
                            </Typography>
                        </CardContent>
                        
                        <CardActions disableSpacing>
                            
                        <div style={{display:'flex'}}>
                            <div style={{width:'10px'}}> </div>
                            
                            <ReactStars
                                count={5}
                                onChange={ratingChanged}
                                size={24}
                                color2={'#ffd700'} 
                            />
                        </div>

                            <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                            >
                            <ExpandMoreIcon />
                            </ExpandMore>
                        </CardActions>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <CardContent>
                                <Typography style={{fontWeight:'bold'}} paragraph>
                                    {data.description}
                                </Typography>
                                <Typography paragraph>Details:</Typography>
                                <Typography paragraph>
                                    {data.details}
                                </Typography>
                                
                            </CardContent>
                        </Collapse>
                    </Card>

                </Container>
            </Default>
    )
}

// export async function getServerSideProps(context)
// {
//     const id  = context.params.id;
//     const res = await fetch(`http://localhost:3000/products/${id}`)    
//     const data = await res.json()

//     return{
//         props: {
//             data
//         }
//     }
// }

export async function getStaticProps(context)
{
    const id  = context.params.id;
    const res = await axios.get(`http://localhost:3000/products/${id}`);
    const data = res.data;

    console.log(data)

    return{
        props: {
            data
        },
        revalidate: 10,
    }
}



export async function getStaticPaths()
{
    
    const res = await axios.get("http://localhost:3000/products/");
    const data = res.data;

    const paths = data.map((value) => ({
        params:{
            id: value._id.toString()
        }
    }))

    // console.log(paths);



    return{

        paths,
        fallback: false,

    }
}




