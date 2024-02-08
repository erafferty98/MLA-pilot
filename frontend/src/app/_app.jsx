import Head from "next/head";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/global.css" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
