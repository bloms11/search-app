
const Product = ({product}) => {
  return (
    <div key={product.id} className="w-[380px] flex mx-2 items-center space-y-4 justify-around flex-col mt-2 h-[300px] py-4 border-2">
    <img className="w-[100px]"  src={product.image} />
    <div className="w-full">
        <p className="font-[500] text-[18px]">{product.title}</p>
        <p className="font-[500] text-[14px]">${product.price}</p>
    </div>
</div>
)
}

export default Product