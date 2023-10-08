import { HeartIcon } from "@heroicons/react/24/outline";
import Logo from "~~/components/ui/Logo";

/**
 * Site footer
 */
export const Footer = () => {
  return (
    <div className="min-h-0 py-5 px-1 mb-11 lg:mb-0">
      <div className="w-full">
        <ul className="menu menu-horizontal w-full">
          <div className="flex justify-center items-center gap-2 text-sm w-full">
            <div className="flex justify-center items-center gap-2">
              <Logo format="logo" className="w-4 h-4 fill-current" />
              <p className="m-0 text-center">
                Built with <HeartIcon className="inline-block h-4 w-4" /> by
              </p>
              <a
                className="flex justify-center items-center gap-1"
                href="https://md.codes/"
                target="_blank"
                rel="noreferrer"
              >
                <span className="underline underline-offset-2">MD</span>
              </a>
              <p className="m-0 text-center">for</p>
              <a
                className="flex justify-center items-center gap-1"
                href="https://ethglobal.com/showcase/nounce-9sk09"
                target="_blank"
                rel="noreferrer"
              >
                <span className="underline underline-offset-2">EthGlobal</span>
              </a>
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
};
