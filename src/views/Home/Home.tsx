import React, { useEffect, useState } from "react";
import "./Home.css";

interface Story {
  id: number;
  name: string;
  current_state: string;
  url: string;
}

export const Home: React.FunctionComponent = () => {
  const [status, setStatus] = useState<"INITIAL" | "SUCCESS" | "FAILURE">("INITIAL");
  const [stories, setStories] = useState<Story[]>([]);
  useEffect(() => {
    const run = async () => {
      const response = await fetch(process.env.REACT_APP_PIVOTAL_API_URL || "");
      if (response.ok) {
        setStatus("SUCCESS");
        setStories(await response.json());
      } else {
        setStatus("FAILURE");
      }
    };
    run();
  }, []);
  return (
    <div>
      {status == "FAILURE" && (
        <div className="bg-red-200 px-6 py-4 mx-2 my-4 rounded-md text-lg flex items-center mx-auto w-3/4 xl:w-2/4">
          <svg viewBox="0 0 24 24" className="text-red-600 w-5 h-5 sm:w-5 sm:h-5 mr-3">
            <path
              fill="currentColor"
              d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z"
            />
          </svg>
          <span className="text-red-800">An error occured while fetching stories</span>
        </div>
      )}
      {status === "SUCCESS" && (
        <div className="flex min-h-screen bg-gray-200 text-gray-800">
          <div className="p-4 w-full">
            <div className="grid grid-cols-12 gap-4">
              {stories.map((story) => (
                <a
                  href={story.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="block col-span-12 sm:col-span-6 md:col-span-3  hover:shadow-md duration-300 "
                  key={story.id}
                >
                  <div className="flex flex-col bg-white rounded p-4">
                    <div className="text-sm text-pink-600 font-bold text-center">{story.name}</div>
                    <div className="font-bold text-lg text-center mt-2">
                      <span className="inline-block rounded-full text-white bg-pink-800 text-xs font-bold px-2 md:px-4 py-1 opacity-90 hover:opacity-100">
                        {story.current_state}
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
