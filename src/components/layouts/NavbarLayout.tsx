import Container from '@/components/layouts/Container'
import Navigation from '@/components/layouts/navigations/TheNavigation'
import SplashScreen from '@/components/common/SplashScreen'
import TheHeader from '@/components/layouts/headers/TheHeader'

const NavbarLayout = () => {
  return (
    <>
      <TheHeader />
      <Container />
      <Navigation />
      <SplashScreen />
    </>
  )
}

export default NavbarLayout
