import styles from "./style.module.css";

const Index = () => {
  return (
    <div className={styles.container}>
      <div className={styles.img_banner}>
        <img src="../slideshow_2.jpg" alt="" />
      </div>

      <div className={styles.banner_title}>
        <h3>Đặc sản sạch</h3>
        <h1>ĐẢM BẢO SỨC KHỎE </h1>
      </div>
    </div>
  );
};

export default Index;
