import React from "react";
import { Container, TextField, Button } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import SendIcon from "@mui/icons-material/Send"
import { Box } from "@mui/system";
import axios from "axios";
import { useUser } from "../../../context/UserContext";


export default function RegisterForm()
{
    const {token, setUser, setToken} = useUser();
    const {user} = useUser();
    
    const { register, handleSubmit, control, formState: { errors } } = useForm();
    const registerData = async (data) => 
    {
      // console.log(data)
      axios.post("http://localhost:3000/users",
        data
      ).then(function(response)
      {
        // console.log(response);
        setToken(response.data.access_token);

      })
    }

    return(
      
      <Container sx={{
        dispaly:"flex",
        flexDirection: "column"
      }}>

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
      onSubmit={handleSubmit(registerData)}
      >
        {/* <Controller
          control={control}
          name="username"
          render={({ field }) => (
            <TextField
            id="outlined-username"
            label="username"
            margin="dense"
            required
            {...field}
            />
          )}
        /> */}

          <TextField
            id="outlined-username"
            label="username"
            margin="dense"
            required
            {...register("username")}
            />


        {errors.username?.type === 'required' && "First name is required"}

        {/* <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <TextField
            type="password"
            id="outlined-password"
            label="password"
            margin="dense"
            required
            {...field}
            />

          )}
          /> */}


          <TextField
            type="password"
            id="outlined-password"
            label="password"
            margin="dense"
            required
            {...register('password')}
            />

          <Button style={{backgroundColor:'gray'}} type="submit" variant="contained" endIcon={<SendIcon />}>
            Register
          </Button>

        
        {/* <input type="submit" /> */}
        {/* </form> */}

        </Box>
      </Container>
    )
}


