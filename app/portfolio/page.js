import Image from 'next/image';
import React from 'react';
import img from "@/public/Avatars/vector-1750073030529-8454fe28d27f.avif"
const Page = () => {
  return (
    <div className=" grid grid-cols-5 h-screen">
      <figure className="col-span-2 h-full flex flex-col items-center mt-40">
        <Image
          src={img}
          className="rounded-full w-40 h-40"
          alt="Image"
        />
        <div className="mt-4 text-center grid gap-4">
          <h1 className="mt-4 text-xl font-semibold">Rachit Rawart</h1>
          <h2>Full Stack Web Developer</h2>
          <p className="text-center max-w-88 leading-relaxed text-lg">
            Building  Web Apps for more than <br /> 3+ years now 
          </p>

        </div>
      </figure>

      <div className="col-span-3 h-full border-l-2 border-gray-300" ></div>

    </div>
  );
};

export default Page;