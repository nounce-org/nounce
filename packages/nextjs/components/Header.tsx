import React, { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { SwitchTheme } from "~~/components/SwitchTheme";
import { FaucetButton, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import Logo from "~~/components/ui/Logo";
import { useOutsideClick } from "~~/hooks/scaffold-eth";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <Link
      href={href}
      passHref
      className={`${
        isActive ? "font-extrabold border-b-4" : ""
      } rounded-none gap-6 grid grid-flow-col text-lg font-semibold`}
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
        <NavLink href="/posts">POSTS</NavLink>
      </li>
      <li>
        <NavLink href="/info">INFO</NavLink>
      </li>
      <li>
        <NavLink href="/announcements">SETTINGS</NavLink>
      </li>
      {/* <li>
        <NavLink href="/storage">
          Store
        </NavLink>
      </li>
      <li>
        <NavLink href="/debug">
          <BugAntIcon className="h-4 w-4" />C
        </NavLink>
      </li>
      <li>
        <NavLink href="/example-ui">
          <SparklesIcon className="h-4 w-4" />
          UI
        </NavLink>
      </li>
      <li>
        <NavLink href="/blockexplorer">
          <MagnifyingGlassIcon className="h-4 w-4" />
          Ex
        </NavLink>
      </li> */}
    </>
  );

  return (
    <div className="w-full">
      <div className="sticky navbar align-items-normal bg-base-100 p-0 h-14 m-0">
        <div className="navbar-start">
          <div className="lg:hidden dropdown" ref={burgerMenuRef}>
            <label
              tabIndex={0}
              className={`ml-1 btn btn-square btn-primary rounded-0 ${
                isDrawerOpen ? "hover:bg-secondary" : "hover:bg-transparent"
              }`}
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
          <Link href="/" passHref className="hidden md:block items-center gap-2 shrink-0 bg-base-300 w-14 h-14 mr-12">
            <div className="flex relative w-8 h-8 m-3">
              <Logo format="logo" className="w-8 h-8 fill-current" />
            </div>
            <div className="flex flex-col">
              {/* <span className="font-bold text-xl leading-tight">Nounce</span> */}
              {/* <span className="text-xs">Ethereum dev stack</span> */}
            </div>
          </Link>
          <ul className="hidden lg:flex lg:flex-nowrap menu menu-horizontal h-14  gap-2">{navLinks}</ul>
        </div>
        <div className="navbar-end">
          <SwitchTheme className="pointer-events-auto" />
          <RainbowKitCustomConnectButton />
          <FaucetButton />
        </div>
      </div>
    </div>
  );
};
