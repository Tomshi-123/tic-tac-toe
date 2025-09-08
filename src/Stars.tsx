import React from "react";

function Stars() {
  const colors = ['#6ae3ff', '#ffe066', '#fc6c9c', '#fff', '#a3ffb0'];

  return (
    <div className="stars">
      {Array.from({ length: 40 }).map((_, i) => {
        const size = Math.random() * 4 + 2;
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const delay = Math.random() * 2;
        return (
          <div
            key={i}
            className="star"
            style={{
              width: size,
              height: size,
              top: `${top}vh`,
              left: `${left}vw`,
              background: color,
              boxShadow: `0 0 8px 2px ${color}`,
              animationDelay: `${delay}s`
            }}
          />
        );
      })}
    </div>
  );
}

export default Stars;