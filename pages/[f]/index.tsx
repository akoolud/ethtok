import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Layout } from "../../components/Layout";
import { Title } from "../../components/Title";
import styles from "../../styles/Home.module.scss";
import { GetDateString } from "../../util/date";
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
          <div>
            {info.latestMessage ? GetDateString(info.latestMessage) : "---"}
          </div>
        </div>
      </div>
      <div className={styles["tx-info-row"]}>
        <div className={styles["tx-info-item"]}>
          <div>Total Transactions</div>
          <div>{info.total || "---"}</div>
        </div>
        <div className={styles["tx-info-item"]}>
          <div>Latest Transaction</div>
          <div>{info.latestTX ? GetDateString(info.latestTX) : "---"}</div>
        </div>
      </div>
    </div>
  );
};
export default function ConversatioPage() {
  const router = useRouter();
  const { f } = router.query;
  const from = f?.toString();
  const [convosLoading, convosErr, convos, txInfo] =
    useGetConversationList(from);
  const [val, setval] = React.useState("");

  const onEnter = (e) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };
  const onSubmit = () => {
    router.push("/" + val);
  };
  return (
    <Layout>
      <main>
        <Title />
        <div className={styles.search}>
          <input
            value={val}
            onChange={(e) => setval(e.target.value)}
            onKeyDown={onEnter}
          />
          <button onClick={onSubmit}>
            <img src="/assets/img/search.png" alt="" />
          </button>
        </div>
        <div className={styles["card-container"]}>
          {f !== undefined && convosErr && <p className="error">{convosErr}</p>}
          {convosLoading ? (
            <p>
              Loading Conversations For <a>{from}</a>
            </p>
          ) : Object.keys(convos).length ? (
            <div>
              <TxInfoForAddress info={txInfo} />
              {Object.keys(convos).map((c, i) => (
                <Link
                  key={"card" + i}
                  className={styles["convo"]}
                  href={"/" + from + "/" + c}
                >
                  <div className={styles["from"]}>
                    <div className={styles["avatar"]}>
                      <h3>{from}</h3>
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
            f !== undefined && <p className={styles.description}>No results</p>
          )}
        </div>
      </main>
    </Layout>
  );
}
