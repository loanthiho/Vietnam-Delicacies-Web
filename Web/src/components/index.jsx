import Banner from "./Banner";
import MainContent from "./MainContent";
import styles from "./style.module.css";

const Page = () => {
  return (
    <>
      <Banner></Banner>
      <section className={styles.section_content}>
        <MainContent></MainContent>
      </section>
    </>
  );
};

export default Page;
