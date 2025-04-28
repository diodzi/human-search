import { useState } from "react";

export default function About() {
  const [query, setQuery] = useState("[actual question] reddit");

  return (
    <main className="w-full h-[100dvh] grid place-items-center selection:bg-indigo-800 selection:text-white">
      {/* mobile */}
      <div className="md:hidden">
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold">HumanSearch</h1>
          <p>
            Currently unsupported on mobile :( <br /> Try viewing this page on
            your laptop/desktop!
          </p>
        </div>
      </div>
      {/* desktop */}
      <div className="hidden lg:block p-8 space-y-8 lg:space-y-12">
        <h1 className="text-4xl font-semibold">HumanSearch</h1>
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Why?</h2>
          <p>
            More and more nowadays, when we have questions, our searchbars tend
            to look like this:
          </p>

          <div
            className="px-4 w-full h-12 rounded-full shadow-md border-[1px] border-slate-200 flex items-center hover:cursor-text"
            onClick={() => {
              const searchbar = document.getElementById("searchbar");
              searchbar?.focus();
              setQuery(" reddit");
              setTimeout(function () {
                searchbar?.focus();
                (searchbar as HTMLInputElement).setSelectionRange(0, 0);
              }, 0);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-search-icon lucide-search"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              className="px-4 w-fit focus:outline-0 font-medium"
              id="searchbar"
              value={query}
              onChange={(e) => setQuery(`${e.target.value}`)}
              onClick={() => setQuery("")}
              onBlur={() => setQuery("[actual question] reddit")}
            />
          </div>

          <p>
            Unforunately, this feels like the easiest way to get answers from
            actual human beings.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">This sucks!</h2>
          <p>
            Agreed, but there's not much we can do about it. Here's a way to
            save a couple milliseconds though.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Installation</h2>
          <ol className="list-decimal ml-4 space-y-4">
            <li>
              <div className="flex flex-col gap-y-2">
                <span className="font-medium">Copy this:</span>
                <div className="p-2 border-[1px] md:w-[500px] rounded-md flex items-center justify-between">
                  <input
                    type="text"
                    readOnly
                    value={"https://humansearch.diodzi.dev?search=%s"}
                    className="w-full focus:outline-0"
                  />

                  <button
                    className="bg-zinc-950 text-zinc-100 px-4 py-2 rounded-md hover:bg-zinc-800 hover:cursor-pointer"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        "https://humansearch.diodzi.dev?search=%s",
                      );
                    }}
                  >
                    Copy
                  </button>
                </div>
              </div>
            </li>

            <li>
              <div className="flex flex-col gap-y-2">
                <span>Follow the guide for your browser:</span>
                <div className="space-x-8">
                  <a
                    href="hhttps://arc.net/e/A9F271E9-7692-48F8-BACF-D4DDDB8AC624"
                    target="_blank"
                    className="hover:underline hover:cursor-pointer font-medium"
                  >
                    Arc
                  </a>
                  <a
                    href="https://support.google.com/chrome/answer/95426?hl=en&co=GENIE.Platform%3DDesktop"
                    target="_blank"
                    className="hover:underline hover:cursor-pointer font-medium"
                  >
                    Chrome
                  </a>
                  <a
                    href="https://www.reddit.com/r/ios/comments/1cztie3/comment/ljzle44/"
                    target="_blank"
                    className="hover:underline hover:cursor-pointer font-medium"
                  >
                    Safari
                  </a>
                  <span
                    className="font-medium text-zinc-400 hover:cursor-pointer"
                    onClick={() => {
                      alert("Unsupported :p");
                    }}
                  >
                    Firefox
                  </span>
                </div>
              </div>
            </li>
          </ol>
          <a href=""></a>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Usage</h2>
          <p>
            Just add a question mark to the end of your search instead of adding
            "reddit" :)
          </p>
        </section>
      </div>
    </main>
  );
}
