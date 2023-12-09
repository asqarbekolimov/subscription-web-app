import { Header, Hero, Row } from "@/components";
import { IMovie } from "@/interfaces/app.interface";
import { API_REQUEST } from "@/services/api.service";
import { GetServerSideProps } from "next";
import Head from "next/head";

export default function Home({ trending }: HomeProps): JSX.Element {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900/50 to-slate-900">
      <Head>
        <title>Movie App</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="logo.svg" />
      </Head>
      <Header />
      <main className="relative pb-24 pl-4 lg:space-y-24 lg:pl-16">
        <Hero trending={trending} />
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
      trending: trending.results,
    },
  };
};

interface HomeProps {
  trending: IMovie[];
}
