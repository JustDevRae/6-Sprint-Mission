import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Close from '@/public/images/icons/ic_x.svg';
import styles from '@/components/ui/FileInput/FileInput.module.css';

interface Props {
  name: string;
  value: File | null;
  onChange: (name: string, value: File | null) => void;
}

export default function FileInput({ name, value, onChange }: Props) {
  const [previewImg, setPreviewImg] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectImg = e.target.files;
    if (!selectImg || selectImg.length === 0) return;

    const nextValue = selectImg[0];
    onChange(name, nextValue);
  };

  const handleDelete = () => {
    const currentImg = inputRef.current;
    if (!currentImg) return;

    currentImg.value = '';
    onChange(name, null);
  };

  useEffect(() => {
    if (!value) return null || undefined;

    const nextPreviewImg = URL.createObjectURL(value);
    setPreviewImg(nextPreviewImg);

    return () => {
      URL.revokeObjectURL(nextPreviewImg);
    };
  }, [value]);

  return (
    <div className={styles.imgAddWrapper}>
      <input
        type="file"
        id="imgFile"
        accept="images/png, images/jpeg"
        placeholder="이미지 등록"
        onChange={handleChange}
        ref={inputRef}
        className={styles.imgAddInput}
      />
      <div className={styles.previewImgWrapper}>
        {value && (
          <Image
            src={previewImg}
            alt="미리보기 이미지"
            className={styles.previewImg}
            width={282}
            height={282}
          />
        )}
        {value && (
          <button
            type="button"
            onClick={handleDelete}
            className={styles.deleteButton}
          >
            <Image src={Close} alt="닫기" />
          </button>
        )}
      </div>
    </div>
  );
}
