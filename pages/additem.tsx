import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Close from "@/assets/images/icons/ic_x.svg";
import styles from "@/styles/AddItemPage.module.css";
import FileInput from "@/components/FileInput";

interface InputValue {
  title: string;
  description: string;
  price: string;
  tag: string;
  imgFile: File | null;
}

export default function AddItemPage() {
  const idRef = useRef(0);
  const [isDisabled, setIsDisabled] = useState(true);
  const [tags, setTags] = useState<string[]>([]);
  const [values, setValues] = useState<InputValue>({
    title: "",
    description: "",
    price: "",
    tag: "",
    imgFile: null,
  });

  const handleChange = (name: string, value: string | File | null): void => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleAddTag = (
    e: React.KeyboardEvent<HTMLInputElement> &
      React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter" && values.tag !== "") {
      setValues((prev) => ({ ...prev, tag: "" }));
      setTags([...tags, values.tag]);
    }
  };

  const handleDeleteTag = (val: string) => {
    const nextTags = tags.filter((tag) => tag !== val);
    setTags(nextTags);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    const { title, description, price, imgFile } = values;
    if (
      title !== "" &&
      description !== "" &&
      price !== "" &&
      tags.length !== 0 &&
      imgFile !== null
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [values, tags]);

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.addFormWrapper}>
        <div className={styles.header}>
          <h1 className={styles.headerTitle}>상품 등록하기</h1>
          <button
            type="submit"
            disabled={isDisabled}
            className={styles.addButton}
          >
            등록
          </button>
        </div>

        <label className={styles.addFormWrapperLabel}>상품 이미지</label>
        <FileInput
          name="imgFile"
          value={values.imgFile}
          onChange={handleChange}
        />

        <label className={styles.addFormWrapperLabel}>상품명</label>
        <input
          type="text"
          name="title"
          value={values.title}
          onChange={handleInputChange}
          placeholder="상품명을 입력해주세요"
          className={styles.addFormWrapperInput}
        />

        <label className={styles.addFormWrapperLabel}>상품소개</label>
        <textarea
          name="description"
          value={values.description}
          onChange={handleInputChange}
          placeholder="상품 소개를 입력해주세요"
          className={styles.addFormWrapperInput}
        />

        <label className={styles.addFormWrapperLabel}>판매가격</label>
        <input
          type="text"
          name="price"
          value={values.price}
          onChange={handleInputChange}
          placeholder="판매 가격을 입력해주세요"
          className={styles.addFormWrapperInput}
        />

        <label className={styles.addFormWrapperLabel}>태그</label>
        <input
          type="text"
          name="tag"
          value={values.tag}
          onChange={handleInputChange}
          onKeyDown={handleAddTag}
          placeholder="태그를 입력해주세요"
          className={styles.addFormWrapperInput}
        />

        <div className={styles.tagWrapper}>
          <ul>
            {tags.map((item) => {
              return (
                <li key={idRef.current++}>
                  {item}
                  <button onClick={() => handleDeleteTag(item)}>
                    <Image src={Close} alt="닫기" />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </form>
    </>
  );
}
