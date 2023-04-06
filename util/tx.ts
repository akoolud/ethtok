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
      address: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
      name: "Vitalik Buterin",
    },
    {
      address: "0xb66cd966670d962c227b3eaba30a872dbfb995db",
      name: "EULER Exploiter",
    },
    {
      address: "0x9d727911b54c455b0071a7b682fcf4bc444b5596",
      name: "ZachXBT",
    },
    {
      address: "0x098b716b8aaf21512996dc57eb0615e2383e2f96",
      name: "Ronin Bridge Exploiter",
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
      const txData = await getTransactions(address);
      // const txData = Fake;
      let total = txData.result?.length || 0;
      let convos = __GetReadable__(txData.result);
      convos = convos.filter((i) => i && i.d.length);
      let totalW = convos.length || 0;
      let uconvosAdress = __GetUnique__(convos, address);
      let groupedConvos = uconvosAdress.reduce((arr, uc) => {
        (arr[uc] = arr[uc] || []).push(__Filter__(convos, uc, address).length);
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
      const txData = await getTransactions(address);
      // const txData = Fake;
      let total = txData.result?.length || 0;
      let convos = __GetReadable__(txData.result, other);
      convos = convos.filter((i) => i && i.d.length);
      let msg = __Filter__(convos, other, address);

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
  }, [address, other]);

  return [loading, err, msg];
};

const __GetReadable__ = (list: any[], other?: string) => {
  return list.map((i) => {
    let d = Buffer.from(i.input.substring(2), "hex").toString();
    return CheckIfMakesSense(d) &&
      (other ? i.to === other || i.from === other : true)
      ? { d: d, from: i.from, to: i.to, timeStamp: i.timeStamp }
      : null;
  });
};

const __GetUnique__ = (list: any[], address: string) => {
  return list
    .reduce((s, i) => [...s, i.to, i.from], [])
    .filter((x, i, a) => a.indexOf(x) === i);
};

const __Filter__ = (list: any[], uc: string, address: string) => {
  return list.filter(
    (i) =>
      (i.to !== address && i.to === uc) ||
      (i.from !== address && i.from === uc) ||
      (i.to === address && i.from === address)
  );
};
