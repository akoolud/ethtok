import { useRouter } from "next/router";
import React from "react";
import styles from "../styles/Home.module.scss";

export const SearchBar = ({ defaultVal }: { defaultVal?: string }) => {
  const [val, setval] = React.useState(defaultVal || "");
  const router = useRouter();
  const onSubmit = () => {
    router.push("/" + val);
  };
  const onEnter = (e) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };
  return (
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
  );
};
