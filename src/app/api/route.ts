import { NextResponse } from 'next/server';
import axios from 'axios';

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';

interface VideoData {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
}

interface YoutubeApiItem {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
      };
    };
  };
}


export async function POST(req: Request) {
  try {
    const { q } = await req.json(); // Read JSON body of the request
    if (!q) {
      return NextResponse.json({ error: 'Missing query parameter' }, { status: 400 });
    }

    const response = await axios.get(YOUTUBE_API_URL, {
      params: {
        part: 'snippet',
        q: q,
        type: 'video',
        maxResults: 4,
        key: YOUTUBE_API_KEY,
      },
    });

    const videos: VideoData[] = response.data.items.map((item: YoutubeApiItem) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.default.url,
    }));
    

    return NextResponse.json(videos, { status: 200 });
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal Server Error' },
      { status: 500 }
    );
  }
}
