import React from "react";

const VideoCard = ({ info }) => {
  // console.log(info);

  const { snippet, statistics } = info;
  const { channelTitle, title, thumbnails } = snippet;
  function prettifyNumber(views) { 
    var thousand = 1000; 
    var million = 1000000; 
    var billion = 1000000000; 
    var trillion = 1000000000000; 
    if (views < thousand) { 
        return String(views);    
    } 
     
    if (views >= thousand && views <= 1000000) { 
         return  Math.round(views/thousand) + 'k';    
    } 
     
    if (views >= million && views <= billion) { 
        return Math.round(views/million) + 'M';    
    } 
     
    if (views >= billion && views <= trillion) { 
        return Math.round(views/billion) + 'B';    
    } 
     
    else { 
        return Math.round(views/trillion) + 'T';    
    } 
  } 


  return (
    <div className="p-2 m-2 w-72 h-80 shadow-lg rounded-lg transition duration-500 ease-in-out hover:scale-105 hover:shadow-slate-400">
      <img className="rounded-lg" src={thumbnails.medium.url} alt="thumbnail" />
      <ul>
        <li className="font-bold">{title}</li>
        <li>{channelTitle}</li>
        <li>{prettifyNumber(views)} views</li>
      </ul>
    </div>
  );
};

export default VideoCard;
