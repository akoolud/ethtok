import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styles from "../../styles/Home.module.scss";
import { useGetMessageList } from "../../util/tx";

export default function Home() {
  const router = useRouter();

  const { f, t } = router.query;
  console.log("router.query", router.query);

  const [messagesLoading, messagesErr, messages] = useGetMessageList(
    f?.toString(),
    t?.toString()
  );

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
        <div className={styles["card-container"]}>
          <h3 className={styles["title"]}>
            Conversations Between ({messages?.messages?.length || ""})
            <div>
              <a href={"/" + f}>
                <h4>{f}</h4>
              </a>
              ⇄
              <a href={"/" + t}>
                <h4>{t}</h4>
              </a>
            </div>
          </h3>
          {messagesLoading ? (
            <p>
              Loading Conversations Between <a href={"/" + f}>{f}</a>
              <a href={"/" + t}>{t}</a>
            </p>
          ) : messages.messages?.length ? (
            messages.messages.map((c, i) => (
              <div key={"msgcard" + i} className={styles["msg"]}>
                <div className={styles["msg-head"]}>
                  <h5 className={c.from === f ? styles["active"] : ""}>
                    <a href={"/" + f}> {c.from}</a>
                  </h5>
                  <div>⇄</div>
                  <h5 className={c.to === f ? styles["active"] : ""}>
                    {" "}
                    <a href={"/" + t}>{c.to}</a>
                  </h5>
                </div>
                <h4>{c.d}</h4>
                <div className={styles["msg-footer"]}>{c.timestamp}</div>
              </div>
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
