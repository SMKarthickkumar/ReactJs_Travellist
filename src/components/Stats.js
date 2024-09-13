export default function Stats({ items }) {
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
