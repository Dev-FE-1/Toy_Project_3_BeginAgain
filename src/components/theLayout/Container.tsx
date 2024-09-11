import { Outlet } from 'react-router-dom'

const Container = () => {
  return (
    <>
      <header id="header"></header>
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default Container
