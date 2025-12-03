import { useState } from "react";
import TeethDiagram from "./lib/TeethDiagram";

function App() {
  const [selectedTeeth, setSelectedTeeth] = useState({
    "tooth-11": true,
  });

  const handleTeethChange = (map, info) => {
    if (!info.isSelected) {
      setSelectedTeeth({ ...map, [info.id]: true });
    } else {
      setSelectedTeeth({ ...map, [info.id]: false });
    }
  };

  return (
    <TeethDiagram selectedTeeth={selectedTeeth} onChange={handleTeethChange} />
  );
}

export default App;
