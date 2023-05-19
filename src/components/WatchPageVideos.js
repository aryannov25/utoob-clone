import React, { useEffect, useState } from "react";
import useVideo from "../utils/useVideo";
import VideoSuggestionsCard from "./VideoSuggestionsCard";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

const WatchPageVideos = () => {
  const [searchParams] = useSearchParams();

  const videoId = searchParams.get("v");
  const [relatedVideoData, setRelatedVideoData] = useState([]);

  const getRelatedVideos = () => {
    fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=30&relatedToVideoId=${videoId}&type=video&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
      // {
      //   headers: {
      //     Authorization: `Bearer ${process.env.REACT_APP_GOOGLE_API_KEY}`,
      //   },
      // }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("-----------------");
        console.log(data);
        setRelatedVideoData(data.items);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getRelatedVideos();
  }, [videoId]);

  // const watchPageVideo = useVideo();

  if (!relatedVideoData?.length) {
    return null;
  }

  return (
    <div className="ml-6 mt-4 mr-6 w-[450px]">
      {relatedVideoData.map((v) => (
        <Link to={"/watch?v=" + v.id} key={v.id}>
          <VideoSuggestionsCard info={v} />
        </Link>
      ))}
    </div>
  );
};

export default WatchPageVideos;