import { useState } from "react";
import styles from "./style.module.css";
import { useQuery } from "@tanstack/react-query";
import Notification from "../../Notification";
import { toast } from "react-toastify";

const Vegetable = () => {
  const [showOutstandingproducts, setShowOutstandingproducts] = useState(false);
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


  return (
    <div className={styles.container}>
      <div className={styles.title_product}>RAU CỦ QUẢ</div>
      <Notification />
      <div className={styles.product}>
        {data?.data
          .filter((product) => product?.Category?.name === "Rau Củ Quả")
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
    </div>
  );
};

export default Vegetable;
