import { Button, Container, TextareaAutosize } from '@mui/material'
import { Box } from '@mui/system';
import Link from 'next/link';
import Default from '../../components/Layout/Default'
import LoginForm from '../../components/Forms/LoginForm'
import CommentaireForm from '../../components/Forms/CommentaireForm'
import { useUser } from '../../context/UserContext'
import RegisterForm from '../../components/Forms/RegisterForm';

export default function Login() {
  
  const {user, logOut} = useUser();
  console.log(user)

  return(
      <Default>
      

      <Container>

        {!user && 
          <Container style={{marginTop:30}}>
            <Button style={{float:'right'}}>
                <Link passHref href="/Login">
                Login
                </Link>  
            </Button>
            <RegisterForm />
          </Container>
        }
        {user && 
          <Container style={{display:'flex', flexDirection:'column'}}>
            <Box style={{ display:'flex', justifyContent:'right' }}>
              <Button style={{width:200}} onClick={logOut}>Logout</Button>
            </Box>
          </Container>
        }
      </Container>
      </Default>
  )
}