import { useEffect, useState } from 'react'
import { useExtractVideoId } from './useExtractVideoId'

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/videos'

async function fetchVideoTitle(videoId: string): Promise<string> {
  const response = await fetch(
    `${YOUTUBE_API_URL}?id=${videoId}&part=snippet&key=${YOUTUBE_API_KEY}`
  )
  const data = await response.json()

  if (data.items && data.items.length > 0) {
    return data.items[0].snippet.title
  }

  return 'Unknown Title'
}

export function useVideoTitles(urls: string[]) {
  const { extractVideoId } = useExtractVideoId()
  const [videoTitles, setVideoTitles] = useState<string[]>([])

  useEffect(() => {
    const fetchTitles = async () => {
      const videoIds = urls.map(url => extractVideoId(url))
      const titles = await Promise.all(videoIds.map(id => fetchVideoTitle(id)))
      setVideoTitles(titles)
    }

    fetchTitles()
  }, [urls, extractVideoId])

  return videoTitles
}
