export const Title = () => {
  return (
    <h1
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      Welcome to
      <a
        href="/"
        style={{
          display: "flex",
          alignItems: "center",
          fontWeight: 900,
          color: "cornflowerblue",
          height: "3rem",
        }}
      >
        <img
          width={28}
          height={28}
          src="/assets/img/ethtok.png"
          alt="EthTok ethereum chats"
        />
        EthTok
      </a>
    </h1>
  );
};
