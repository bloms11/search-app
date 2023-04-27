import Header from './components/Header';
import ProductList from './components/ProductList';

export default async function Home() {

  const res = await fetch(
    `https://fakestoreapi.com/products`, 
    {
      next: {
        revalidate: 30,
      }
    })

  const data = await res.json();
  // console.log(data)
  return (
    <div className="w-[90%] mx-auto ">
      <Header />
      {/* {data ? (<ProductList />) : JSON.stringify(data)} */}
      <ProductList/>
    </div> 
)
}
