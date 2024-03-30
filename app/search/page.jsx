"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import PropertyListingsCard from "@components/PropertyLisingsCard";
import Link from "next/link";
import FilterPanel from "@components/FilterPanel";
import { useRouter } from "next/navigation";
import { getData } from "./getDataAction";
const page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  let page = parseInt(searchParams.get("page"), 10);
  const [query, setQuery] = useState(searchParams.get("query"));

  //set url if loaded incorrectly
  if (page < 1 || !page || !query) {
    router.push("search?page=1&query={}");
  }

  const perPage = 8;

  //fetch the data based on page and our filter query
  const [data, setData] = useState({});
  const revalidateAndGetdata = (query) => {
    getData(perPage, page, query).then((res) => {
      setData(res);
    });
    router.push(`?page=1&query=${query}`);
  };
  useEffect(() => {
    revalidateAndGetdata(query);
  }, []);

  //user navigation between pages
  const prevPage = page - 1 > 0 ? page - 1 : 1;
  const nextPage = page + 1;
  const totalPages = Math.ceil(data.listingCount / perPage);
  const pageNumbers = [];
  const offsetNumbers = 3;

  //surrounding page number generator
  for (let i = page - offsetNumbers; i <= page + offsetNumbers; i++) {
    if (i >= 1 && i <= totalPages) {
      pageNumbers.push(i);
    }
  }
  return (
    <div className="container  mt-8 w-full">
      <div className="flex  gap-1">
        <div className="lg:w-80 lg:min-w-80 lg:max-w-80">
          <FilterPanel
            query={query}
            revalidateAndGetdata={revalidateAndGetdata}
          />
        </div>
        <div className="grow w-full">
          {Object.keys(data).length > 0 ? (
            <>
              <h3 className="text-2xl font-semibold mx-8 lg:mx-14 mb-4 text-slate-800">
                Showing {data.listingCount === 0 ? 0 : (page - 1) * perPage + 1}{" "}
                -{" "}
                {page === totalPages || data.listingCount === 0
                  ? data.listingCount
                  : page * perPage}{" "}
                listings out of {data.listingCount}
              </h3>
              <div className="flex  gap-4  flex-wrap  mx-8 lg:mx-14 ">
                {data?.listingCount === 0 && (
                  <div className="my-6 text-xl font-bold w-full text-center text-slate-600">
                    No listings found matching with the configured filter : (
                  </div>
                )}
                {data?.listings &&
                  JSON.parse(data?.listings).map((listing) => (
                    <PropertyListingsCard data={listing} key={listing._id} />
                  ))}
              </div>

              <div className="flex justify-center items-center mt-10 mb-5">
                <div className="flex border gap-1 rounded-lg border-faded-orange px-2.5 py-1.5 text-md font-semibold">
                  {page === 1 ? (
                    <div className="opacity-65 text-slate-400 ">Previous</div>
                  ) : (
                    <Link href={`?page=${prevPage}&query=${query}`}>
                      Previous
                    </Link>
                  )}

                  {pageNumbers.map((pageNumber, index) => (
                    <Link
                      href={`?page=${pageNumber}&query=${query}`}
                      className={`${
                        pageNumber === page
                          ? "text-white bg-active-orange  "
                          : "hover:bg-faded-orange"
                      } px-2 rounded-sm transition-all`}
                      key={index}
                    >
                      {pageNumber}
                    </Link>
                  ))}
                  {page === totalPages ? (
                    <div className="opacity-65  text-slate-400">Next</div>
                  ) : (
                    <Link href={`?page=${nextPage}&query=${query}`}>Next</Link>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="text-2xl font-bold text-center w-full text-slate-800 h-screen  flex items-center justify-center">
              {" "}
              Loading the property listings ...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
