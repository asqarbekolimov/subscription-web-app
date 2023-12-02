import { Header, Row } from "@/components";
import { API_REQUEST } from "@/services/api.service";
import { GetServerSideProps } from "next";
import Head from "next/head";

export default function Home(props: HomeProps): JSX.Element {
  console.log(props);

  return (
    <div className="flex min-h-screen flex-col items-center py-2">
      <Head>
        <title>Movie App</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="logo.svg" />
      </Head>
      <Header />
      <main>
        {/* hero */}
        <section>
          {/* row */}
          {/* bigRow */}
        </section>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const trending = await fetch(API_REQUEST.trending).then((res) => res.json());

  return {
    props: {
      trending: trending,
    },
  };
};

interface HomeProps {
  trending: any;
}
