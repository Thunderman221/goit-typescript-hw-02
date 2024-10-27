import { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import { fetchImages } from "./services/api";
import { Image } from "./types";
import Loader from "./components/Loader/Loader";

function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [totalImages, setTotalImages] = useState<number>(0);
  const imagesPerPage = 12;

  useEffect(() => {
    if (!query) return;

    const getImages = async () => {
      setLoading(true);
      try {
        const { results, total } = await fetchImages(
          query,
          currentPage,
          imagesPerPage
        );

        const imagesArray = results as Image[];

        setImages((prevImages) => [...prevImages, ...imagesArray]);
        setTotalImages(total);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    getImages();
  }, [query, currentPage]);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setImages([]);
    setCurrentPage(1);
    setTotalImages(0);
  };

  const loadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const openModal = (image: Image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const hasMoreImages = images.length < totalImages;

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      {loading && <Loader />}
      <ImageGallery images={images} onImageClick={openModal} />
      {!loading && images.length > 0 && hasMoreImages && (
        <LoadMoreBtn onClick={loadMore} />
      )}
      <ImageModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        image={selectedImage}
      />
    </>
  );
}

export default App;
