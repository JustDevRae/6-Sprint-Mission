import Image from "next/image";
import Sort from "@/assets/images/icons/ic_sort.svg";
import styles from "@/components/DropDownButton.module.css";
import { useState } from "react";

export default function DropDownButton({ onSortSelection }:any) {
  const [isVisible, setIsVisible] = useState(false);

  const handleDropdown = () => {
    setIsVisible(!isVisible);
  };
  return (
    <>
      <div className={styles.dropDownButtonWrapper}>
        <button className={styles.dropDownButton} onClick={handleDropdown}>
          최신순
          <Image src={Sort} alt="정렬 아이콘" />
        </button>

        {isVisible && (
          <div className={styles.dropDownMenu}>
            <div
              className={styles.dropDownItem}
              onClick={() => {
                onSortSelection("recent");
                setIsVisible(false);
              }}
            >
              최신순
            </div>
            <div
              className={styles.dropDownItem}
              onClick={() => {
                onSortSelection("like");
                setIsVisible(false);
              }}
            >
              좋아요순
            </div>
          </div>
        )}
      </div>
    </>
  );
}
