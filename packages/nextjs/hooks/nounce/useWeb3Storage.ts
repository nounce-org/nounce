import { useState } from "react";
import { File } from "web3.storage";
import { Web3Storage } from "web3.storage";

export function useWeb3Storage() {
  const [cid, setCid] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<Error | null>(null);

  function getAccessToken(): string {
    return process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN || "";
  }

  function makeStorageClient() {
    return new Web3Storage({ token: getAccessToken() });
  }

  async function storeContent(content: string | Buffer, filename = "data", type = "text/plain") {
    setIsLoading(true);
    const file = new File([content], filename, { type });

    try {
      const newCid = await storeWithProgress([file]);
      setCid(newCid);
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error("An unknown error occurred."));
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function storeWithProgress(files: File[]) {
    const onRootCidReady = (cid: string) => {
      console.log("uploading files with cid:", cid);
    };

    const totalSize = files.map(f => f.size).reduce((a, b) => a + b, 0);
    let uploaded = 0;

    const onStoredChunk = (size: number) => {
      uploaded += size;
      const pct = Math.floor(100 * (uploaded / totalSize));
      setProgress(pct);
      console.log(`Uploading... ${pct}% complete`);
    };

    const client = makeStorageClient();
    return client.put(files, { onRootCidReady, onStoredChunk, wrapWithDirectory: false });
  }

  return { cid, storeContent, isLoading, progress, error };
}
