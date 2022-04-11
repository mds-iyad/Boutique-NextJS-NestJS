import { Button, Container, TextareaAutosize } from '@mui/material'
import { Box } from '@mui/system';
import Link from 'next/link';
import Default from '../../components/Layout/Default'
import LoginForm from '../../components/Forms/LoginForm'
import { useUser } from '../../context/UserContext'

export default function Login() {
  
  const {user, logOut} = useUser();

  return(
      <Default>
      

      <Container>

        {!user && 
          <Container style={{marginTop:30}}>
            <Button style={{float:'right'}} >  
              <Link passHref href="/Register">
                Register
              </Link>
            </Button>
              <LoginForm />
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