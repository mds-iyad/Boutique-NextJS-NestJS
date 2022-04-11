import React from "react"
import { useUser } from "../../../context/UserContext";
import { useForm, Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import SendIcon from "@mui/icons-material/Send";
import { useRouter } from 'next/router';
import axios from "axios";


export default function CommentaireForm()
{
    const router = useRouter();
    const {setUser, setToken, token, user} = useUser();
    const { register, handleSubmit, control, formState: { errors } } = useForm();
    const commentData = async (data) => 
    {
      // console.log(data)
       axios.post("http://localhost:3000/products",
        {
            name: data.name,
            price: data.price,
            description: data.description,
            date: new Date(),
            details: data.details,
            image: data.image
        },
        {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
       ).then(function (response) {
        //  console.log(response);
       })
       .catch(function (error) {
        //  console.log(error);
       });
    }

    return(

    
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
        onSubmit={handleSubmit(commentData)}
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

            <TextField 
            id="outlined-image"
            label="image"
            margin="dense"
            required
            {...register("image")}
            />
            




            <Button type="submit" variant="contained" endIcon={<SendIcon />}>
            Save
            </Button>

        </Box>

    )

}