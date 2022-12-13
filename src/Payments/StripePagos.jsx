import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { editAlumno } from "../redux/Actions/Alumno";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  "pk_test_51LDCAnHz183QdnFrZqtqGPkLkpDukWxoBnnlWoEqlUzDDhYjXObxH2Yi8S3mv5UpKxkPp4B9cLemexd1tfUXn2ln00gW4QNhrD"
);

const StripePagos = ({ profe, precio, id }) => {
  console.log(id)
  const buttonStyle = {
    padding: ".5rem",
    display: "flex",
    justifyContent: "center",
    maxWidth: "150px",
    width: "100%",
    fontSize: "1.2rem",
    color: "white",
    borderRadius: "4rem",
  };
  const divButtonStyle = {
    marginTop: "1rem",
    display: "flex",
    justifyContent: "center",
  };
  const dispatch = useDispatch()

  const pagandoProfesor = async () => {
    const precios = Number(precio + "00");

    const profesorCompra = {
      price_data: {
        currency: "usd",
        product_data: {
          name: profe.nombre,
          images: [profe.imagen],
        },
        unit_amount: precios, // 1000 => 10 dolars // 4000 40 dollars
      },
      quantity: 1,
    };
    dispatch(editAlumno({promo: false}, id))
    const stripe = await stripePromise;
    const response = await axios.post(
      "/stripe/checkout-stripe",
      profesorCompra
    );
    localStorage.setItem("in-process", true)
    const session = await response.data;
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    
    if (result.error) {
      console.log(result.error.message);
      return;
    }
  };

  return (
    <div style={divButtonStyle}>
      <button
        style={buttonStyle}
        onClick={pagandoProfesor}
        className="bg-success rounded-2 border-0 fs-6"
      >
        pagar ahora
      </button>
    </div>
  );
};

export default StripePagos;
