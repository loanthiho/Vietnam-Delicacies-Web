import { useState } from "react";
import styles from "./style.module.css";
import { useQuery } from "@tanstack/react-query";
import Notification from "../../Notification";
import { toast } from "react-toastify";

const Index = () => {
  const [showOutstandingproducts, setShowOutstandingproducts] = useState(false);
  const [shownewProducts, setShownewProducts] = useState(false);
  const notify = () => toast("Bạn cần tải App VnD để có thể mua sản phẩm");
  const fetchtAPI = async () => {
    const response = await fetch(
      "http://nodejs-app-env-1.eba-q2t7wpq3.ap-southeast-2.elasticbeanstalk.com/products"
    );
    return response.json();
  };

  const { isPending, data, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchtAPI,
  });

  if (isPending) return "Đang tải...";
  if (error) return "Lỗi tải dữ liệu";

  const toggleShowOutstandingproducts = () => {
    setShowOutstandingproducts(!showOutstandingproducts);
  };

  const toggleshowNewproduct = () => {
    setShownewProducts(!shownewProducts);
  };

  const isProductOlderThanTenDays = (createdAt) => {
    const tenDaysAgo = new Date();
    tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
    return new Date(createdAt) < tenDaysAgo;
  };

  return (
    <div className={styles.container}>
      <div className={styles.title_product}>
        SẢN PHẨM NỔI BẬT
        <div className={styles.icon_product}>
          <i className="fa-solid fa-bowl-food"></i>
        </div>
      </div>
      <Notification />
      <div className={styles.product}>
        {data?.data
          .slice(0, showOutstandingproducts ? data.length : 6)
          .map((product, index) => (
            <div key={index} className={styles.card} onClick={notify}>
              <img src={product.Files?.[0]?.src} alt="" />
              <div className={styles.name_product}>{product.name}</div>
              <div className={styles.price_product}>
                {product.price
                  ?.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                đ
              </div>
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
          <i className="fa-solid fa-burger"></i>
        </div>
      </div>

      <div className={styles.product}>
        {data?.data
          .filter(
            (product) =>
              !isProductOlderThanTenDays(product.createdAt && product.updatedAt)
          )
          .slice(0, shownewProducts ? data.length : 6)
          .map((product, index) => (
            <div key={index} className={styles.card} onClick={notify}>
              <img src={product.Files?.[0]?.src} />
              <div className={styles.name_product}>{product.name}</div>
              <div className={styles.price_product}>
                {product.price
                  ?.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                đ
              </div>
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

export default Index;
