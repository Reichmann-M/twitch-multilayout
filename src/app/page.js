"use client"; // This is a client component 👈🏽
import Image from 'next/image'
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [aChannelNames, setData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:9999/api/categories/channels') //TODO: add support for other categories
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  
  return (
    <main className="">
      <div>
        {/* TODO:  */}
        {aChannelNames && (
          <div className="grid grid-cols-4 gap-0">
            {aChannelNames.map((item, index) => (
              <iframe className="w-full h-full gap-0" key={index} src={`https://player.twitch.tv/?channel=${item}&parent=localhost`} frameborder="0" allowfullscreen="true" scrolling="no" height="378" width="620"></iframe>
            ))}
          </div>
        )}
      </div>
      {/* TODO: add select option list with all Twitch categories -> scrape categories and its URLs */}
    </main>
  )
}
