import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { parseEther } from "viem";
import FormLoader from "~~/components/posts/typeForm/FormLoader";
import Uploader from "~~/components/posts/typeForm/Uploader";
import Steps from "~~/components/ui/Steps";
import { postTable } from "~~/database/database.config";
import { IPost, PostState } from "~~/database/types";
import { useTypedDataSignature } from "~~/hooks/nounce/useTypedDataSignature";
import { useWeb3Storage } from "~~/hooks/nounce/useWeb3Storage";
// import { usePublishPost } from "~~/hooks/nounce/usePublishPost";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { generateHash, shortenHash } from "~~/utils/nounce/utils";

const Post = () => {
  // const defaultPost: IPost = {
  //   title: "",
  //   state: PostState.DRAFT,
  //   type: PostType.ARTICLE,
  // };

  const router = useRouter();
  const { id } = router.query;
  const { storeFiles } = useWeb3Storage();

  const [post, setPost] = useState<IPost | null>(null);
  const [didChange, setDidChange] = useState(false);

  const getStepNumber = (state: PostState) => {
    const orderOfStates: PostState[] = [
      PostState.DRAFT,
      PostState.FINALIZED,
      PostState.UPLOADED,
      PostState.SIGNED,
      PostState.PUBLISHED,
    ];

    return orderOfStates.indexOf(state) + 1;
  };

  const upload = async () => {
    if (post) {
      setPost({
        ...post,
        state: PostState.FINALIZED,
      });
      setDidChange(true);
      if (post.content)
        try {
          const newCid = await storeFiles(post.content, "document.md", "text/markdown");
          console.log("CID available:", newCid);

          if (post) {
            post.url = newCid;
            post.state = PostState.UPLOADED;
            setPost({
              ...post,
              state: PostState.UPLOADED,
            });
            console.log("setPost", post, newCid);
            setDidChange(true);
            await handleSave();
            console.log("saved", post);
            signData();
            //signData
          }
          // Here you can do whatever you want after the upload completes
        } catch (error) {
          console.error("Error during upload:", error);
        }
    }
  };

  const signData = async () => {
    if (post) {
      const signature = await getSignature(post);
      if (post && signature) {
        post.signature = signature;
        post.state = PostState.SIGNED;
        setPost({
          ...post,
          state: PostState.SIGNED,
        });
        setDidChange(true);
        handleSave();
      }
    }
  };

  // const domain = {
  //   name: "Your App Name",
  //   version: "1",
  //   chainId: 31337, // Change this if you're on a different chain
  //   verifyingContract: "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC",
  // } as const;

  // const types = {
  //   Data: [
  //     { name: "title", type: "string" },
  //     { name: "description", type: "string" },
  //     { name: "url", type: "string" },
  //     { name: "contentHash", type: "string" },
  //     { name: "dataType", type: "string" },
  //   ],
  // } as const;

  const message = {
    title: post?.title || "",
    description: post?.description || "",
    url: post?.url || "",
    contentHash: (post?.contentHash as `0x${string}`) || "", // handle null case
    dataType: post?.title || "article", // handle null case, you can provide a default value like "article" here
  } as const;

  const { writeAsync } = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "announce",
    value: parseEther("0.00"),
    args: [post?.signature as `0x${string}`, message],
    blockConfirmations: 1,
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const publish = async () => {
    if (post) {
      try {
        await writeAsync();
        post.state = PostState.PUBLISHED;
        setPost({
          ...post,
          state: PostState.PUBLISHED,
        });
        setDidChange(true);
        handleSave();
      } catch (error) {
        console.log(error);
      }
      // const r = await getPublish(post);
    }
  };

  const { getSignature } = useTypedDataSignature();

  // const { signTypedData } = useTypedDataSignature({
  //   post: post || defaultPost, // Replace with your actual post data
  //   onSuccess: data => {
  //     if (post) {
  //       post.signature = data;
  //       post.state = PostState.SIGNED;
  //       // setDidChange(true);
  //       handleSave();
  //     }
  //   },
  // });

  const handleFormUpdate = (updatedData: string) => {
    if (post) {
      setPost({
        ...post,
        content: updatedData,
        updatedAt: new Date(),
        hashContent: true,
        contentHash: generateHash(post.content),
      });
      setDidChange(true);
    }
    console.log(updatedData);
  };

  const handleSave = async () => {
    if (post) {
      console.log(post);
      try {
        await postTable.put(post);
        setDidChange(false);
      } catch (error) {
        console.error("Error updating post in IndexedDB:", error);
      }
    }
  };

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const postData = await postTable.get(Number(id));
          setPost(postData);
        } catch (error) {
          console.error("Error fetching post:", error);
        }
      })();
    }
  }, [id]);

  useEffect(() => {
    const autosaveInterval = setInterval(() => {
      if (didChange) {
        handleSave();
        setDidChange(false);
      }
    }, 1000);

    return () => clearInterval(autosaveInterval);
  }, [didChange, handleSave]);

  // If post data hasn't been fetched yet, display a loading message
  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="font-serif text-5xl font-bold pb-6">{post.title}</h2>
      <div className="flex flex-col md:flex-row gap-12">
        <div className="basis-2/3">
          <div className="overflow-x-auto">
            {post && post.state === PostState.DRAFT && <FormLoader post={post} onContentChange={handleFormUpdate} />}
            {post && post.state !== PostState.DRAFT && <Uploader post={post} onContentChange={handleFormUpdate} />}

            <div className="p-3  rounded-none float-right flex flex-row gap-2 items-center	">
              Autosave{" "}
              <span
                className={`w-4 h-4 rounded-full ${didChange ? "bg-orange-200 animate-pulse" : "bg-green-200"}`}
              ></span>
            </div>
          </div>
        </div>
        <div className="basis-1/3">
          {/* <PostForm /> */}
          <div className="flex flex-col  bg-base-100 border-r-4 border-b-4 border-base-200 h-fit">
            <div>title: {post.title}</div>
            <div>description: {post.description}</div>
            <div>type: {post.type}</div>
            {post.contentHash ? <div>hash: {shortenHash(post.contentHash)}</div> : ""}
            {post.url ? <div>url: {shortenHash(post.url)}</div> : ""}

            {post.signature ? <div>signature: {shortenHash(post.signature)}</div> : ""}
            {post.state === PostState.DRAFT ? (
              <button className="btn bg-base-100 border-0 rounded-none w-full" onClick={upload}>
                Upload
              </button>
            ) : (
              ""
            )}

            {post.state === PostState.UPLOADED ? (
              <button className="btn bg-base-100 border-0 rounded-none w-full" onClick={signData}>
                Sign Data
              </button>
            ) : (
              ""
            )}

            {post.state === PostState.SIGNED ? (
              <button className="btn bg-base-100 border-0 rounded-none w-full" onClick={publish}>
                Publish
              </button>
            ) : (
              ""
            )}
          </div>

          <div className="pt-6 ">
            <h2 className="sr-only">Steps</h2>
            <div>
              <Steps steps={["Write", "Upload", "Sign", "Publish"]} currentStep={getStepNumber(post.state)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
