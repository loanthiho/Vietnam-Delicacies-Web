import { useState, useEffect } from "react";
import styles from "./style.module.css";
import { Link, useLocation } from "react-router-dom";

const Nav = () => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState("");
  const [menuProductClass, setMenuProductClass] = useState(styles.menu_product);

  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location]);


  const handleDropDowItemClick = () => {
    setMenuProductClass(`${styles.menu_product} ${styles.menu_productColor}`);
  };

    const handleDropDowItemunClick = () => {
      setMenuProductClass(styles.menu_product);
    };

  return (
    <div className={styles.container}>
      <div>
        <ul className={styles.nav_main}>
          <li
            onClick={handleDropDowItemunClick}
            className={currentPage === "/" ? styles.active : ""}
          >
            <Link to="/">TRANG CHỦ</Link>
          </li>
          <li className={menuProductClass}>
            <>
              SẢN PHẨM
              <span className={styles.sub_arrow}>
                <i className="fa-solid fa-caret-down"></i>
              </span>
            </>
            <div className={styles.line}></div>
            <ul className={styles.drop_dow}>
              <li
                onClick={handleDropDowItemClick}
                className={currentPage === "/vegetable" ? styles.active : ""}
              >
                <Link to="/vegetable">RAU CỦ QUẢ</Link>
              </li>
              <li
                onClick={handleDropDowItemClick}
                className={currentPage === "/dryFood" ? styles.active : ""}
              >
                <Link to="/dryFood">THỰC PHẨM KHÔ</Link>
              </li>
              <li
                onClick={handleDropDowItemClick}
                className={
                  currentPage === "/processedFood" ? styles.active : ""
                }
              >
                <Link to="/processedFood">ĐỒ UỐNG TRUYỀN THỐNG</Link>
              </li>
            </ul>
          </li>
          <li
            onClick={handleDropDowItemunClick}
            className={currentPage === "/about" ? styles.active : ""}
          >
            <Link to="/about">GIỚI THIỆU</Link>
          </li>
          <li
            onClick={handleDropDowItemunClick}
            className={currentPage === "/contact" ? styles.active : ""}
          >
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
