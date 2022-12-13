import { useState } from "react";
import { useSelector } from "react-redux";
import "./SearchBar.css";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

export const SearchBar = () => {
  const theme = useSelector(state => state.theme.theme)
  const navigate = useNavigate();
  const allTeachers = useSelector((state) => state.profesores.profesores);
  const arrProfesores = allTeachers.map((ele) => ele.username);
  const [sugerencias, setSugerencias] = useState([]);
  const [text, setText] = useState("");

  const handleComplete = (nameTeacher) => {
    let idTeach = allTeachers.find((el) => el.username == nameTeacher);
    let idLimpio = idTeach.id;
    navigate(`/profesores/${idLimpio}`);
  };
  //------------- MANIPULADOR  TECLA ARROW ↑ ↓ ----------
  const handleKeyDown = (e) => {
    const posicion = sugerencias.indexOf(text);
    if (e.key === "Enter") {
      onSuggestHandler(text);
      e.preventDefault();
    }
    if (e.key === "ArrowUp") {
      if (posicion >= 0) {
        setText(sugerencias[posicion - 1]);
      } else {
        setText(sugerencias[sugerencias.length - 1]);
      }
    }
    if (e.key === "ArrowDown") {
      if (posicion < sugerencias.length) {
        setText(sugerencias[posicion + 1]);
      }
      if (posicion === sugerencias.length) {
        setText(sugerencias[posicion]);
      }
    }
  };
  //-------------MANIPULADOR CAMBIA INPUT--
  const onChangeInput = (text) => {
    let matches = [];
    let short = [];
    if (text.length > 0) {
      matches = arrProfesores.filter((name) => {
        const regex = new RegExp(`${text}`, "gi");
        return name.match(regex);
      });
    }
    matches.map((m, i) => {
      if (i < 5) {
        short.push(m);
      }
    });
    setSugerencias(short);
    setText(text);
  };
  //-------------------------------------
  const onSuggestHandler = (text) => {
    //deberia llevarme al detalle
    if (text.length > 0) {
      setText(text);
      handleComplete(text);
      setSugerencias([]);
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    onSuggestHandler(text);
  };

  return (
    <div className="contenedorWrapper position-relative">
      <form
        className="wrapper"
        onSubmit={(e) => {
          onSubmitHandler(e);
        }}
      >
        <div className="search-input">
          <div className="position-relative bg-light rounded-5 p-1">
            <input
              className="searchInput form-control rounded-5 border-0 fs-5 p-1"
              type="text"
              placeholder="buscar.."
              value={text}
              onBlur={() => {
                setTimeout(() => {
                  setSugerencias([]);
                }, 200);
              }}
              onChange={(e) => {
                onChangeInput(e.target.value);
              }}
              onKeyDown={(e) => {
                handleKeyDown(e);
              }}
              style={{ marginLeft: ".3rem" }}
            ></input>

            <button
              type="submit"
              className="btn position-absolute"
              style={{ top: "5px", right: "5px" }}
            >
              <FaSearch className="text-primary fs-5" />
            </button>
          </div>
        </div>
        <div
          style={{ zIndex: "1000" }}
          className="mt-1 position-absolute w-100 bg-light text-dark rounded-1 dark_sugerencias"
        >
          {sugerencias &&
            sugerencias.map((sugName) => (
              <div
                key={sugName}
                className={`p-1 hover-searchbar-options sugerencia_option`}
                onBlur={() => {
                  setTimeout(() => {
                    setSugerencias([]);
                  }, 1);
                }}
                onClick={() => onSuggestHandler(sugName)}
              >
                {sugName}
              </div>
            ))}
        </div>
      </form>
    </div>
  );
};
export default SearchBar;
