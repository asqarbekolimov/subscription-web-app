import { Header, Hero, Modal, Row, SubscriptionPlan } from "@/components";
import { IMovie, Product } from "@/interfaces/app.interface";
import { API_REQUEST } from "@/services/api.service";
import { useInfoStore } from "@/store";
import { GetServerSideProps } from "next";
import Head from "next/head";

export default function Home({
  trending,
  topRated,
  tvTopRated,
  popular,
  comedy,
  documentary,
  family,
  history,
  products,
  subscription,
}: HomeProps): JSX.Element {
  const { setModal, modal } = useInfoStore();

  if (!subscription.length) return <SubscriptionPlan products={products} />;

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
          <Row title="Popular" movies={popular} />
          <Row title="Top Rated" movies={topRated} />
          <Row title="TV Show" movies={tvTopRated} isBig={true} />
          <Row title="Documentary" movies={documentary} />
          <Row title="Family" movies={family} isBig={true} />
          <Row title="Comedy" movies={comedy.reverse()} />
          <Row title="History" movies={history} isBig={true} />
          {/* bigRow */}
        </section>
      </main>
      {modal && <Modal />}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async ({
  req,
}) => {
  const user_id = req.cookies.user_id;

  if (!user_id) {
    return {
      redirect: { destination: "/auth", permanent: false },
    };
  }

  const [
    trending,
    topRated,
    tvTopRated,
    popular,
    documentary,
    comedy,
    family,
    history,
    products,
    subscription,
  ] = await Promise.all([
    fetch(API_REQUEST.trending).then((res) => res.json()),
    fetch(API_REQUEST.top_rated).then((res) => res.json()),
    fetch(API_REQUEST.tv_top_rated).then((res) => res.json()),
    fetch(API_REQUEST.popular).then((res) => res.json()),
    fetch(API_REQUEST.documentary).then((res) => res.json()),
    fetch(API_REQUEST.comedy).then((res) => res.json()),
    fetch(API_REQUEST.family).then((res) => res.json()),
    fetch(API_REQUEST.history).then((res) => res.json()),
    fetch(API_REQUEST.products_list).then((res) => res.json()),
    fetch(`${API_REQUEST.subscription}/${user_id}`).then((res) => res.json()),
  ]);

  return {
    props: {
      trending: trending.results,
      topRated: topRated.results,
      tvTopRated: tvTopRated.results,
      popular: popular.results,
      documentary: documentary.results,
      comedy: comedy.results,
      family: family.results,
      history: history.results,
      products: products.products.data,
      subscription: subscription.subscription.data,
    },
  };
};

interface HomeProps {
  trending: IMovie[];
  topRated: IMovie[];
  tvTopRated: IMovie[];
  popular: IMovie[];
  documentary: IMovie[];
  comedy: IMovie[];
  family: IMovie[];
  history: IMovie[];
  products: Product[];
  subscription: string[];
}
