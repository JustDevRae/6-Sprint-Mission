import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Close from "@/public/images/icons/ic_x.svg";
import styles from "@/components/FileInput.module.css";
interface Props {
  name: string;
  value: File | null;
  onChange: (name: string, value: File | null) => void;
}

export default function FileInput(props: Props) {
  const [previewImg, setPreviewImg] = useState<string>(""); 
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const selectImg = e.target.files;
    if (!selectImg || selectImg.length === 0) return;

    const nextValue = selectImg[0];
    props.onChange(props.name, nextValue);
  };

  const handleDelete = () => {
    const currentImg = inputRef.current;
    if (!currentImg) return;

    currentImg.value = "";
    props.onChange(props.name, null);
  };

  useEffect(() => {
    if (!props.value) return;

    const nextPreviewImg = URL.createObjectURL(props.value);
    setPreviewImg(nextPreviewImg);

    return () => {
      setPreviewImg(""); 
      URL.revokeObjectURL(nextPreviewImg); 
    };
  }, [props.value]);

  return (
    <div className={styles.imgAddWrapper}>
      <input
        type="file"
        accept="images/png, images/jpeg"
        placeholder="이미지 등록"
        onChange={handleChange}
        ref={inputRef}
        className={styles.imgAddInput}
      />
      <div className={styles.previewImgWrapper}>
        {props.value && (
          <Image
            src={previewImg}
            alt="미리보기 이미지"
            className={styles.previewImg}
            width={282}
            height={282}
          />
        )}
        {props.value && (
          <button onClick={handleDelete} className={styles.deleteButton}>
            <Image src={Close} alt="닫기" />
          </button>
        )}
      </div>
    </div>
  );
}
