// import { useEffect, useState } from "react";
// import { MilkdownProvider } from "@milkdown/react";
import React, { useState } from "react";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import ArticleForm from "~~/components/editor/ArticleForm";
import EventForm from "~~/components/editor/EventForm";

const Editor: NextPage = () => {
  const [activeTab, setActiveTab] = useState<"article" | "event" | "media" | null>("article");
  const [metadata, setMetadata] = useState({ title: "", description: "" });
  const [formData, setFormData] = useState({});

  const handleSubmit = () => {
    const payload = {
      type: activeTab,
      metadata: metadata,
      data: formData,
    };

    console.log(payload);
  };

  return (
    <>
      <MetaHeader title="Create announcement" description="Editor for web3 announcement">
        {/* We are importing the font this way to lighten the size of SE2. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </MetaHeader>
      <div className="container mx-auto flex flex-col md:flex-row">
        <div className="md:basis-2/3">
          <div className="card w-full bg-base-100">
            <div className="card-body">
              <h2 className="card-title">Announcement</h2>
              <div className="tabs tabs-boxed">
                <a
                  className={`tab ${activeTab === "article" ? "tab-active" : ""}`}
                  onClick={() => setActiveTab("article")}
                >
                  Article
                </a>
                <a className={`tab ${activeTab === "event" ? "tab-active" : ""}`} onClick={() => setActiveTab("event")}>
                  Event
                </a>
                <a className={`tab ${activeTab === "media" ? "tab-active" : ""}`} onClick={() => setActiveTab("media")}>
                  Media
                </a>
              </div>

              {activeTab === "article" && <ArticleForm onChange={data => setFormData(data)} />}
              {activeTab === "event" && <EventForm onChange={data => setFormData(data)} />}
              {activeTab === "media" && <div>Media Form (You can replace this with your Media form component)</div>}
            </div>
          </div>
        </div>
        <div className="md:basis-1/3">
          <div className="card w-full bg-base-100">
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
                ></textarea>
              </div>

              <button className="btn btn-primary" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Editor;
