import { useState, useEffect } from "react";
import styles from "./style.module.css";
import { Link, useLocation } from "react-router-dom";

const Nav = () => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState("");

  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location]);

  return (
    <div className={styles.container}>
      <div>
        <ul className={styles.nav_main}>
          <li className={currentPage === "/" ? styles.active : ""}>
            <Link to="/">TRANG CHỦ</Link>
          </li>
          <li className={styles.menu_product}>
            <>
              SẢN PHẨM
              <span className={styles.sub_arrow}>
                <i className="fa-solid fa-caret-down"></i>
              </span>
            </>
            <div className={styles.line}></div>
            <ul className={styles.drop_dow}>
              <li>RAU CỦ QUẢ</li>
              <li>THỰC PHẨM KHÔ</li>
              <li>THỰC PHẨM QUA CHẾ BIẾN</li>
            </ul>
          </li>
          <li className={currentPage === "/about" ? styles.active : ""}>
            <Link to="/about">GIỚI THIỆU</Link>
          </li>
          <li className={currentPage === "/contact" ? styles.active : ""}>
            <Link to="/contact">LIÊN HỆ</Link>
          </li>
        </ul>
      </div>

      <div className={styles.search}>
        <input placeholder="Tìm kiếm..." type="text" />
        <div className={styles.icon_search}>
          <i
            className="fa-solid fa-magnifying-glass"
            style={{ position: "absolute", right: "10px", top: "10px" }}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default Nav;
