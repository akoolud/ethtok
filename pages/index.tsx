import Head from "next/head";
import Link from "next/link";
import React from "react";
import styles from "../styles/Home.module.scss";
import { useGetLatest } from "../util/tx";

export default function Home() {
  const [val, setval] = React.useState(
    "0xb66cd966670d962c227b3eaba30a872dbfb995db"
  );
  const [hotLoading, hotErr, hot] = useGetLatest();

  return (
    <div className={"container"}>
      <Head>
        <title>EthTok - Ethereum Chats</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">EthTok</a>
        </h1>
        <div className={styles.search}>
          <input value={val} onChange={(e) => setval(e.target.value)} />
          <button>
            <img src="/assets/img/search.png" alt="" />
          </button>
        </div>
        <div className={styles["card-container"]}>
          <h3>Latest Conversations</h3>
          {val && hotLoading ? (
            <p>
              Loading Conversations For <a>{val}</a>
            </p>
          ) : hot.length ? (
            hot.map((c, i) => (
              <Link
                key={"hotcard" + i}
                className={styles["hot"]}
                href={"/" + c.address}
              >
                <h5>{c.name}</h5>
                <h4>{c.address}</h4>
              </Link>
            ))
          ) : (
            <p className={styles.description}>No results</p>
          )}
        </div>
      </main>

      <style jsx>{`
        main {
          max-width: 69rem;
          width: 100%;
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .container {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Manrope, Segoe UI,
            Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
            Helvetica Neue, sans-serif;
        }
        * {
          box-sizing: border-box;
        }
        h4,
        h5 {
          margin: 0;
        }
        a {
          color: inherit;
          text-decoration: none;
        }
      `}</style>
    </div>
  );
}