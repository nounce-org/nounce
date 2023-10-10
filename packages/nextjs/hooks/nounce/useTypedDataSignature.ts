import { useCallback } from "react";
import { signTypedData } from "@wagmi/core";
import { IPost } from "~~/database/types";

export function useTypedDataSignature() {
  const domain = {
    name: "Nounce",
    version: "1",
    chainId: 31337,
    verifyingContract: "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC",
  } as const;

  const types = {
    Data: [
      { name: "title", type: "string" },
      { name: "description", type: "string" },
      { name: "url", type: "string" },
      { name: "contentHash", type: "string" },
      { name: "dataType", type: "string" },
    ],
  } as const;

  const getSignature = useCallback(async (post: IPost): Promise<string | null> => {
    const message = {
      title: post.title,
      description: post.description || "",
      url: post.url || "",
      contentHash: post.contentHash as `0x${string}`,
      dataType: post.type,
    } as const;

    try {
      const signature = await signTypedData({
        domain,
        message,
        primaryType: "Data",
        types,
      });
      return signature;
    } catch (error) {
      console.error("Failed to get signature:", error);
      return null;
    }
  }, []);

  return { getSignature };
}
