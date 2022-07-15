import { GetStaticPaths } from "next"
import { useRouter } from "next/router"
import Layout from "../../components/Layout"

interface User {
  id: number
  name: string
  email: string
  phone: string
  website: string
}

interface UserdetailProps {
  user: User;
}
export default function Userdetail(props: UserdetailProps) {
  const { user } = props;
  
  return ( 
    <Layout pageTitle="User Detail">
    <div>
      <p>{user.name}</p>
      <p>{user.email}</p>
      <p>{user.phone}</p>
      <p>{user.website}</p>
    </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const dataUsers = await res.json();

  const paths = dataUsers.map((user: User) => ({
      params: {
        //ubah id jadi string
        id: `${user.id}`,
      },
    }));
  return {
    paths,
    fallback: false,
  }
}
//dynamik router
interface getStaticProps {
  params: {
    id: string
  }
}
export async function getStaticProps(context: getStaticProps) {
  const { id } = context.params;
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  const user = await res.json();
  return {
    props: {
      user,
    },
  };
}