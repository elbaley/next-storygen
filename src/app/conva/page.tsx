"use client";

import { Stage, Layer, Text, Group } from "react-konva";
import { BASE_HEIGHT, BASE_WIDTH } from "@/constants";
import { useState, useRef } from "react";

export default function Page() {
  const [texts, setTexts] = useState([
    { id: 1, text: "Hello World", x: 0, y: 0, fontSize: 24 },
    { id: 2, text: "Konva Text", x: 100, y: 150, fontSize: 18 },
  ]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddText = () => {
    setTexts([
      ...texts,
      { id: Date.now(), text: "New Text", x: 20, y: 20, fontSize: 20 },
    ]);
  };

  const handleDeleteText = (id: number) => {
    setTexts(texts.filter((text) => text.id !== id));
  };

  const handleEditText = (id: number) => {
    setEditingId(id);
    const text = texts.find((t) => t.id === id);
    if (text && inputRef.current) {
      inputRef.current.value = text.text;
      inputRef.current.focus();
    }
  };

  const handleUpdateText = () => {
    if (editingId !== null && inputRef.current) {
      const newText = inputRef.current.value;
      setTexts(
        texts.map((t) => (t.id === editingId ? { ...t, text: newText } : t)),
      );
      setEditingId(null);
    }
  };

  return (
    <main className="w-full">
      <h1>Konva</h1>
      <button onClick={handleAddText}>Add Text</button>
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f0f0f0",
        }}
      >
        <div
          style={{
            width: `${BASE_WIDTH}px`,
            height: `${BASE_HEIGHT}px`,
            border: "1px solid black",
            position: "relative",
          }}
        >
          {/* Konva Sahnesi */}
          <Stage width={BASE_WIDTH} height={BASE_HEIGHT}>
            <Layer>
              {texts.map((t) => (
                <Group
                  key={t.id}
                  draggable
                  onDragEnd={(e) => {
                    console.log(e.target.x(), e.target.y());
                  }}
                >
                  <Text
                    text={t.text}
                    x={t.x}
                    y={t.y}
                    fontSize={t.fontSize}
                    fill="black"
                    onDblClick={() => handleEditText(t.id)}
                  />
                  <Text
                    text="✖"
                    x={t.x + 80}
                    y={t.y - 10}
                    fontSize={18}
                    fill="red"
                    onClick={() => handleDeleteText(t.id)}
                  />
                </Group>
              ))}
            </Layer>
          </Stage>
          {editingId !== null && (
            <input
              ref={inputRef}
              type="text"
              className="text-foreground"
              style={{
                position: "absolute",
                top: `${texts.find((t) => t.id === editingId)?.y || 0}px`,
                left: `${texts.find((t) => t.id === editingId)?.x || 0}px`,
                zIndex: 10,
                fontSize: "16px",
              }}
              onBlur={handleUpdateText}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleUpdateText();
              }}
            />
          )}
        </div>
      </div>
    </main>
  );
}
