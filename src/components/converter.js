import { useEffect, useState } from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { AiOutlineHeart } from "react-icons/ai";
import { TbArrowsRightLeft } from "react-icons/tb";
import { RiCloseLine } from "react-icons/ri";

export function Converter() {
  const [list, setList] = useState([
    {
      id: "",
      from: "",
      unit1: "",
      unit2: "",
      to: "",
    },
  ]);
  const [listItem, setListItem] = useState("");
  const [choice, setChoice] = useState();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (listItem) {
      let id = Math.floor(Math.random() * 10000);
      let newList = {
        id: id,
        from: firstValue,
        unit1: listItem,
        unit2: result,
        to: secondValue,
      };
      setList([newList, ...list]);
      setListItem("");
      console.log(list);
    } else {
      setListItem("");
    }
  };

  const deleteList = (id) => {
    let newList = list.filter((list) => list.id !== id);
    setList([...newList]);
  };

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem("List"));
    if (list) {
      setList(list);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("List", JSON.stringify(list));
  }, [list]);

  function flip() {
    setChoice(secondValue);
  }

  let result = 0;
  let firstValue = "";
  let secondValue = "";

  switch (choice) {
    case "km":
      firstValue = "km";
      secondValue = "miles";
      result = parseFloat((listItem * 0.621371).toFixed(2));
      break;
    case "miles":
      firstValue = "miles";
      secondValue = "km";
      result = parseFloat((listItem * 1.60934).toFixed(2));
      break;
    case "m":
      firstValue = "m";
      secondValue = "feet";
      result = parseFloat((listItem * 3.28084).toFixed(2));
      break;
    case "feet":
      firstValue = "feet";
      secondValue = "m";
      result = parseFloat((listItem * 0.3048).toFixed(2));
      break;
    case "cm":
      firstValue = "cm";
      secondValue = "inches";
      result = parseFloat((listItem * 0.393701).toFixed(2));
      break;
    case "inches":
      firstValue = "inches";
      secondValue = "cm";
      result = parseFloat((listItem * 2.54).toFixed(2));
      break;
    default:
      break;
  }

  return (
    <div className="converter-block">
      <div className="select-block">
        <h2 className="title">convert</h2>
        <div className="converting">
          <div className="choice">
            <select
              className="select"
              value={choice}
              defaultValue={"default"}
              onChange={(e) => {
                setChoice(e.target.value);
              }}
            >
              <option value={"default"} disabled>
                Choose an option
              </option>
              <option value={"km"}>km &gt; miles</option>
              <option value={"miles"}>miles &gt; km</option>
              <option value={"m"}>m &gt; feet</option>
              <option value={"feet"}>feet &gt; m</option>
              <option value={"cm"}>cm &gt; inches</option>
              <option value={"inches"}>inches &gt; cm</option>
            </select>
            <hr></hr>
          </div>

          <TbArrowsRightLeft
            size="20px"
            onClick={() => {
              flip();
            }}
          />
          <form className="form" onSubmit={handleSubmit}>
            <div className="focus">
              <input
                className="input-num"
                type="number"
                value={listItem}
                name="unit1"
                onChange={(evt) => {
                  setListItem(evt.target.value);
                }}
              />
              <hr></hr>
            </div>
            <span>{firstValue}</span>
          </form>
        </div>
        <div className="block-result">
          <AiOutlineHeart className="heart" onClick={handleSubmit} />
          <div className="result">
            <p className="result-num">{result}</p>
            <p>{secondValue}</p>
          </div>
        </div>
      </div>
      <h3 className="saved-title">saved</h3>
      <div className="saving">
        {list.map((item) => (
          <div className="saved-block" key={item.id}>
            <div className="orco">
              <p className="elements">{item.unit1}</p>
              <p className="elements">{item.from}</p>
              <HiOutlineArrowNarrowRight className="elements" />
              <p className="elements">{item.to}</p>
              <p className="elements">{item.unit2}</p>
            </div>
            <RiCloseLine
              className="delete"
              onClick={() => deleteList(item.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
