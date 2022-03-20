import type { NextPage } from "next";
import Head from 'next/head';

import { useUsersQuery } from '../generated/graphql';

const Home: NextPage = () => {
  const users = useUsersQuery({
    variables: {
      first: 10,
    },
  });
  if (users.loading) return <p>Loading...</p>;
  if (users.error) return <p>Error: {users.error.message}</p>;
  return (
    <div>
      <Head>
        <title></title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {users?.data?.users &&
          users.data.users.edges?.map((user, idx) => (
            <ul key={idx}>
              <li>{user?.node?.name}</li>
              <li>{user?.node?.email}</li>
              <li>{user?.node?.password}</li>
              <li>{user?.node?.createdAt}</li>
              <li>{user?.node?.updatedAt}</li>
            </ul>
          ))}
      </main>
    </div>
  );
};

export default Home;
