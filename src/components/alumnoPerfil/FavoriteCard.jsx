import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styles from "./FavoriteCard.module.css";

const FavoriteCard = ({ id, username, nombre, imagen, pais }) => {
  const theme = useSelector((state) => state.theme.theme);
  const navigate = useNavigate();

  console.log(pais);
  return (
    <div
      className={`${styles.card_fav_profesor} ${
        theme === "dark" && styles.card_fav_profesor_dark
      }`}
      onClick={() => navigate(`/profesores/${id}`)}
    >
      <img src={imagen} alt={username} className={styles.img_card_favorite} />
      <h5 className={styles.h5}>{username}</h5>
      <img src={pais} alt={nombre} className={styles.country_flag_fav} />
    </div>
  );
};

export default FavoriteCard;
