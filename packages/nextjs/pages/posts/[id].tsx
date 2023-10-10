import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import FormLoader from "~~/components/posts/typeForm/FormLoader";
import Uploader from "~~/components/posts/typeForm/Uploader";
import Steps from "~~/components/ui/Steps";
import { postTable } from "~~/database/database.config";
import { IPost, PostState, PostType } from "~~/database/types";
import { useTypedDataSignature } from "~~/hooks/nounce/useTypedDataSignature";
import { useWeb3Storage } from "~~/hooks/nounce/useWeb3Storage";
import { generateHash, shortenHash } from "~~/utils/nounce/utils";

const Post = () => {
  const defaultPost: IPost = {
    title: "",
    state: PostState.DRAFT,
    type: PostType.ARTICLE,
  };

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
          setPost({
            ...post,
            state: PostState.UPLOADED,
            url: newCid,
          });
          handleSave();
          signTypedData();
          // Here you can do whatever you want after the upload completes
        } catch (error) {
          console.error("Error during upload:", error);
        }
    }
  };

  const { signTypedData } = useTypedDataSignature({
    post: post || defaultPost, // Replace with your actual post data
    onSuccess: data => {
      if (post) {
        post.signature = data;
        post.state = PostState.SIGNED;
        handleSave();
      }
    },
  });

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

  // useEffect(() => {
  //   const autosaveInterval = setInterval(() => {
  //     if (didChange) {
  //       handleSave();
  //       setDidChange(false);
  //     }
  //   }, 1000);

  //   return () => clearInterval(autosaveInterval);
  // }, [didChange, handleSave]);

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
            <div>hash: {shortenHash(post.contentHash)}</div>
            <button className="btn bg-base-100 border-0 rounded-none w-full" type="submit" onClick={upload}>
              Upload and sign
            </button>
            {post ? <button onClick={() => signTypedData()}>Sign Data</button> : ""}
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
