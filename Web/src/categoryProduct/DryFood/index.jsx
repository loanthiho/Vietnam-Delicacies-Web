import { useState } from "react";
import styles from "./style.module.css";
import dryFood from "../../../public/dryFood/products.json";

const Dryfood = () => {
  const [showOutstandingproducts, setShowOutstandingproducts] = useState(false);
  const toggleShowOutstandingproducts = () => {
    setShowOutstandingproducts(!showOutstandingproducts);
  };

  const showNotification = () => {
    alert("Bạn cần tải app này để mua sản phẩm");
  };

  return (
    <div className={styles.container}>
      <div className={styles.title_product}>THỰC PHẨM KHÔ</div>

      <div className={styles.product}>
        {dryFood
          .slice(0, showOutstandingproducts ? dryFood.length : 6)
          .map((product, index) => (
            <div key={index} className={styles.card} onClick={showNotification}>
              <img src={product.imageUrl} alt="" />
              <div className={styles.name_product}>{product.name}</div>
              <div className={styles.price_product}>{product.price}</div>
            </div>
          ))}
      </div>

      {!showOutstandingproducts && (
        <button
          className={styles.highlight_btn}
          onClick={toggleShowOutstandingproducts}
        >
          XEM THÊM
        </button>
      )}
    </div>
  );
};

export default Dryfood;
