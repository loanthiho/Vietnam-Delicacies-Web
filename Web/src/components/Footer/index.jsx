import React from "react";
import styles from "./style.module.css";

const index = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footer_content}>
        <div className={styles.introduce}>
          <div className={styles.title}>VỀ CHÚNG TÔI</div>
          <div className={styles.content_introduce}>
            <p>
              Trải nghiệm mua sắm tùy chỉnh để quảng bá sản phẩm văn hóa Việt
              Nam Gợi ý thông minh về công thức sản phẩm để có trải nghiệm văn
              hóa phù hợp nhưng đa dạng nhất thông qua mua sắm.
            </p>
            <p>
              📲 Tải ngay App <span>VnD</span> để bắt đầu hành trình mua sắm độc
              đáo và đa dạng của bạn mọi lúc mọi nơi!
            </p>
            <p>
              Hãy là một phần của chúng tôi và đắm chìm trong thế giới đặc sản
              văn hóa Việt Nam ngay hôm nay!🛍️
            </p>
          </div>
        </div>

        <div className={styles.contact}>
          <div className={styles.title}>LIÊN HỆ</div>
          <div className={styles.content_introduce}>
            <div className={styles.icon}>
              <i class="fa-regular fa-envelope"></i>
              <p>vns@gmail.com</p>
            </div>

            <div className={styles.icon}>
              <i class="fa-solid fa-phone"></i>
              <p>0359215610</p>
            </div>

            <div className={styles.icon}>
              <i class="fa-solid fa-location-dot"></i>
              <p>Lê Hữu Trác, Phước Mỹ, Sơn Trà, Đà Nẵng</p>
            </div>
          </div>
        </div>

        <div className={styles.contact}>
          <div className={styles.title}>TẢI ỨNG DỤNG NGÀY </div>
          <div className={`${styles.content_introduce} ${styles.dowload}`}>
            <div className={styles.img}>
              <img
                style={{ width: "100px" }}
                src="https://b2024479.smushcdn.com/2024479/wp-content/uploads/2020/05/HelloTech-qr-code-1024x1024.jpg?lossy=1&strip=1&webp=1"
                alt=""
              />
            </div>

            <div className={styles.app}>
              <img
                style={{ width: "130px" }}
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/2560px-Download_on_the_App_Store_Badge.svg.png"
                alt=""
              />

              <img
                style={{ width: "130px" }}
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/800px-Google_Play_Store_badge_EN.svg.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
