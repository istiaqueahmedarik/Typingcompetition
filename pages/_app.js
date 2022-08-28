import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import Check from '../components/Check';
import Loading from '../components/Loading';
import Name from '../components/Name';
import Verify from '../components/Verify';
import app from '../firebase';
import '../styles/globals.css';
function MyApp({ Component, pageProps }) {
  const auth = getAuth(app);
  const [user, loading, error] = useAuthState(auth);
  if(loading) return <Loading />
  // verify
  if(!user) return <Check/>
  if(user.displayName===null) return <Name/>
  if(user.emailVerified===false) return <Verify/>
  return <Component {...pageProps} />
}

export default MyApp
