import React from "react";
import { ethers } from "ethers";
export const useGetEns = (address: string) => {
  const [loading, setloading] = React.useState(false);
  const [err, seterr] = React.useState("");
  const [name, setname] = React.useState("");
  const [avatar, setavatar] = React.useState("");
  React.useMemo(async () => {
    setloading(true);
    if (address && ethers.utils.isAddress(address)) {
      try {
        const provider = ethers.providers.getDefaultProvider();
        let ensName = await provider.lookupAddress(address);
        const resolver = ensName ? await provider.getResolver(ensName) : null;
        // let avatar = resolver ? await resolver.getAvatar() : null;
        setname(ensName);
        // setavatar(avatar.url);
      } finally {
        setloading(false);
      }
    }
  }, [address]);

  return [loading, err, name];
};
