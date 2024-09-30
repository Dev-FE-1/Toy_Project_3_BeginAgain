export const useExtractVideoId = () => {
  const extractVideoId = (url?: string): string => {
    if (!url) {
      console.error('잘못된 비디오 링크입니다.')
      return ''
    }

    const urlObj = new URL(url)
    const videoId = urlObj.searchParams.get('v')

    if (!videoId) {
      console.error('Video ID를 찾을 수 없습니다.')
      return ''
    }

    return videoId
  }

  return { extractVideoId }
}

// 이런게 보통 훅이지....
