import Head from "next/head";
import Link from "next/link";
import React from "react";
import { Layout } from "../components/Layout";
import { SearchBar } from "../components/SearchBar";
import { Title } from "../components/Title";
import styles from "../styles/Home.module.scss";
import { useGetLatest } from "../util/tx";

export default function Home() {
  const [hotLoading, hotErr, hot] = useGetLatest();

  return (
    <Layout>
      <main>
        <Title />
        <SearchBar />
        {hotErr && <p className="error">{hotErr}</p>}
        <div className={styles["card-container"]}>
          <h3>Latest Conversations</h3>
          {hotLoading ? (
            <p>Loading ...</p>
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
