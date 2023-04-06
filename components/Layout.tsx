import Head from "next/head";
import Link from "next/link";
import React from "react";
import styles from "../styles/Home.module.scss";
import { useGetLatest } from "../util/tx";

export const Layout = ({ children }: { children: React.ReactNode }) => {
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

      {children}
      <style jsx>{``}</style>

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
        .container {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        main {
          max-width: 69rem;
          width: 100%;
          padding: 1rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  );
};