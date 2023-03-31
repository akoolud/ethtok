import React from "react";
import { CheckIfMakesSense } from "./sense";
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

export const useGetConversationList = (
  address: string
): [boolean, string, any] => {
  const [loading, setloading] = React.useState(false);
  const [err, seterr] = React.useState("");
  const [convos, setconvos] = React.useState({});

  React.useMemo(async () => {
    if (!address && address.length < 2) {
      setloading(false);
      seterr("Address is required.");
      setconvos({});
      return;
    }
    setloading(true);
    seterr("");
    setconvos({});
    try {
      const txData = await getTransactions(address);
      let convos = txData.result.map((i) => {
        let d = Buffer.from(i.input.substring(2), "hex").toString();
        return CheckIfMakesSense(d) ? { d: d, from: i.from, to: i.to } : "";
      });
      convos = convos.filter((i) => i && i.d.length);
      let uconvos = convos.filter(
        (x, i, a) => a.findIndex((y) => x.to == y.to) === i
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
    } catch (err) {
      setloading(false);
      seterr(err.toString());
      setconvos({});
    }
  }, [address]);

  return [loading, err, convos];
};
