import * as React from 'react';
import Default from '../../components/Layout/Default';
import { Container, Button, Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, TextField, Box } from '@mui/material';

import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { grey, red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { useState } from 'react';
import Link from 'next/link';
import { useUser } from '../../context/UserContext';
import axios from 'axios';
import ReactStars from 'react-stars'
import { Modal } from '@mui/material';
import SendIcon from '@mui/icons-material/Send'
import { useForm } from 'react-hook-form';


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

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };



export default function Products({data})
{

    const { register, handleSubmit, control, formState: { errors } } = useForm();

    const [editableProduct, setEditableProduct] = useState(null)

    const updateProduct = async (data) => 
    {
       axios.put(`http://localhost:3000/products/${editableProduct}/`,
        {
            name: data.name,
            description: data.description,
            date: new Date().toDateString(),
            details: data.details,
            price: data.price
        },
        {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
       ).then(function (response) {
       })
       .catch(function (error) {
       });
    }



    const ratingChanged = (newRating) => {
        console.log(newRating)
      }
      

    const {user, token} = useUser();

    const addToCard = async (product) => {
        
        axios.put(`http://localhost:3000/users/${user._id}`,
        {
            panier: product._id
        }
        ).then(function (response) {
        console.log(response);
        })
        .catch(function (error) {
        });
      }
    const [fav, setFav] = useState([]);

    const handleFavClick = async (id, user) => {
        const wish = await checkFav(id, user);
        if(wish == null)
        {
            axios.post('http://localhost:3000/wishlist',
            {
                username: user,
                productId: id
            })
        }
        else{
            axios.delete(`http://localhost:3000/wishlist/${wish._id}`)
        }

        if(!isFav(id))
        setFav([...fav, { [id]: true }]);
        else{
        setFav([...fav, { [id]: false }]);
       }
    }

    const checkFav = async (id,user) => {

        const res = await axios.get('http://localhost:3000/wishlist')
        const data = res.data;

        const res1 = data.find( (wish) =>{
            return wish.productId == id && wish.username == user
        } )
        return res1;
    }

    const isFav = (id) => {
        const isFav = false;
         for (let index = 0; index < fav.length; index++) {
             if(fav[index][id])
             {
                isFav = true;
             }
             else if( (fav[index][id]) === false)
             {
                isFav = false;
             }
         }
         return isFav;
    } 

    const [expanded, setExpanded] = useState([]);

    const handleExpandClick = (id) => {
      if(!expanded[id])
        setExpanded({ [id]: true });
       else{
        setExpanded({ [id]: false });
       }
    };

    const [open, setOpen] = useState(false);
    const handleOpen = (id) => {
        setOpen(true);
        setEditableProduct(id);
    }
    const handleClose = () => setOpen(false);


    return(
        <Default>
            <Container>
                <Box style={{display:'flex', justifyContent:'space-between'}}>
                <Typography sx={{fontSize:25}} component="h1">
                    List of products
                </Typography>
                <Link href='/Products/Add' passHref>
                    <Button>
                        Add a product
                    </Button>
                </Link>
                </Box>

                {data.map( (product) => {
                    return(
                        <div key={product._id} style={{display:'inline-flex', marginRight:20, marginBottom:20}}>
                            <Card sx={{ maxWidth: 345 }}>
                                <CardHeader
                                    avatar={
                                     <Avatar sx={{ bgcolor: grey[500] }} aria-label="recipe">
                                         R
                                    </Avatar>
                                    }
                                    action={
                                    <IconButton onClick={ () => handleOpen(product._id)} aria-label="settings">
                                        <ModeEditOutlineIcon />
                                    </IconButton>
                                    }
                                    title={product.name}
                                    subheader={product.date}
                                />
                                <Link href={`/Products/${product._id}`} passHref>
                                <Button style={{display:'block'}} >
                                <CardMedia
                                    component="img"
                                    height="194"
                                    image={product.image}
                                    alt="Paella dish"
                                />
                                <CardContent>
                                    <Typography variant="body2" color="text.secondary">
                                    {product.price} €
                                    </Typography>
                                </CardContent>
                                </Button>
                                </Link>
                                <div style={{display:'flex'}}>
                                <div style={{width:'10px'}}> </div>
                                
                                <ReactStars
                                    count={5}
                                    onChange={ratingChanged}
                                    size={24}
                                    color2={'#ffd700'} 
                                />
                                </div>
                                <CardActions disableSpacing>
                                   

                                    { isFav(product._id) && 
                                     <IconButton onClick={() => handleFavClick(product._id, user.username)} aria-label="add to favorites">
                                        <FavoriteIcon style={{color:'red'}} /> 
                                     </IconButton>
                                    }
                                    { !isFav(product._id) && 
                                      <IconButton onClick={() => handleFavClick(product._id, user.username)} aria-label="add to favorites">
                                        <FavoriteIcon />
                                     </IconButton>
                                    }

                                    

                                    <IconButton onClick={ () => addToCard(product)} aria-label="add to card">
                                        <ShoppingCartIcon  />
                                    </IconButton>
                                    <ExpandMore
                                    expand={expanded[product._id]}
                                    onClick={ () => handleExpandClick(product._id)}
                                    aria-expanded={expanded[product._id]}
                                    aria-label="show more"
                                    >
                                    <ExpandMoreIcon />
                                    </ExpandMore>
                                </CardActions>
                                <Collapse in={expanded[product._id]} timeout="auto" unmountOnExit>
                                    <CardContent>
                                    <Typography style={{fontWeight:'bold'}} paragraph>
                                        {product.description}
                                    </Typography>
                                    <Typography paragraph>Details:</Typography>
                                    <Typography paragraph>
                                        {product.details}
                                    </Typography>
                                    
                                    </CardContent>
                                </Collapse>
                            </Card>
                            
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                <Box
                                    component="form"
                                    sx={{
                                    '& > :not(style)': { m: 1, width: '25ch' },
                                    display:"flex",
                                    flexDirection:"column",
                                    justifyContent:"center",
                                    alignItems:"center"
                                    }}
                                    noValidate
                                    autoComplete="off"
                                    onSubmit={handleSubmit(updateProduct)}
                                    >
                                    
                                    <TextField
                                    id="outlined-name"
                                    label="name"
                                    margin="dense"
                                    required
                                    {...register("name")}
                                    />

                                    <TextField
                                    id="outlined-description"
                                    label="description"
                                    margin="dense"
                                    required
                                    {...register("description")}
                                    />  

                                    <TextField
                                    id="outlined-details"
                                    label="details"
                                    margin="dense"
                                    required
                                    {...register("details")}
                                    />
                                    <TextField 
                                    type="number"
                                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                    id="outlined-price"
                                    label="price"
                                    margin="dense"
                                    required
                                    {...register("price")}
                                    />

                                    <Button type="submit" variant="contained" endIcon={<SendIcon />}>
                                    Save
                                    </Button>
                                </Box>
                                </Box>


                            </Modal>



                        </div>
                    ) 
                })}



            </Container>
        </Default>
    )
}



 export async function getServerSideProps() 
 {
     const res = await fetch("http://localhost:3000/products/")    
     const data = await res.json()

     if(!data)
     {
         return{
             notFound: true,
         }
     }

     return {
       props: {
           data
       },
     }
}
