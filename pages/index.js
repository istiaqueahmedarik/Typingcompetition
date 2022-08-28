import { getAuth } from 'firebase/auth';
import Head from 'next/head';
import { useAuthState } from 'react-firebase-hooks/auth';
import Main from '../components/Main';
import app from '../firebase';

export default function Home({data}) {
  const auth = getAuth(app);
  const [user, loading, error] = useAuthState(auth);
  console.log(user)
  return (
    <>
      <Head>
        <title>Type Master</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main data={data}/>
    </>
  )
}
export async function getServerSideProps() {
  const res = await fetch('https://random-line.cyclic.app/line')
  
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}