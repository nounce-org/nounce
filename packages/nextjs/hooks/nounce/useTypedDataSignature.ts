import { useSignTypedData } from "wagmi";
import { IPost } from "~~/database/types";

interface UseTypedDataSignatureProps {
  post: IPost;
  onSuccess: (data: any) => void;
}

export function useTypedDataSignature({ post, onSuccess }: UseTypedDataSignatureProps) {
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

  const message = {
    title: post.title,
    description: post.description || "",
    url: post.url || "",
    contentHash: post.contentHash as `0x${string}`,
    dataType: post.type,
  } as const;

  const { signTypedData } = useSignTypedData({
    domain,
    message,
    primaryType: "Data",
    types,
    onSuccess,
  });

  return { signTypedData };
}
