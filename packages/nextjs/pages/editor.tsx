// import { useEffect, useState } from "react";
// import { MilkdownProvider } from "@milkdown/react";
import React, { useState } from "react";
import type { NextPage } from "next";
import { keccak256, toHex } from "viem";
import { parseEther } from "viem";
import { useSignTypedData } from "wagmi";
import { MetaHeader } from "~~/components/MetaHeader";
import ArticleForm from "~~/components/editor/ArticleForm";
import EventForm from "~~/components/editor/EventForm";
import MediaForm from "~~/components/editor/MediaForm";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const Editor: NextPage = () => {
  const [activeTab, setActiveTab] = useState<"article" | "event" | "media" | null>("article");
  const [metadata, setMetadata] = useState({ title: "", description: "" });
  const [formData, setFormData] = useState({});
  const [contentHash, setContentHash] = useState<string | null>(null);

  const [isSigned, setIsSigned] = useState(false);
  const [signature, setSignature] = useState<string | null>(null);

  const resetData = () => {
    setFormData({});
    setContentHash(null);
    console.log(formData);
  };

  function shortenHash(hash: string | null): string {
    if (!hash || hash.length <= 8) return hash || ""; // return original if it's short enough or empty if null
    return `${hash.substr(0, 4)}..${hash.substr(-4)}`;
  }

  const domain = {
    name: "Your App Name",
    version: "1",
    chainId: 31337, // Change this if you're on a different chain
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
    title: metadata.title,
    description: metadata.description,
    url: "ipfs::0x123",
    contentHash: (contentHash as `0x${string}`) || "", // handle null case
    dataType: activeTab || "article", // handle null case, you can provide a default value like "article" here
  } as const;

  // if (signature) {
  // const { writeAsync, isLoading: isWritingLoading } = useScaffoldContractWrite({
  //   contractName: "YourContract",
  //   functionName: "announce",
  //   value: "0.00",
  //   args: [signature as `0x${string}`, message],
  //   onBlockConfirmation: txnReceipt => {
  //     console.log("📦 Transaction blockHash", txnReceipt.blockHash);
  //   },
  // });

  const { writeAsync } = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "announce",
    value: parseEther("0.00"),
    args: [signature as `0x${string}`, message],
    // For payable functions, expressed in ETH
    // The number of block confirmations to wait for before considering transaction to be confirmed (default : 1).
    blockConfirmations: 1,
    // The callback function to execute when the transaction is confirmed.
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });
  // }

  const { signTypedData } = useSignTypedData({
    domain,
    message,
    primaryType: "Data",
    types,

    onSuccess(data) {
      setSignature(data);
      setIsSigned(true);
      console.log("Success", data);
    },
  });

  // string title;         // URL of the content with protocol
  // string description;         // URL of the content with protocol
  // string url;         // URL of the content with protocol
  // bytes32 contentHash;     // Hash of the content
  // string dataType;    // Type of data (text, event, media, etc.)

  return (
    <>
      <MetaHeader title="Create announcement" description="Editor for web3 announcement">
        {/* We are importing the font this way to lighten the size of SE2. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </MetaHeader>

      <div className="flex flex-col md:flex-row gap-6 w-full px-6">
        <div className="md:basis-2/3 flex flex-col gap-6">
          <div className="join w-full rounded-3xl bg-base-100 shadow-none">
            <input
              className="join-item btn grow bg-base-100 shadow-none"
              type="radio"
              name="options"
              aria-label="Article"
              checked={activeTab === "article"}
              onChange={() => {
                resetData();
                setActiveTab("article");
              }}
            />
            <input
              className="join-item btn grow bg-base-100 shadow-none"
              type="radio"
              name="options"
              aria-label="Event"
              checked={activeTab === "event"}
              onChange={() => {
                resetData();
                setActiveTab("event");
              }}
            />
            <input
              className="join-item btn grow bg-base-100 shadow-none"
              type="radio"
              name="options"
              aria-label="Media"
              checked={activeTab === "media"}
              onChange={() => {
                resetData();
                setActiveTab("media");
              }}
            />
          </div>

          <div className="card w-full bg-base-100 rounded-3xl">
            <div className="card-body">
              {activeTab === "article" && (
                <ArticleForm
                  disabled={isSigned}
                  onChange={data => {
                    setFormData(data);
                    if (data.content) {
                      const hash = keccak256(toHex(data.content));
                      setContentHash(hash);
                    }
                  }}
                />
              )}
              {activeTab === "event" && <EventForm onChange={data => setFormData(data)} />}
              {activeTab === "media" && <MediaForm onChange={data => setFormData(data)} />}

              <div className="w-full text-right text-sm">Hash: {shortenHash(contentHash)}</div>
            </div>
          </div>
        </div>

        <div className="md:basis-1/3">
          <div className="card w-full bg-base-100 rounded-3xl">
            <div className="card-body">
              <h2 className="card-title">Information</h2>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                  onChange={e => setMetadata(prev => ({ ...prev, title: e.target.value }))}
                  disabled={isSigned}
                />
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  className="textarea textarea-bordered w-full"
                  placeholder="Type here"
                  onChange={e => setMetadata(prev => ({ ...prev, description: e.target.value }))}
                  disabled={isSigned}
                ></textarea>
              </div>

              {isSigned ? (
                <>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Hash</span>
                    </label>
                    <input
                      type="text"
                      className="input input-bordered w-full"
                      value={contentHash || ""}
                      disabled={true}
                    />
                  </div>

                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Signature</span>
                    </label>
                    <input
                      type="text"
                      className="input input-bordered w-full"
                      value={signature || ""}
                      disabled={true}
                    />
                  </div>
                  <button className="btn btn-primary" onClick={() => writeAsync()}>
                    Publish
                  </button>
                </>
              ) : (
                <button className="btn btn-primary" onClick={() => signTypedData()}>
                  Sign
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Editor;
