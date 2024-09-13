import { useState } from "react";
import Item from "./Item";

export default function PackingList({
  item,
  onhandleDelete,
  onhandleToggle,
  onhandleClearList,
}) {
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
        <button onClick={onhandleClearList}>Clear list</button>
      </div>
    </div>
  );
}
