import React, { useState } from "react";

interface DropdownItem {
  label: string;
  value: string;
}

interface DropdownProps {
  items: DropdownItem[];
  onSelect: (value: string) => void;
  placeholder?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  items,
  onSelect,
  placeholder = "Select an option",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DropdownItem | null>(null);

  const handleSelect = (item: DropdownItem) => {
    //setSelectedItem(item);
    onSelect(item.value);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const dropdownStyle: React.CSSProperties = {
    position: "relative",
    display: "inline-block",
  };

  const triggerStyle: React.CSSProperties = {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "#FF9E00D9",
  };

  const dropdownListStyle: React.CSSProperties = {
    position: "absolute",
    top: "100%",
    left: 0,
    listStyle: "none",
    margin: 0,
    padding: 0,
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    borderRadius: "5px",
    width: "100%",
    zIndex: 10,
  };

  const dropdownItemStyle: React.CSSProperties = {
    padding: "10px",
    cursor: "pointer",
  };

  return (
    <div style={dropdownStyle}>
      <div onClick={toggleDropdown} style={triggerStyle}>
        {selectedItem ? selectedItem.label : placeholder}
      </div>

      {isOpen && (
        <ul style={dropdownListStyle}>
          {items.map((item) => (
            <li
              key={item.value}
              onClick={() => handleSelect(item)}
              style={dropdownItemStyle}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
