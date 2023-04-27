import Header from './components/Header';
import ProductList from './components/ProductList';

export default async function Home() {

  return (
    <div className="w-[90%] mx-auto ">
      <Header />
      <ProductList/>
    </div> 
)
}
