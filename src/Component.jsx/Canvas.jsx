import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";

const Canvas = () => {
  const [circles, setCircles] = useState([]);

  const canvasRef = useRef();

  const getRandomColor = () => {
    return `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")}`;
  };

  const handleCanvasClick = (e) => {
    const point = e.target.getBoundingClientRect();
    const x = e.clientX - point.left;
    const y = e.clientY - point.top;
    const radius = Math.random() * 50 + 50;
    let color = getRandomColor();
    const newCricle = { x, y, radius, color };
    setCircles([...circles, newCricle]);

    const isOverlapping = checkOverlap(newCricle, circles);

    if (isOverlapping) {
      newCricle.color = `red`;
    }
  };

  const checkOverlap = (newCircle, existingCircles) => {
    return existingCircles.some((circle) => {
      const distance = Math.sqrt(
        Math.pow(circle.x - newCircle.x, 2) +
          Math.pow(circle.y - newCircle.y, 2)
      );
      return distance < circle.radius + newCircle.radius;
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

    circles.forEach((circle) => {
      context.beginPath();
      context.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI, false);
      context.fillStyle = circle.color;
      context.fill();
    });
  }, [circles]);

  useEffect(() => {
    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      onClick={handleCanvasClick}
      width="1200"
      height="800"
      style={{ border: "1px solid black" }}
    ></canvas>
  );
};

export default Canvas;
