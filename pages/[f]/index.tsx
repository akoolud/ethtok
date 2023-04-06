import Head from "next/head";
import Link from "next/link";
import React from "react";
import { Layout } from "../../components/Layout";
import styles from "../../styles/Home.module.scss";
import { useGetConversationList } from "../../util/tx";

const TxInfoForAddress = ({ info }: { info: IInfo }) => {
  return (
    <div className={styles["tx-info"]}>
      <div className={styles["tx-info-row"]}>
        <div className={styles["tx-info-item"]}>
          <div>Message Transactions</div>
          <div>{info.readable || "---"}</div>
        </div>
        <div className={styles["tx-info-item"]}>
          <div>Latest Message</div>
          <div>{info.latestMessage || "---"}</div>
        </div>
      </div>
      <div className={styles["tx-info-row"]}>
        <div className={styles["tx-info-item"]}>
          <div>Total Transactions</div>
          <div>{info.total || "---"}</div>
        </div>
        <div className={styles["tx-info-item"]}>
          <div>Latest Transaction</div>
          <div>{info.latestTX || "---"}</div>
        </div>
      </div>
    </div>
  );
};
export default function ConversatioPage() {
  const [val, setval] = React.useState(
    "0xb66cd966670d962c227b3eaba30a872dbfb995db"
  );
  const [convosLoading, convosErr, convos, txInfo] =
    useGetConversationList(val);

  return (
    <Layout>
      {" "}
      <main>
        <h1 className={styles.title}>
          Welcome to <a href="/">EthTok</a>
        </h1>
        <div className={styles.search}>
          <input value={val} onChange={(e) => setval(e.target.value)} />
          <button>
            <img src="/assets/img/search.png" alt="" />
          </button>
        </div>
        <div className={styles["card-container"]}>
          {convosErr && <p className="error">{convosErr}</p>}
          {val && convosLoading ? (
            <p>
              Loading Conversations For <a>{val}</a>
            </p>
          ) : Object.keys(convos).length ? (
            <div>
              <TxInfoForAddress info={txInfo} />
              {Object.keys(convos).map((c, i) => (
                <Link
                  key={"card" + i}
                  className={styles["convo"]}
                  href={"/" + val + "/" + c}
                >
                  <div className={styles["from"]}>
                    <div className={styles["avatar"]}>
                      <h3>{val}</h3>
                    </div>
                  </div>
                  <div className={styles["count"]}>
                    {convos[c]} <div>⇄</div>
                  </div>
                  <div className={styles["to"]}>
                    <div className={styles["avatar"]}>
                      <h3>{c}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className={styles.description}>No results</p>
          )}
        </div>
      </main>
    </Layout>
  );
}
