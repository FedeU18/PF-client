export default function userAuthenticate() {
  const uno = localStorage.getItem("userDataAuth");
  const dos = localStorage.getItem("userData");
  const tres = localStorage.getItem("user");


  if(uno && dos && tres) {
    const userDataAuth = JSON.parse(uno);
    const userData = JSON.parse(dos);
    const user = JSON.parse(tres);

    return {
      userDataAuth,
      userData,
      user,
    };
  }

  // return {

  // }

}

// esta funcion nos permite tener todos los datos necesarios de el
// usuario que se registre
