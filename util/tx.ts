import React from "react";
import { CheckIfMakesSense } from "./sense";
import Fake from "./fake.json";
import { ethers } from "ethers";
const getTransactions = async (address: string) => {
  try {
    return fetch(
      "https://api.etherscan.io/api?" +
        new URLSearchParams({
          action: "txlist",
          module: "account",
          apikey: process.env.NEXT_PUBLIC_ETHERSCAN_APIKEY || "",
          address: address,
          sort: "desc",
        })
    )
      .then((response) => response.json())
      .then((res) => {
        return Promise.resolve(res);
      })
      .catch(Promise.reject);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const useGetLatest = (): [boolean, string, IHot[]] => {
  const [loading, setloading] = React.useState(false);
  const [err, seterr] = React.useState("");
  const [convos, setconvos] = React.useState([
    {
      address: "0xb66cd966670d962c227b3eaba30a872dbfb995db",
      name: "EULER Exploiter",
    },
    {
      address: "0xb66cd966670d962c227b3eaba30a872dbfb995db",
      name: "EULER Exploiter",
    },
    {
      address: "0xb66cd966670d962c227b3eaba30a872dbfb995db",
      name: "EULER Exploiter",
    },
    {
      address: "0xb66cd966670d962c227b3eaba30a872dbfb995db",
      name: "EULER Exploiter",
    },
  ]);

  return [loading, err, convos];
};
export const useGetConversationList = (
  address: string
): [boolean, string, any, IInfo] => {
  const [loading, setloading] = React.useState(false);
  const [err, seterr] = React.useState("");
  const [convos, setconvos] = React.useState({});
  const [info, setinfo] = React.useState({});

  React.useMemo(async () => {
    if (!ethers.utils.isAddress(address)) {
      setloading(false);
      seterr("Address is required.");
      setconvos({});
      setinfo({});
      return;
    }
    setloading(true);
    seterr("");
    setconvos({});
    setinfo({});
    try {
      // const txData = await getTransactions(address);
      const txData = Fake;
      let total = txData.result?.length || 0;
      let convos = txData.result.map((i) => {
        let d = Buffer.from(i.input.substring(2), "hex").toString();
        return CheckIfMakesSense(d)
          ? { d: d, from: i.from, to: i.to, timeStamp: i.timeStamp }
          : null;
      });

      convos = convos.filter((i) => i && i.d.length);
      let totalW = convos.length || 0;
      let uconvos = convos.filter(
        (x, i, a) => a.findIndex((y) => x.to === y.to) === i
      );
      let groupedConvos = uconvos.reduce((arr, uc) => {
        (arr[uc["to"]] = arr[uc["to"]] || []).push(
          convos.filter((i) => i.to === uc.to).length
        );
        return arr;
      }, {});

      setloading(false);
      seterr("");
      setconvos(groupedConvos);
      setinfo({
        total: total,
        readable: totalW,
        latestTX: (txData.result || [])[0]?.timeStamp || "---",
        latestMessage: (convos || [])[0]?.timeStamp || "---",
      });
    } catch (err) {
      setloading(false);
      seterr(err.toString());
      setconvos({});
      setinfo({});
    }
  }, [address]);

  return [loading, err, convos, info];
};

export const useGetMessageList = (
  address?: string,
  other?: string
): [boolean, string, any] => {
  const [loading, setloading] = React.useState(false);
  const [err, seterr] = React.useState("");
  const [msg, setmsg] = React.useState({});

  React.useMemo(async () => {
    if (!ethers.utils.isAddress(address) || !ethers.utils.isAddress(other)) {
      setloading(false);
      seterr("Address is required.");
      setmsg({});

      return;
    }
    setloading(true);
    seterr("");
    setmsg({});

    try {
      // const txData = await getTransactions(address);
      const txData = Fake;
      let total = txData.result?.length || 0;
      let msg = txData.result.map((i) => {
        let d = Buffer.from(i.input.substring(2), "hex").toString();
        return CheckIfMakesSense(d) && i.to === other
          ? { d: d, from: i.from, to: i.to, timeStamp: i.timeStamp }
          : null;
      });
      console.log("msg", msg);

      msg = msg.filter((i) => i && i.d.length);

      setloading(false);
      seterr("");
      setmsg({
        from: address,
        to: other,
        messages: msg,
      });
    } catch (err) {
      setloading(false);
      seterr(err.toString());
      setmsg({});
    }
  }, [address]);

  return [loading, err, msg];
};
