import { Outlet } from 'react-router-dom'

const Container = () => {
  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default Container
