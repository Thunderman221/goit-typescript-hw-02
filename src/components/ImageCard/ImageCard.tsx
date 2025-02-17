import s from "./ImageCard.module.css";

interface ImageCardProps {
  src: string;
  alt: string;
  onClick: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ src, alt, onClick }) => {
  return (
    <div onClick={onClick} className={s.card}>
      <img className={s.image} src={src} alt={alt} />
    </div>
  );
};

export default ImageCard;
