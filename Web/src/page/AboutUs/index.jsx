import { useEffect, useState } from "react";
import styles from "./style.module.css";

const Index = () => {
  const imagePaths = [
    "../introduce/banh-uot.jpg",
    "../introduce/lam-rice.jpg",
    "../introduce/thi-xoi.jpg",
  ];
  const [imageLoaded, setImageLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagePaths.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const image = new Image();
    image.src = imagePaths[currentImageIndex];
    image.onload = () => {
      setImageLoaded(true);
    };
  }, [currentImageIndex]);

  return (
    <div className={styles.container}>
      <div className={styles.title}> VỀ CHÚNG TÔI</div>
      <div className={`${styles.main_content} ${imageLoaded ? "loaded" : ""}`}>
        <img
          className="fade-in"
          style={{ width: 422, height: 550 }}
          src={imagePaths[currentImageIndex]}
          alt=""
        />
        <div className={styles.content}>
          Chào mừng quý khách đến với thế giới tinh tế và đậm chất văn hóa của
          đặc sản Việt Nam tại trang web chúng tôi! Khám phá hương vị đặc trưng,
          sự đa dạng và sự phong phú của ẩm thực Việt Nam qua từng trang thông
          tin chân thực và chi tiết.<br></br>
          <br></br>
          <p>
            Tại đây, chúng tôi tự hào giới thiệu đến bạn những hành trình ẩm
            thực không ngừng, từ miền Bắc đến miền Nam, từ bếp nhà truyền thống
            đến những đầu bếp đương đại đầy sáng tạo. Bạn sẽ được trải nghiệm
            những hương vị đặc biệt của các món ăn nổi tiếng như Gà nướng, chả
            giò, cơm niêu, và rất nhiều món ngon khác, mỗi một món đều là một
            tác phẩm nghệ thuật kết hợp tinh tế giữa nguyên liệu tốt nhất và bí
            quyết truyền thống.{" "}
          </p>{" "}
          <br></br>
          <p>
            Không chỉ dừng lại ở ẩm thực, trang web của chúng tôi còn mang đến
            cho bạn cơ hội khám phá về các loại đặc sản như trà, cà phê, mắc
            khén, và nhiều sản phẩm độc đáo khác, là những biểu tượng của đất
            nước Việt Nam.
          </p>
          <br></br>
          Hãy cùng chúng tôi trải nghiệm hành trình khám phá văn hóa ẩm thực đặc
          sắc qua từng trang thông tin, hình ảnh sống động và câu chuyện hấp
          dẫn. Đặc sản Việt Nam - nơi gặp gỡ văn hóa, nơi thưởng thức hương vị
          đích thực!
        </div>
      </div>
    </div>
  );
};

export default Index;
