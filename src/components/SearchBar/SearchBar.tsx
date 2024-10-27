import React, { useState, ChangeEvent, FormEvent } from "react";
import toast, { Toaster } from "react-hot-toast";
import searchIcon from "../../assets/search-icon.svg";
import s from "./SearchBar.module.css";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim() === "") {
      toast.error("Please enter a search query.");
      return;
    }
    onSubmit(inputValue);
    setInputValue("");
  };

  return (
    <header className={s.wrapper}>
      <form onSubmit={handleSubmit} className={s.form}>
        <button type="submit" className={s.btn}>
          <img src={searchIcon} alt="Search icon" />
        </button>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          className={s.form}
        />
      </form>
      <Toaster position="top-right" />
    </header>
  );
};

export default SearchBar;
