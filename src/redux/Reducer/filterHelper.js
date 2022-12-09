export const FilterOrder = (allProfesores, object) => {
  let newallProfesores = [];

  if (object.materias.length > 0) {
    const noRepeat = [0];
    allProfesores.map((a) => {
      a.materias.map((aMaterias) => {
        object.materias.map((t) => {
          if (aMaterias.name === t) {
            if (noRepeat[0] !== a.id) {
              newallProfesores.push(a);
              noRepeat.unshift(a.id);
            }
          }
        });
      });
    });
  }
  if (object.materias.length === 0) {
    newallProfesores = [...allProfesores];
  }

  if (object.pais) {
    if (object.pais === "") {
      newallProfesores = newallProfesores;
    }
    if (object.pais !== "") {
      const provisonal = newallProfesores.filter(
        (f) => f.country.name === object.pais
      );
      newallProfesores = provisonal;
    }
  }

  if (object.puntuacion) {
    if (object.puntuacion === "") {
      newallProfesores = newallProfesores;
    }
    if (object.puntuacion === "Puntuación de menor a mayor") {
      function SortArray(x, y) {
        if (x.puntuacion < y.puntuacion) {
          return -1;
        }
        if (x.puntuacion > y.puntuacion) {
          return 1;
        }
        return 0;
      }
      newallProfesores = newallProfesores.sort(SortArray);
    }
    if (object.puntuacion === "Puntuación de mayor a menor") {
      function SortArray(y, x) {
        if (x.puntuacion < y.puntuacion) {
          return -1;
        }
        if (x.puntuacion > y.puntuacion) {
          return 1;
        }
        return 0;
      }
      newallProfesores = newallProfesores.sort(SortArray);
    }
  }

  if (object.precio) {
    console.log("entro precio");
    if (object.precio === "") {
      console.log("entro sin");
      newallProfesores = newallProfesores;
    }
    if (object.precio === "Precio de menor a mayor") {
      console.log("entro menor");
      function SortArray(x, y) {
        if (x.precio < y.precio) {
          return -1;
        }
        if (x.precio > y.precio) {
          return 1;
        }
        return 0;
      }
      newallProfesores = newallProfesores.sort(SortArray);
    }
    if (object.precio === "Precio de mayor a menor") {
      console.log("entro mayor");
      function SortArray(y, x) {
        if (x.precio < y.precio) {
          return -1;
        }
        if (x.precio > y.precio) {
          return 1;
        }
        return 0;
      }
      newallProfesores = newallProfesores.sort(SortArray);
    }
  }

  if (newallProfesores.length === 0) {
    newallProfesores = [{ error: "no matches to show." }];
    return newallProfesores;
  } else {
    return newallProfesores;
  }
};
