import React from "react";
import { signTypedData } from "@wagmi/core";
import { parseEther } from "viem";
import { MetaHeader } from "~~/components/MetaHeader";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { domain, types } from "~~/types/schema";

const ExampleUI = () => {
  const message = {
    context: "https://schema.org",
    type: "NewsArticle",
    headline: "Title of a News Article",
    url: "abc",
    image: [
      "https://example.com/photos/1x1/photo.jpg",
      "https://example.com/photos/4x3/photo.jpg",
      "https://example.com/photos/16x9/photo.jpg",
    ],
    datePublished: "2015-02-05T08:00:00+08:00",
    dateModified: "2015-02-05T09:20:00+08:00",
    author: [
      {
        type: "Person",
        name: "Jane Doe",
        url: "https://example.com/profile/janedoe123",
      },
      {
        type: "Person",
        name: "John Doe",
        url: "https://example.com/profile/johndoe123",
      },
    ],
  } as const;

  async function getSign() {
    try {
      const sign = await signTypedData({
        domain,
        message,
        primaryType: "NewsArticle",
        types,
      });
      console.log(sign);
    } catch (error) {
      console.error("Failed to get signature:", error);
    }
  }

  const { writeAsync } = useScaffoldContractWrite({
    contractName: "Announcer",
    functionName: "announce",
    value: parseEther("0.00"),
    args: [
      "0x98f9ad2147061b681d7c9a3b38177d2075162e4cd46c86f349406540e48711ef43bdc74972da51f1af3085b1defc8940186e76c4bdfbd1071dfd2ab47c9e6dfa1c" as `0x${string}`,
      JSON.stringify(message),
    ],
    blockConfirmations: 1,
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const publish = async () => {
    try {
      await writeAsync();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <MetaHeader
        title="Example UI | Scaffold-ETH 2"
        description="Example UI created with 🏗 Scaffold-ETH 2, showcasing some of its features."
      >
        {/* We are importing the font this way to lighten the size of SE2. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </MetaHeader>
      <div className="grid lg:grid-cols-2 flex-grow" data-theme="exampleUi">
        <button onClick={getSign}>Sign</button>
        <button onClick={publish}>Post</button>
      </div>
    </>
  );
};

export default ExampleUI;
