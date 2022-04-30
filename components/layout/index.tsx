import Navbar from "components/Navbar"
import Footer from "components/Footer"
import type { NextPage } from "next"

const Layout: NextPage = ( {children} : any ) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout