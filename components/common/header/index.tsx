'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { SettingsQueryResult } from '@/sanity.types'
import FacebookIcon from '@/icons/facebookIcon'
import InstagramIcon from '@/icons/instagramIcon'
import SearchDialog from './searchDialog'
import Logo from '@/icons/logo'

function Hamburger({ open, onClick }: { open: boolean; onClick: () => void }) {
  const bar = open ? 'bg-white' : 'bg-gunmetal-black'
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative h-[22px] w-[22px] shrink-0 cursor-pointer border-0 bg-transparent p-0"
      aria-label={open ? 'Close menu' : 'Open menu'}
      aria-expanded={open}
    >
      <span
        className={cn(
          'absolute left-0 top-1/2 block h-px w-[22px] transition-all duration-300',
          bar,
          open ? '-translate-y-1/2 rotate-[-45deg]' : '-translate-y-[9px]'
        )}
      />
      <span
        className={cn(
          'absolute left-0 top-1/2 block h-px w-[22px] -translate-y-1/2 transition-all duration-300',
          bar,
          open && 'opacity-0'
        )}
      />
      <span
        className={cn(
          'absolute left-0 top-1/2 block h-px w-[22px] transition-all duration-300',
          bar,
          open ? '-translate-y-1/2 rotate-45' : 'translate-y-[9px]'
        )}
      />
    </button>
  )
}

export function Header({ data }: { data: NonNullable<SettingsQueryResult> }) {
  const HEADER_DURATION = 500;
  const ITEM_DURATION = 500;

  const [headerOpen, setHeaderOpen] = useState(false);
  const [showItems, setShowItems] = useState(false);

  const openMenu = () => {
    setHeaderOpen(true);

    setTimeout(() => {
      setShowItems(true);
    }, HEADER_DURATION);
  };

  const closeMenu = () => {
    setShowItems(false);

    setTimeout(() => {
      setHeaderOpen(false);
    }, ITEM_DURATION);
  };

  const toggleMenu = () => {
    if (headerOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  const [screenSize, setScreenSize] = useState<number>(0)

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => removeEventListener("resize", handleResize);
  }, []);

  const isMobile = screenSize <= 768;

  return (
    <>
      <header
        className={cn(
          "fixed left-0 top-0 z-[999] w-full overflow-hidden pt-[15px] transition-all duration-500 md:pt-5",
          headerOpen
            ? "h-screen bg-deep-bright-red"
            : "h-[73.64px] bg-white md:h-[98.19px]"
        )}
      >
        <div className="max-content-pannel py-0!">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              onClick={closeMenu}
              className="relative block h-[43.64px] w-auto md:h-[58.19px] md:w-auto"
            >
              <Logo
                className={cn(
                  "h-full w-auto object-contain duration-300",
                  headerOpen && "text-white"
                )}
              />
            </Link>
            <div className="hidden lg:flex pr-[96px] gap-2 items-center">
              <Link
                href={data.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0"
              >
                <FacebookIcon
                  className={cn("size-5 duration-300", headerOpen ? "text-white" : "text-primary")}
                />
              </Link>
              <Link
                href={data.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0"
              >
                <InstagramIcon
                  className={cn("size-5 duration-300", headerOpen ? "text-white" : "text-primary")}
                />
              </Link>
            </div>
            <div className="flex items-center gap-6">
              <SearchDialog
                tags={data.blogTags}
                blogs={data.blogs}
                menuOpen={headerOpen}
                setMenuOpen={setHeaderOpen}
                isMobile={isMobile}
              />
              <Hamburger
                open={headerOpen}
                onClick={toggleMenu}
              />
            </div>
          </div>
        </div>
        <div
          className={cn(
            "relative z-[-1] w-full  transition-opacity duration-300",
            headerOpen
              ? "opacity-100 h-[calc(100vh-73.64px)] p-4 overflow-y-auto md:h-[calc(100vh-98.19px)]"
              : "opacity-0 overflow-hidden"
          )}
        >
          <ul className={cn("absolute left-1/2 top-1/2 m-0 -translate-x-1/2 -translate-y-1/2 list-none flex flex-col justify-start gap-4 lg:gap-6 my-4")}>
            {data.headerLinks.map((link, index) => (
              <li
                key={link._key}
                className={cn(
                  index === 0 ? "mt-4 lg:mt-6 xl:mt-0" : "",
                  "transition-all duration-500",
                  showItems
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                )}
                style={{
                  transitionDelay: showItems
                    ? `${index * 120}ms`
                    : `${(data.headerLinks.length - index - 1) * 120}ms`,
                }}
              >
                <Link
                  href={link.url}
                  target={link.openInNewTab ? "_blank" : "_self"}
                  onClick={closeMenu}
                  className="block text-center text-[20px] font-bold text-white md:text-[36px]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </header>
    </>
  )
}
