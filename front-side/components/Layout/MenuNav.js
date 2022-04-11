import Link from 'next/link'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useUser } from '../../context/UserContext';


export default function MenuNav({color})
{

    const {user, logOut} = useUser();

    return(
        // <div>
        //     <Link href="/">
        //         <a>Home</a>
        //     </Link>
        //     <Link href="/game">
        //         <a>Tape taupe</a>
        //     </Link>
        // </div>

    <Box sx={{ flexGrow: 1 }}>
        <AppBar style={{backgroundColor:color}} position="static">
            <Toolbar>
            <Box>
                <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                >
                <MenuIcon />
                </IconButton>

                <Link passHref href={"/"}>
                <Button color="inherit">
                    Home
                </Button>
                </Link>
                

            {!user &&
                <Link passHref href={"/Login"}> 
                <Button color="inherit">
                
                    Login
                </Button>
                </Link>
            }
            {user &&
            <Link passHref href={"/Wishlist"}>
                <Button color="inherit">
                    Wishlist
                </Button>
            </Link>
            }

            {user && 
            <Link passHref href={"/Products"}>
                <Button color="inherit">
                    Products
                </Button>
            </Link>
            }

            {user && 
            <Link passHref href={"/Cart"}>
                <Button color="inherit">
                    Cart
                </Button>
            </Link>
            }

            
            </Box>
            
            {user && <Box style={{float:'right'}}>
            <Button style={{color:'white'}} onClick={logOut}>Logout</Button>
            </Box> }
            
        

            </Toolbar>
        </AppBar>
    </Box>

    )
}