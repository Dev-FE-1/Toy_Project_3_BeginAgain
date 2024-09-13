import Category from '@/components/theCommon/Category'
import Feed from '@/components/thePlaylist/Feed'
import LogoHeader from '@/components/theLayout/theHeader/LogoHeader'

const Home = () => {
  return (
    <>
      {<LogoHeader />}
      <Category />
      <Feed
        userId="레드히어로"
        thumbnail="vckr1GJ0JMs"
        title="히어로가 뽑은 운동자극 영상"
        timeRecord="1 hour ago"
      />
      <Feed
        userId="레드히어로"
        thumbnail="vckr1GJ0JMs"
        title="히어로가 뽑은 운동자극 영상"
        timeRecord="1 hour ago"
      />
      <Feed
        userId="레드히어로"
        thumbnail="vckr1GJ0JMs"
        title="히어로가 뽑은 운동자극 영상"
        timeRecord="1 hour ago"
      />
      <Feed
        userId="레드히어로"
        thumbnail="vckr1GJ0JMs"
        title="히어로가 뽑은 운동자극 영상"
        timeRecord="1 hour ago"
      />
    </>
  )
}

export default Home
