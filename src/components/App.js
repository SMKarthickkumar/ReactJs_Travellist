import logo from "../logo.svg";
import "../App.css";
import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

const initialList = [
  {
    Id: 1,
    Description: "passport",
    Quantity: 2,
    Packed: false,
  },
  {
    Id: 2,
    Description: "passport photo",
    Quantity: 1,
    Packed: false,
  },
];

function App() {
  const [items, setItem] = useState([]);

  function handleDelete(id) {
    console.log(id);
    const updatedItems = items.filter((item) => item.id !== id);
    setItem(updatedItems);
  }

  function handleToggle(id) {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, Packed: !item.Packed } : item
    );
    setItem(updatedItems);
  }

  function handleClearList() {
    const confirmed = window.confirm(
      "Are you sure you want to delete All item...?"
    );
    if (confirmed) setItem([]);
  }

  return (
    <div>
      <Logo />
      <Form setItem={setItem} items={items} />
      <PackingList
        item={items}
        onhandleDelete={handleDelete}
        onhandleToggle={handleToggle}
        onhandleClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}

export default App;
