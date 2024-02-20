import React, { useState } from "react";
import styles from "./style.module.css";
import outstandingproducts from "../../../public/OutstandingProducts/products.json";
import newproducts from "../../../public/NewProducts/products.json";

const index = () => {

  const [showOutstandingproducts, setShowOutstandingproducts] = useState(false);
  const [shownewProducts, setShownewProducts] = useState(false);

  const toggleShowOutstandingproducts = () => {
    setShowOutstandingproducts(!showOutstandingproducts);
  };

  const toggleshowNewproduct = ()=>{
    setShownewProducts(!shownewProducts);
  };

  const showNotification =()=>{
    alert("Bạn cần tải app này")
  }


  return (
    <div className={styles.container}>
      <div className={styles.title_product}>
        SẢN PHẨM NỔI BẬT
        <div className={styles.icon_product}>
          <i class="fa-solid fa-bowl-food"></i>
        </div>
      </div>

      <div className={styles.product}>
        {outstandingproducts
          .slice(0, showOutstandingproducts ? outstandingproducts.length : 6)
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

      <div className={styles.advertise}>
        <img
          src="https://hstatic.net/349/1000150349/1000203344/banner-top.jpg?v=28"
          alt=""
        />

        <div className={styles.advertise_title}>
          <div>
            Miễn phí vận chuyển{" "}
            <span className={styles.sub_advertise}>
              {" "}
              Với tất cả đơn hàng trên 500k
            </span>
          </div>
          <div>
            Miễn phí 2 ngày vận chuyển với đơn hàng trên 500k trừ trực tiếp khi
            thanh toán.
          </div>
        </div>
      </div>

      <div className={styles.title_product}>
        SẢN PHẨM MỚI
        <div className={styles.icon_product}>
          <i class="fa-solid fa-burger"></i>
        </div>
      </div>

      <div className={styles.product}>
        {newproducts
          .slice(0, shownewProducts ? newproducts.length : 6)
          .map((product, index) => (
            <div key={index} className={styles.card}>
              <img src={product.imageUrl} alt="" />
              <div className={styles.name_product}>{product.name}</div>
              <div className={styles.price_product}>{product.price}</div>
            </div>
          ))}
      </div>

      {!shownewProducts && (
        <button onClick={toggleshowNewproduct} className={styles.highlight_btn}>
          XEM THÊM
        </button>
      )}
    </div>
  );
};

export default index;
