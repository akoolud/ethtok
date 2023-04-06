import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Layout } from "../../components/Layout";
import { Title } from "../../components/Title";
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
        <Title />
        {f !== undefined && messagesErr && (
          <p className="error">{messagesErr}</p>
        )}
        <div className={styles["card-container"]}>
          <h3
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            Conversations Between ({messages?.messages?.length || ""})
            <div style={{ display: "flex", alignItems: "center" }}>
              <a
                href={"/" + f}
                style={{
                  padding: "0 0.2rem",
                  fontSize: "0.7rem",
                  textTransform: "uppercase",
                }}
              >
                {f}
              </a>
              <span style={{ color: "cornflowerblue", padding: "0 0.5rem" }}>
                ⇄
              </span>
              <a
                href={"/" + t}
                style={{
                  padding: "0 0.2rem",
                  fontSize: "0.7rem",
                  textTransform: "uppercase",
                  color: "grey",
                }}
              >
                {t}
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
            f !== undefined && <p className={styles.description}>No results</p>
          )}
        </div>
      </main>
    </Layout>
  );
}
