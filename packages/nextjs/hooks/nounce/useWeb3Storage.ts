import { File } from "web3.storage";
import { Web3Storage } from "web3.storage";

export function useWeb3Storage() {
  function getAccessToken(): string {
    return process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN || "";
  }

  function makeStorageClient() {
    return new Web3Storage({ token: getAccessToken() });
  }

  async function storeFiles(content: string | Buffer, filename = "data", type = "text/plain"): Promise<string> {
    try {
      const client = makeStorageClient();
      const file = new File([content], filename, { type });
      const filesArray: File[] = [file];
      const resultCid = await client.put(filesArray, { wrapWithDirectory: false });
      return resultCid;
    } catch (err) {
      throw err;
    }
  }

  return { storeFiles };
}
