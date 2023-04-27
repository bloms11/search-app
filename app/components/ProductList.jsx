
'use client'
import { useEffect, useState } from "react";
import {BsPhone} from 'react-icons/bs'
import {IoShirtOutline} from 'react-icons/io5'
import {GiNecklace, GiDress} from 'react-icons/gi'
import axios from 'axios'
import Product from "./Product";


const ProductList = () => {
    const categories = [        
        {id: 1, title: 'Electronics', icon: <BsPhone size={22}/>},        
        {id: 2, title: 'Jewelery', icon: <GiNecklace size={22}/>},        
        {id: 3, title: "Men's Clothing", icon: <IoShirtOutline size={22}/>},        
        {id: 4, title: "Women's Clothing", icon: <GiDress size={22}/>},    
    ];
    const [activeCategory, setActiveCategory] = useState(null);
    const [active, setActive] = useState();
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]); // Updated to use filteredProducts instead of filteredProduccts
    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState({});

    const handleClick = (id, title) => {
        setActive(id);
        setFilters({
          ...filters,
          category: title.toLowerCase(),
        }); // Update the filter state to include the category selected
        setFilteredProducts(
          products.filter((product) => {
            if (!product.category) {
              return false;
            }
            return product.category.toLowerCase() === title.toLowerCase();
          })
        );
    };    
    const searchProducts = (products, searchTerm, filters) => {
        return products
          .filter((product) => {
            if (!searchTerm) {
              return true;
            }
            const searchRegex = new RegExp(searchTerm, 'gi');
            return (
              product.name && product.name.match(searchRegex) ||
              product.description && product.description.match(searchRegex) ||
              product.title && product.title.match(searchRegex)
            );
          })
          .filter((product) => {
            if (!filters.category) {
              return true;
            }
            return product.category.toLowerCase() === filters.category;
          });
      };    
    const handleReset = () => {
        setActiveCategory(null);
        setFilters({ category: null });
        setSearchTerm("")
        setFilteredProducts(products)
        setActive(0)
    }
    useEffect(()=> {
        const fetchData = async () => {
            try{
                const response = await axios.get("https://fakestoreapi.com/products")
                setProducts(response.data)
                setFilteredProducts(response.data)
            }catch(error){
                console.log(error)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        const filteredProducts = products
        .filter((product) => {
          if (!searchTerm) {
            return true;
          }
          const searchRegex = new RegExp(searchTerm, 'gi');
          return (
            product.name && product.name.match(searchRegex) ||
            product.description && product.description.match(searchRegex) ||
            product.title && product.title.match(searchRegex)
          );
        })
        .filter((product) => {
            if (!active && !searchTerm) { // add a conditional check
                return true;
            }
            if (active && filters.category !== product.category) {
                return false;
            }
            return true;
        });
        setFilteredProducts(filteredProducts);
    }, [searchTerm, filters, products])  
    
    console.log(filteredProducts)

    const handleSearch = () => {
        const filteredProducts = searchProducts(products, searchTerm, filters);
  setFilteredProducts(filteredProducts);
    }
  return (
    <div className="w-full mt-[7%] flex flex-col items-center">
        {/* Search Input */}
        <div className="flex items-center w-full justify-center">
            <input onChange={(e) => setSearchTerm(e.target.value)} className="border-2 w-[60%] py-4 h-[60px] px-2 outline-none" placeholder="Type a product name" />
            {(activeCategory !== null || searchTerm !== "" || Object.keys(filters).length !== 0) && (
            <div onClick={handleReset} className="flex mx-4 items-center justify-center text-white bg-[#0061E4] w-[80px] h-[60px]">
                Reset 
            </div>
            )}
        </div>

        {/* Categories Tabs */}
        <div className="flex mt-4 flex-wrap justify-around w-[80%] md:w-[50%]">
            {categories.map((item, index) => (
                <div
                key={item.id} 
                onClick={()=>handleClick(item.id, item.title)} 
                className={`${item.id === active ? "bg-[#0061E4] text-white" : "bg-[#dddddd]"} hover:bg-[#0061E4] hover:text-white m-2 w-[100px] h-[100px] rounded-[4px] cursor-pointer flex flex-col space-y-2 items-center text-center justify-center`}
                >
                    {item.icon}
                    <h3 className="font-[500]">{item.title}</h3>
                </div>
            ))}
        </div>

        
        {/* Item Crads */}
        <div className="w-full flex flex-col flex-wrap items-center justify-center md:flex-row">
          {filteredProducts.length === 0 ? (
            <p className="mt-[5%]">Nothing yet.</p>
            ) : (
            filteredProducts.map((product) => (
              <Product key={product.id} product={product} />
            ))
          )}        
        </div>


    </div>
  )
}

export default ProductList;