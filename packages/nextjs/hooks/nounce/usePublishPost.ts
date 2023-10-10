import { useCallback, useState } from "react";
import { parseEther } from "viem";
import { IPost } from "~~/database/types";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export function usePublishPost() {
  const [postToPublish, setPostToPublish] = useState<IPost | null>(null);

  const defaultArgs: [
    `0x${string}`,
    {
      title: string;
      description: string;
      url: string;
      contentHash: `0x${string}`;
      dataType: string;
    },
  ] = [
    (postToPublish?.signature as `0x${string}`) || "0x",
    {
      title: postToPublish?.title || "",
      description: postToPublish?.description || "",
      url: postToPublish?.url || "",
      contentHash: (postToPublish?.contentHash as `0x${string}`) || "0x",
      dataType: postToPublish?.type || "defaultType", // Replace 'defaultType' with a valid default dataType
    },
  ];

  const { writeAsync } = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "announce",
    value: parseEther("0.00"),
    args: defaultArgs,
    blockConfirmations: 1,
    onBlockConfirmation: txnReceipt => {
      return txnReceipt.blockHash;
      console.log("Transaction", txnReceipt);
    },
  });

  const getPublish = useCallback(
    async (post: IPost): Promise<string | null> => {
      try {
        setPostToPublish(post);
        const blockHash = await writeAsync();
        console.log(blockHash);
        // Assuming you want to return the transaction receipt, adjust as needed
        return "Your desired string result";
      } catch (error) {
        console.error("Failed to get signature:", error);
        return null;
      }
    },
    [writeAsync],
  );

  return { getPublish };
}
