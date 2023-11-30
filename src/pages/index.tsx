import { Header, Row } from "@/components";
import Head from "next/head";
import Image from "next/image";

export default function Home() {
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
