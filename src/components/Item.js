export default function Item({ item, onhandleDelete, onhandleToggle }) {
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
