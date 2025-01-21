import React from "react";
import Dropdown from "./Dropdown.tsx";

const Navbar: React.FC = () => {
  const navItems = [
    {
      title: "How it Works",
      items: [
        { label: "Submenu One", value: "Submenu One Value" },
        { label: "Submenu Two", value: "Submenu Two Value" },
        { label: "Submenu Three", value: "Submenu Three Value" },
      ],
    },
    {
      title: "Personal Training",
      items: [
        { label: "Submenu One", value: "Submenu One Value" },
        { label: "Submenu Two", value: "Submenu Two Value" },
        { label: "Submenu Three", value: "Submenu Three Value" },
      ],
    },
    {
      title: "Fitness Bundles",
      items: [
        { label: "Submenu One", value: "Submenu One Value" },
        { label: "Submenu Two", value: "Submenu Two Value" },
        { label: "Submenu Three", value: "Submenu Three Value" },
      ],
    },
    {
      title: "Our Mission",
      items: [
        { label: "Submenu One", value: "Submenu One Value" },
        { label: "Submenu Two", value: "Submenu Two Value" },
        { label: "Submenu Three", value: "Submenu Three Value" },
      ],
    },
    {
      title: "Get in Touch",
      items: [
        { label: "Submenu One", value: "Submenu One Value" },
        { label: "Submenu Two", value: "Submenu Two Value" },
        { label: "Submenu Three", value: "Submenu Three Value" },
      ],
    },
    {
      title: "Meet the Team",
      items: [
        { label: "Submenu One", value: "Submenu One Value" },
        { label: "Submenu Two", value: "Submenu Two Value" },
        { label: "Submenu Three", value: "Submenu Three Value" },
      ],
    },
  ];

  const handleSelect = (value: string) => {
    console.log("Selected:", value);
  };

  const navBarStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "flex-end",
    gap: "20px",
    padding: "10px 20px",
    backgroundColor: "#FF9E00D9",
    color: "black",
  };

  return (
    <nav style={navBarStyle}>
      {navItems.map((navItem, index) => (
        <Dropdown
          key={index}
          items={navItem.items}
          onSelect={handleSelect}
          placeholder={navItem.title}
        />
      ))}
    </nav>
  );
};

export default Navbar;
