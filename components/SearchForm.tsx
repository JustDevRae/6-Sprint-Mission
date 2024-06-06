import Image from "next/image";
import Search from "@/assets/images/icons/ic_search.svg";
import styles from "@/components/SearchForm.module.css";

export default function SearchForm({ onInputChange, className="" }: any) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange(e.target.value);
  };
  return (
    <>
      <div className={styles.searchInputWrapper}>
        <Image
          src={Search}
          alt="검색 아이콘"
          style={{ position: "absolute", top: 9, left: 16 }}
        />
        <input
          type="text"
          placeholder="검색할 상품을 입력해주세요"
          className={`${styles.searchInput} ${className}`}
          onChange={handleChange}
        />
      </div>
    </>
  );
}
