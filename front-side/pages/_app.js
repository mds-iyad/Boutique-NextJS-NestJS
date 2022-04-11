import '../styles/globals.css'
import UserContext from '../context/UserContext'

function MyApp({ Component, pageProps }) {
  return (
  <UserContext>
    <Component {...pageProps} />
  </UserContext>
  )
}

export default MyApp
