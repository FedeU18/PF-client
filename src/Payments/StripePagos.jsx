import React from "react";
import axios from "axios"
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe("pk_test_51LDCAnHz183QdnFrZqtqGPkLkpDukWxoBnnlWoEqlUzDDhYjXObxH2Yi8S3mv5UpKxkPp4B9cLemexd1tfUXn2ln00gW4QNhrD");


const StripePagos = () => {


  const pagandoProfesor = async () => {
    const profesorCompra = {
      price_data: {
        currency: "usd",
        product_data: {
          name: "Platanos",
          images: ["https://www.quimicaysociedad.org/wp-content/uploads/2015/06/platano.jpg"],
        },
        unit_amount: "50000", // 1000 => 10 dolars // 4000 40 dollars
      },
      quantity: 1,
    }
    const stripe = await stripePromise;
    const response = await axios.post("http://localhost:3001/stripe/checkout-stripe", profesorCompra);
    const session = await response.data;

    const result = await stripe.redirectToCheckout({
      sessionId: session.id
    })

    if (result.error) {
      console.log(result.error.message);
      return;
    }
  }

  return (
    <div>
      <h1>Hola Stripe</h1>
      <button onClick={pagandoProfesor}>pagar Ahora</button>
    </div>
  )
}

export default StripePagos