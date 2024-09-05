import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

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

  return (
    <div>
      <Logo />
      <Form setItem={setItem} items={items} />
      <PackingList
        item={items}
        onhandleDelete={handleDelete}
        onhandleToggle={handleToggle}
      />
      <Stats items={items} />
    </div>
  );
}

export default App;

function Logo() {
  return (
    <div className="logo">
      <h1>🌲Far Away 💼</h1>
    </div>
  );
}
function Form({ setItem, items }) {
  const [description, setdescription] = useState("");
  const [quantity, setquantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    const newItem = { description, quantity, Packed: false, id: Date.now() };

    setItem((items) => [...items, newItem]);

    if (!description) return;

    setdescription("");
    setquantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select value={quantity} onChange={(e) => setquantity(e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setdescription(e.target.value)}
      ></input>
      <button>Add</button>
    </form>
  );
}
function PackingList({ item, onhandleDelete, onhandleToggle }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") sortedItems = item;

  if (sortBy === "description")
    sortedItems = item
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === "packed")
    sortedItems = item
      .slice()
      .sort((a, b) => Number(a.Packed) - Number(b.Packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            onhandleDelete={onhandleDelete}
            onhandleToggle={onhandleToggle}
            key={item.id}
          />
        ))}
      </ul>

      <div>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description order</option>
          <option value="packed">Sort by Packed stats</option>
        </select>
      </div>
    </div>
  );
}

function Item({ item, onhandleDelete, onhandleToggle }) {
  return (
    <li key={item.id}>
      <input
        type="checkbox"
        value={item.Packed}
        onChange={() => onhandleToggle(item.id)}
      ></input>
      <p>{item.quantity}</p>
      <span style={item.Packed ? { textDecoration: "line-through" } : {}}>
        {item.description}
      </span>
      <button onClick={() => onhandleDelete(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  if (!items.length) {
    return (
      <footer>
        <p className="stats">
          <em>
            No items on your list. Add some by filling out the form above!
          </em>
        </p>
      </footer>
    );
  }

  const itemLength = items.length;
  const packedItems = items.filter((item) => item.Packed).length;
  const packedPercentage = Math.round((packedItems / itemLength) * 100);

  return (
    <footer className="stats">
      <span>
        {packedPercentage === 100
          ? "Now you Ready to ✈️"
          : `🎒You have ${itemLength} item on your list, and you already packed
        ${packedItems} (${packedPercentage}%)`}
      </span>
    </footer>
  );
}
