"use client";
import { useState } from "react";
import { ProfileForm } from "@/components/search-bar";

export default function Home() {
  const [videos, setVideos] = useState<FormData[]>([]);

  return (
    <div>
      <div className="w-full">
        <div className="flex flex-col gap-8 w-11/12 mx-auto mt-8">
          <div className="w-1/3 custom-content">
            <ProfileForm func={setVideos} />
          </div>
          <div className="mt-8 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6">
              {videos.map((video) => (
                <div
                  key={video.id}
                  className="p-4 bg-white rounded-lg shadow-lg"
                >
                  <iframe
                    className="w-full h-96 rounded-lg"
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  <h3 className="text-lg font-semibold mt-4">{video.title}</h3>
                  <p className="text-sm text-gray-600 mt-2">
                    {video.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
