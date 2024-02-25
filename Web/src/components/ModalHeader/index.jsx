import styles from "./style.module.css";

const ModalHeader = () => {
  return (
    <div className={styles.header}>
      <div>
        <a href="">
          <div className={styles.name}>
            Đặc sản <p className={styles.sub_name}>Việt</p>
          </div>
        </a>
      </div>

      <div className={styles.navholder}>
        <div>
          <div className={styles.subnav}>
            <ul>
              <a href="">
                <i className="fa-solid fa-phone"></i>
                <li>0359215610</li>
              </a>
              <a href="">
                <li>ĐĂNG KÝ</li>
              </a>
              <a href="">
                <li>ĐĂNG NHẬP</li>
              </a>
            </ul>
          </div>

          <div className={styles.header_line}>
            Miễn phí vận chuyển
            <p className={styles.header_pro}> ĐƠN HÀNG TRÊN 900K </p>
          </div>
        </div>
        <div className={styles.cart}>
          <a href="" className={styles.cart_link}>
            <i className="fa-solid fa-cart-shopping"></i>
            <div className={styles.cart_number}>0</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ModalHeader;
