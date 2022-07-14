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

    let id = Math.floor(Math.random() * 100000);
    let newList = {
      id: id,
      from: firstValue,
      unit1: listItem,
      unit2: result,
      to: secondValue,
    };
    setList([newList, ...list]);
    setListItem("");
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

  function flip(e) {
    setChoice(secondValue);
    setListItem(result);
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
    case "metres":
      firstValue = "metres";
      secondValue = "feet";
      result = parseFloat((listItem * 3.28084).toFixed(2));
      break;
    case "feet":
      firstValue = "feet";
      secondValue = "metres";
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
          <div className="choice-media">
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
                <option value={"km"}>km &rarr; miles</option>
                <option value={"miles"}>miles &rarr; km</option>
                <option value={"metres"}>metres &rarr; feet</option>
                <option value={"feet"}>feet &rarr; metres</option>
                <option value={"cm"}>cm &rarr; inches</option>
                <option value={"inches"}>inches &rarr; cm</option>
              </select>
              <hr></hr>
            </div>

            <TbArrowsRightLeft
              className="flip"
              onClick={() => {
                flip();
              }}
            />
          </div>
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
            <div className="paragraph">
              <p className="elements">{item.unit1}</p>
              <p className="elements">{item.from}</p>
              <HiOutlineArrowNarrowRight className="elements" />
              <p className="elements">{item.unit2}</p>
              <p className="elements">{item.to}</p>
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
