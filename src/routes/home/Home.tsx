import Footer from '../../components/footer/Footer'
import Banner from '../../components/banner/Banner'
import Products from '../../components/products/Products'
import Brends from '../../components/brands/Brands'
import Reklama from '../../components/reklama/Reklama'
import Body from '../../components/body/Body'
import Shelves from '../../components/shelves/Shelves'

const Home = () => {
  return (
    <div>
   
        <Banner/>
        <Products/>
        <Brends/>
        <Body/>
        <Shelves/>
        <Reklama/>
       <Footer/>

    </div>
  )
}

export default Home