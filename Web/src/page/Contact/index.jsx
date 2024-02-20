import React from "react";
import styles from "./style.module.css";

const index = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}> LIÊN HỆ VỚI CHÚNG TÔI</div>
      <div className={styles.main_content}>
        <div className={styles.form_contact}>
          <div className={styles.group_contact}>
            <div className={styles.title_contact}>Thông tin liên hệ</div>
            <div className={styles.contact_method}>
              <div className={styles.number}>
                <i class="fa-solid fa-phone"></i>
                <div className={styles.advise}>
                  Tư vấn <p> 0359215610</p>
                </div>
              </div>
              <div className={styles.email}>
                <i class="fa-solid fa-envelope"></i>
                <div className={styles.advise}>
                  Email <p> Vns@gmail.com</p>
                </div>
              </div>
            </div>

            <div className={styles.address}>
              <i class="fa-solid fa-location-dot"></i>
              <div className={styles.advise}>
                Địa chỉ <p> 101B Lê Hữu Trác, Phước Mỹ, Sơn Trà, Đà Nẵng</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.send_contact}>
          <div className={styles.group_contact}>
            <div className={styles.title_contact}>Gửi liên hệ</div>
            <div className={styles.group_input}>
              <div className={styles.name}> Họ tên *</div>
              <input placeholder="Họ và tên: " type="text" />
            </div>
            <div className={styles.group_input}>
              <div className={styles.name}> Email *</div>
              <input placeholder="Email: " type="text" />
            </div>

            <div className={styles.group_input}>
              <div className={styles.name}> Nội dung *</div>
              <textarea
                rows="4"
                id="user_input"
                placeholder="Nội dung: "
                type=""
              />
            </div>

            <button>Gửi</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
