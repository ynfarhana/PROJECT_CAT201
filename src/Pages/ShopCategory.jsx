import { products } from "../Component/Assets/all_product";
import Item from "../Component/Item/Item";
import Footer from "../Component/Footer/Footer";

const ShopCategory = (props) => {
  const { category } = props;

  return (
    <div className="shop-category">
      <div className="shopcategory-products">
        {products
          .filter((item) => item.category === category)
          .map((item) => (
            <Item
              key={item.id}
              id={item.id}
              name={item.name}
              image={item.image[0]}
              price={item.price}
            />
          ))}
      </div>

      <Footer />
    </div>
  );
};

export default ShopCategory;
