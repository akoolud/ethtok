import Head from "next/head";
import React from "react";
import styles from "../styles/Home.module.scss";
import { EtherscanProvider } from "ethers";
import { useGetConversationList } from "../util/tx";

export default function Home() {
  const [val, setval] = React.useState(
    "0xb66cd966670d962c227b3eaba30a872dbfb995db"
  );
  console.log("val", val);

  const [convosLoading, convosErr, convos] = useGetConversationList(val);

  console.log("convos", convosLoading, convosErr, convos);

  return (
    <div className={"container"}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <div className={styles.search}>
          <input value={val} onChange={(e) => setval(e.target.value)} />
          <button>
            <img src="/assets/img/search.png" alt="" />
          </button>
        </div>
        {val && convosLoading ? (
          <p>
            Loading Conversations For <a>{val}</a>
          </p>
        ) : Object.keys(convos).length ? (
          Object.keys(convos).map((c, i) => (
            <div key={"card" + i} className="convo">
              <div className="header">
                <h3>{val}</h3>
                <h3>{c}</h3>
              </div>
              <div>{convos[c]}</div>
            </div>
          ))
        ) : (
          <p className={styles.description}>No results</p>
        )}
      </main>

      <style jsx>{`
        .container {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        main {
          max-width: 90rem;
          width: 100%;
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .convo {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin: 0.375rem;
          border: 1px solid #00aaff;
        }
        .convo .header {
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          background-color: #d4d8dd;
        }
        .convo .header h3 {
          margin: 0;
          color: #222629;
          padding: 0.375rem;
        }
        .convo div {
          width: 100%;
          padding: 0.375rem;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
