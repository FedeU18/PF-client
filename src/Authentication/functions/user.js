export default function userAuthenticate() {
  const uno = localStorage.getItem("userDataAuth");
  const dos = localStorage.getItem("userData");
  //const tres = localStorage.getItem("user");

  const userDataAuth = JSON.parse(uno);
  const userData = JSON.parse(dos);
  //const user = JSON.parse(tres);

  return {
    userDataAuth,
    userData,
    //user,
  };
}

// esta funcion nos permite tener todos los datos necesarios de el
// usuario que se registre
