import React, { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Bars3Icon, BugAntIcon, MagnifyingGlassIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { FaucetButton, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { useOutsideClick } from "~~/hooks/scaffold-eth";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <Link
      href={href}
      passHref
      className={`${
        isActive ? "bg-secondary shadow-md" : ""
      } hover:bg-secondary hover:shadow-md focus:!bg-secondary active:!text-neutral py-1.5 px-3 text-sm rounded-full gap-2 grid grid-flow-col`}
    >
      {children}
    </Link>
  );
};

/**
 * Site header
 */
export const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const burgerMenuRef = useRef<HTMLDivElement>(null);
  useOutsideClick(
    burgerMenuRef,
    useCallback(() => setIsDrawerOpen(false), []),
  );

  const navLinks = (
    <>
      <li>
        <NavLink href="/">Home</NavLink>
      </li>
      <li>
        <NavLink href="/editor">
          <BugAntIcon className="h-4 w-4" />
          Editor
        </NavLink>
      </li>
      <li>
        <NavLink href="/debug">
          <BugAntIcon className="h-4 w-4" />
          Contracts
        </NavLink>
      </li>
      <li>
        <NavLink href="/example-ui">
          <SparklesIcon className="h-4 w-4" />
          Example UI
        </NavLink>
      </li>
      <li>
        <NavLink href="/blockexplorer">
          <MagnifyingGlassIcon className="h-4 w-4" />
          Block Explorer
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="w-full p-6">
      <div className="sticky navbar bg-primary rounded-full">
        <div className="navbar-start">
          <div className="lg:hidden dropdown" ref={burgerMenuRef}>
            <label
              tabIndex={0}
              className={`ml-1 btn btn-ghost ${isDrawerOpen ? "hover:bg-secondary" : "hover:bg-transparent"}`}
              onClick={() => {
                setIsDrawerOpen(prevIsOpenState => !prevIsOpenState);
              }}
            >
              <Bars3Icon className="h-1/2" />
            </label>
            {isDrawerOpen && (
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                onClick={() => {
                  setIsDrawerOpen(false);
                }}
              >
                {navLinks}
              </ul>
            )}
          </div>
          <Link href="/" passHref className="hidden lg:flex items-center gap-2 ml-4 mr-6 shrink-0">
            <div className="flex relative w-24 h-10">
              <Image alt="SE2 logo" className="cursor-pointer" fill src="/logo.svg" />
            </div>
            <div className="flex flex-col">
              {/* <span className="font-bold text-xl leading-tight">Nounce</span> */}
              {/* <span className="text-xs">Ethereum dev stack</span> */}
            </div>
          </Link>
          <ul className="hidden lg:flex lg:flex-nowrap menu menu-horizontal px-1 gap-2">{navLinks}</ul>
        </div>
        <div className="navbar-end">
          <RainbowKitCustomConnectButton />
          <FaucetButton />
        </div>
      </div>
    </div>
  );
};
