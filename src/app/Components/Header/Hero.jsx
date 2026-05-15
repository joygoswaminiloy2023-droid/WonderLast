import { Separator } from "@heroui/react";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="bg-[url('/assets/Banner.png')] bg-cover bg-center text-white flex flex-col justify-between min-h-screen mb-5">

      {/* Hero Content */}
      <div className="flex flex-1 flex-col items-center justify-center gap-6 px-5 pt-28 pb-10 text-center md:px-10">

        <h1 className="text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Discover Your <br /> Next Adventure
        </h1>

        <p className="max-w-3xl text-sm text-gray-200 sm:text-base md:text-lg lg:text-2xl">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Link href="/Destination"><button className="cursor-pointer bg-cyan-500 px-6 py-3 text-sm font-medium uppercase transition hover:bg-cyan-600 md:text-base">
            Explore Now
          </button></Link>

          <Link href="/Add-destination">
          <button  className="cursor-pointer bg-white/40 px-6 py-3 text-sm font-medium uppercase backdrop-blur-sm transition hover:bg-white/60 md:text-base">
            Add Destination
          </button>
          </Link>
        </div>
      </div>

      {/* Search Box */}
      <div className="w-full bg-black/30 backdrop-blur-md">

        {/* Mobile Layout */}
        <div className="flex flex-col gap-4 p-5 md:hidden">

          <div>
            <h3 className="text-sm font-semibold">Location</h3>
            <p className="text-xs text-gray-200">
              Address, City or Zip
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Date/Duration</h3>
            <p className="text-xs text-gray-200">
              Anytime/3 Days
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Budget</h3>
            <p className="text-xs text-gray-200">
              $0-$3000
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold">People</h3>
            <p className="text-xs text-gray-200">
              5-10
            </p>
          </div>

          <button className="mt-2 w-full bg-cyan-500 py-3 font-medium">
            Search
          </button>
        </div>

        {/* Desktop Layout */}
        <div className="hidden items-center justify-between md:flex">

          <div className="flex flex-1 items-center justify-between">

            <div className="px-6 py-5">
              <h3 className="text-sm font-semibold">Location</h3>
              <p className="text-xs text-gray-200">
                Address, City or Zip
              </p>
            </div>

            <Separator
              orientation="vertical"
              className="h-14 bg-white/30"
            />

            <div className="px-6 py-5">
              <h3 className="text-sm font-semibold">
                Date/Duration
              </h3>
              <p className="text-xs text-gray-200">
                Anytime/3 Days
              </p>
            </div>

            <Separator
              orientation="vertical"
              className="h-14 bg-white/30"
            />

            <div className="px-6 py-5">
              <h3 className="text-sm font-semibold">Budget</h3>
              <p className="text-xs text-gray-200">
                $0-$3000
              </p>
            </div>

            <Separator
              orientation="vertical"
              className="h-14 bg-white/30"
            />

            <div className="px-6 py-5">
              <h3 className="text-sm font-semibold">People</h3>
              <p className="text-xs text-gray-200">
                5-10
              </p>
            </div>
          </div>

          <button className="bg-cyan-500 px-10 py-8 text-lg font-medium transition hover:bg-cyan-600">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;