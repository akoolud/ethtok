import Head from "next/head";
import Link from "next/link";
import React from "react";
import { Layout } from "../components/Layout";
import { Title } from "../components/Title";
import styles from "../styles/Home.module.scss";
import { useGetLatest } from "../util/tx";

export default function Home() {
  const [val, setval] = React.useState("");
  const [hotLoading, hotErr, hot] = useGetLatest();

  return (
    <Layout>
      <main>
        <Title />
        <div className={styles.search}>
          <input value={val} onChange={(e) => setval(e.target.value)} />
          <button>
            <img src="/assets/img/search.png" alt="" />
          </button>
        </div>
        {hotErr && <p className="error">{hotErr}</p>}
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
    </Layout>
  );
}
