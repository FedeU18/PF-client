import React from "react";

const MessageError = () => {
  const styles = {
    maxWidth: "400px",
    width: "100%",
    zIndex: "100",
  };

  return (
    <div
      className="position-absolute top-50 start-50 translate-middle text-center bg-dark fs-6 text-danger pt-3 d-flex align-items-center justify-content-center rounded-2"
      style={styles}
    >
      <p>
        No Creaste Una cuenta , <br />
        crea una cuenta para poder ingresar
      </p>
    </div>
  );
};

export default MessageError;
