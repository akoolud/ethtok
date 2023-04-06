import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Layout } from "../../components/Layout";
import styles from "../../styles/Home.module.scss";
import { GetDateString } from "../../util/date";
import { useGetMessageList } from "../../util/tx";

export default function Home() {
  const router = useRouter();
  const { f, t } = router.query;

  const [messagesLoading, messagesErr, messages] = useGetMessageList(
    f?.toString(),
    t?.toString()
  );

  return (
    <Layout>
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
                    <a href={"/" + t}>{c.to}</a>
                  </h5>
                </div>
                <h4>{c.d}</h4>
                <div className={styles["msg-footer"]}>
                  <p>{GetDateString(c.timeStamp)}</p>
                </div>
              </div>
            ))
          ) : (
            <p className={styles.description}>No results</p>
          )}
        </div>
      </main>
    </Layout>
  );
}
