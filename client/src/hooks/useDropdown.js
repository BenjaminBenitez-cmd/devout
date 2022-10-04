import { useState } from "react";

const useDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return { isOpen, toggleOpen };
};

export default useDropdown;
