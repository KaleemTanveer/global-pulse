import React from "react";

type CardProps = {
  title: string;
  children: React.ReactNode;
};

export default function Card({ title, children }: CardProps) {
  return (
    <div className="bg-white/80 backdrop-blur p-5 rounded-2xl shadow-md hover:shadow-xl transition duration-300 border">
      <h2 className="text-lg font-semibold mb-3 text-gray-800">
        {title}
      </h2>
      <div className="text-gray-700">{children}</div>
    </div>
  );
}