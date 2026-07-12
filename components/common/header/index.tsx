'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { SettingsQueryResult } from '@/sanity.types'
import FacebookIcon from '@/icons/facebookIcon'
import InstagramIcon from '@/icons/instagramIcon'
import SearchDialog from './searchDialog'
import Logo from '@/icons/logo'
import { SanityImage } from '../sanityImage'
// import type { NavItem } from '@/lib/types'

// interface HeaderProps {
//   nav: NavItem[]
//   social: { facebook: string; instagram: string }
//   copyright: string
//   parkingRateHtml?: string
//   sitemapImage: { url: string; alt?: string }
//   valetParkingValidationInstructionsUrl: string
//   validateOfficeTowerGarageParkingUrl: string
// }

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

// function ParkingModal({
//   open,
//   onClose,
//   sitemapImage,
//   parkingRateHtml,
//   valetParkingValidationInstructionsUrl,
//   validateOfficeTowerGarageParkingUrl,
// }: {
//   open: boolean
//   onClose: () => void
//   sitemapImage: { url: string; alt?: string }
//   parkingRateHtml?: string
//   valetParkingValidationInstructionsUrl: string
//   validateOfficeTowerGarageParkingUrl: string
// }) {
//   if (!open) return null

//   const btnClass =
//     'inline-block w-full cursor-pointer border-[3px] border-gray-light px-8 py-4 text-center font-bold text-primary no-underline'

//   return (
//     <div className="fixed inset-0 z-[9999] p-5">
//       <button
//         type="button"
//         className="fixed inset-0 bg-black/70"
//         onClick={onClose}
//         aria-label="Close"
//       />
//       <button
//         type="button"
//         onClick={onClose}
//         className="fixed right-2.5 top-2.5 z-[100] h-10 w-10 text-black xl:text-white"
//         aria-label="Close"
//       >
//         <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
//           <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
//         </svg>
//       </button>
//       <div className="fixed left-1/2 top-1/2 flex h-full w-full -translate-x-1/2 -translate-y-1/2 flex-wrap overflow-y-auto bg-white xl:h-[90%] xl:w-[90%] xl:justify-between">
//         <div className="order-2 w-full overflow-y-auto xl:order-1 xl:w-[66%]">
//           {sitemapImage.url && (
//             <div className="relative min-h-[240px] h-full w-full">
//               <Image
//                 src={sitemapImage.url}
//                 alt={sitemapImage.alt ?? 'McKinney and Olive'}
//                 fill
//                 className="object-cover"
//               />
//             </div>
//           )}
//         </div>
//         <div className="order-1 w-full px-5 pb-5 pt-[50px] xl:order-2 xl:w-[34%] xl:px-10 flex flex-col gap-4">
//           <h2 className="text-xl md:text-2xl text-primary">
//             PARKING AT MCKINNEY & OLIVE
//           </h2>
//           <h3 className="text-base md:text-lg text-primary">
//             Parking Validation for Tenants of McKinney & Olive
//           </h3>
//           <div className="mt-3 space-y-3">
//             <Link
//               href={VALET_PARKING_URL}
//               target="_blank"
//               rel="noopener noreferrer"
//               className={btnClass}
//             >
//               Validate Valet Parking
//             </Link>
//             <Link
//               href={valetParkingValidationInstructionsUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//               className={btnClass}
//             >
//               Valet Parking Validation Instructions
//             </Link>
//             <Link
//               href={validateOfficeTowerGarageParkingUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//               className={btnClass}
//             >
//               Validate Office Tower Garage Parking
//             </Link>
//           </div>
//           {parkingRateHtml && (
//             <div
//               className="mt-4"
//               dangerouslySetInnerHTML={{ __html: parkingRateHtml }}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

export function Header({ data }: { data: NonNullable<SettingsQueryResult> }) {
  const [menuOpen, setMenuOpen] = useState(false)
  // const [modalOpen, setModalOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

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
      {/* <ParkingModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        {...props}
      /> */}
      <header
        className={cn(
          'fixed left-0 top-0 z-[999] w-full overflow-hidden pt-[15px] transition-all duration-500 md:pt-5',
          menuOpen
            ? 'h-screen bg-deep-bright-red'
            : 'h-[73.64px] bg-white md:h-[98.19px]'
        )}
      >
        <div className="max-content-pannel py-0!">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              onClick={closeMenu}
              className="relative block h-[43.64px] w-auto md:h-[58.19px] md:w-auto"
            >
              {/* <SanityImage src={data.headerLogo} className={cn("h-full w-auto", menuOpen && "text-white")} width={1000} height={1000} /> */}
              <Logo className={cn("h-full w-auto object-contain duration-300", menuOpen && "text-white")} />
            </Link>
            <div className="hidden lg:flex pr-[96px] gap-2 items-center">
              <Link
                href={data.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0"
              >
                <FacebookIcon
                  className={cn("size-5 duration-300", menuOpen ? 'text-white' : 'text-primary')}
                />
              </Link>
              <Link
                href={data.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0"
              >
                <InstagramIcon
                  className={cn("size-5 duration-300", menuOpen ? 'text-white' : 'text-primary')}
                />
              </Link>
            </div>
            <div className="flex items-center gap-6">
              <SearchDialog blogs={data.blogs} menuOpen={menuOpen} setMenuOpen={setMenuOpen} isMobile={isMobile} />
              <Hamburger
                open={menuOpen}
                onClick={() => setMenuOpen(!menuOpen)}
              />
            </div>
          </div>
        </div>
        <div
          className={cn(
            'relative z-[-1] m-0  w-full  pt-0! p-4 transition-all duration-[1500ms]',
            menuOpen ? 'opacity-100 h-[calc(100vh-73.64px)] overflow-y-auto md:h-[calc(100vh-98.19px)]' : 'opacity-0 overflow-hidden h-0'
          )}
        >
          <ul className={cn("absolute left-1/2  top-1/2 m-0 -translate-x-1/2 -translate-y-1/2 list-none flex flex-col justify-start gap-4 lg:gap-6 my-4 duration-600", menuOpen ? "opacity-100" : "opacity-0")}>
            {data.headerLinks.map((link, index) => (
              <li
                key={link._key}
                className={cn(index === 0 ? 'mt-4 lg:mt-6 xl:mt-0' : 'mt-0')}
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
            {/* <div className="xl:hidden flex flex-col gap-4 lg:gap-6">
              <li>
                <Link
                  href={CUSTOMER_SERVICE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center text-[20px] font-bold text-white md:text-[36px]"
                >
                  Customer Service
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  className="block w-full border-0 bg-transparent p-0 text-center text-[20px] font-bold text-white md:text-[36px]"
                  onClick={() => setModalOpen(true)}
                >
                  Parking Validation
                </button>
              </li>
              <div className="flex justify-center">
                <Link
                  href={props.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="size-8 flex items-center justify-center"
                >
                  <FacebookIcon className="text-white" />
                </Link>
                <Link
                  href={props.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="size-8 flex items-center justify-center"
                >
                  <InstagramIcon className="text-white" />
                </Link>
              </div>
            </div> */}
          </ul>
        </div>
        {/* <div className="max-content-pannel pt-8! pb-0! px-4!">
          <div className="flex flex-wrap justify-center text-white lg:justify-between">
            <div>
              {props.copyright} {new Date().getFullYear()}
            </div>
          </div>
        </div> */}
      </header>
    </>
  )
}
