"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";

const animals = [
  { id: 1, name: "Froggie" },
  { id: 2, name: "Bacon" },
  { id: 3, name: "Ducky" },
  { id: 4, name: "Bunny" },
  { id: 5, name: "Moo" },
  { id: 6, name: "Sheep" },
  { id: 7, name: "QueenBee" },
  { id: 8, name: "Ted" },
  { id: 9, name: "Koala" },
  { id: 10, name: "Alpaca" },
  { id: 11, name: "Penguin" },
  { id: 12, name: "Cat" },
];

const ProductsTool = () => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast.success(`Copied "${text}" to clipboard!`);
      },
      () => {
        toast.error("Failed to copy to clipboard.");
      }
    );
  };

  const copyBoth = (id: number, name: string) => {
    copyToClipboard(`${id}_${name}`);
  };

  return (
    <div className="items-center flex">
      <h1>Animal List</h1>
      <ul className="mx-auto text-2xl">
        {animals.map((animal) => (
          <li key={animal.id}>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => copyToClipboard(animal.id.toString())}
            >
              {animal.id}
            </span>
            :
            <span
              style={{ cursor: "pointer" }}
              onClick={() => copyToClipboard(animal.name)}
            >
              {animal.name}
            </span>
            &nbsp;|&nbsp;
            <span
              style={{ cursor: "pointer" }}
              onClick={() => copyBoth(animal.id, animal.name)}
            >
              both
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsTool;
