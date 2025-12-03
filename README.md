# react-teeth-selector

A lightweight, SVG-based **interactive teeth diagram selector** for React.

Perfect for dental applications, medical software, EHR/EMR systems, clinical dashboards, or any UI that needs tooth selection.

## Features

✔ Select teeth by clicking  
✔ Hover highlight & tooltip  
✔ Supports controlled & uncontrolled states  
✔ Callback gives selected map + popup position  
✔ Works with any UI library  
✔ No dependencies (only React)  
✔ SVG-based, pixel-perfect diagram  
✔ Customizable size & styling  
✔ Lightweight and fast  

## Installation
```bash
npm install react-teeth-selector
or
yarn add react-teeth-selector
```
## Demo
<p align="center">
  <img src="https://raw.githubusercontent.com/traval27/react-teeth-selector/main/demo.gif" width="350" />
</p>

## Quick Usage
```bash
import { useState } from "react";
import { TeethDiagram } from "react-teeth-selector";

function App() {
  const [selectedTeeth, setSelectedTeeth] = useState({});

  return (
    <TeethDiagram
      selectedTeeth={selectedTeeth}
      onChange={(newMap) => setSelectedTeeth(newMap)}
    />
  );
}

export default App;
```

## Controlled mode
```bash
<TeethDiagram
  selectedTeeth={selected}
  onChange={(updated) => setSelected(updated)}
/>
```
## Uncontrolled mode
```bash
<TeethDiagram defaultSelected={{ "tooth-11": true }} />
```

## Props
| Prop            | Type           | Default  | Description            |
| --------------- | -------------- | -------- | ---------------------- |
| selectedTeeth   | `{[id]: true}` | —        | Controlled mode        |
| defaultSelected | `{[id]: true}` | `{}`     | Initial selected teeth |
| onChange        | function       | —        | Tooth click callback   |
| width           | number/string  | `350`    | Component width        |
| height          | number/string  | `"auto"` | Component height       |


## Local Development
```bash
npm install
npm run dev
```

## Build library
```bash
npm run build
```

## Contributing
PRs, issues, and suggestions are welcome!
