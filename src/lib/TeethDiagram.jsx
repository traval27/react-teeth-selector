import { useEffect, useRef } from "react";
import teethSelection from "../assets/teeth-selection.svg";

function TeethDiagram({
  defaultSelected = {},
  selectedTeeth,
  onChange,
  width = 350,
  height = "auto",
  defaultColor = "#9e9e9e",
  hoverColor = "#117CCF",
  selectedColor = "#34C759",
}) {
  const containerRef = useRef(null);
  const pathsRef = useRef({});
  const tooltipRef = useRef(null);

  const isControlled = selectedTeeth !== undefined;

  // Internal state (used only for initial load)
  const internalSelected = useRef({});

  // Init internal only once
  useEffect(() => {
    if (!isControlled) {
      internalSelected.current = { ...defaultSelected };
    }
  }, []);

  // Apply colors when external selection changes
  function updatePathColors() {
    const map = internalSelected.current;
    Object.entries(pathsRef.current).forEach(([id, path]) => {
      const isSel = map[id];
      path.style.fill = isSel ? selectedColor : defaultColor;
    });
  }

  // Sync controlled mode
  useEffect(() => {
    if (isControlled) {
      internalSelected.current = { ...selectedTeeth };
      updatePathColors();
    }
  }, [selectedTeeth]);

  // Tooltip creation once
  useEffect(() => {
    const tip = document.createElement("div");
    tip.style.position = "fixed";
    tip.style.padding = "4px 8px";
    tip.style.borderRadius = "4px";
    tip.style.fontSize = "12px";
    tip.style.background = "#000";
    tip.style.color = "#fff";
    tip.style.pointerEvents = "none";
    tip.style.whiteSpace = "nowrap";
    tip.style.zIndex = "99999";
    tip.style.display = "none";

    document.body.appendChild(tip);
    tooltipRef.current = tip;

    return () => tip.remove();
  }, []);

  // Load SVG once
  useEffect(() => {
    async function loadSVG() {
      const res = await fetch(teethSelection);
      const svgText = await res.text();

      if (!containerRef.current) return;

      containerRef.current.innerHTML = svgText;
      const svgEl = containerRef.current.querySelector("svg");
      if (!svgEl) return;

      const paths = svgEl.querySelectorAll("path");
      pathsRef.current = {};

      paths.forEach((path) => {
        const originalId = path.id;
        const id = `tooth-${originalId}`;

        path.setAttribute("id", id);
        path.style.cursor = "pointer";
        path.style.transition = "fill 0.2s ease";

        pathsRef.current[id] = path;

        const bbox = path.getBBox();
        const hit = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "rect"
        );
        hit.setAttribute("x", bbox.x - 2);
        hit.setAttribute("y", bbox.y - 2);
        hit.setAttribute("width", bbox.width + 4);
        hit.setAttribute("height", bbox.height + 4);
        hit.setAttribute("fill", "transparent");
        hit.style.cursor = "pointer";

        // Hover
        hit.addEventListener("mouseenter", (e) => {
          const selectedObj = internalSelected.current[id];
          if (!selectedObj) path.style.fill = hoverColor;

          const tip = tooltipRef.current;
          tip.textContent = `Tooth ${originalId}`;
          tip.style.display = "block";
          tip.style.left = `${e.clientX}px`;
          tip.style.top = `${e.clientY - 20}px`;
        });

        hit.addEventListener("mousemove", (e) => {
          const tip = tooltipRef.current;
          tip.style.left = `${e.clientX}px`;
          tip.style.top = `${e.clientY - 20}px`;
        });

        hit.addEventListener("mouseleave", () => {
          const selectedObj = internalSelected.current[id];
          path.style.fill = selectedObj ? selectedColor : defaultColor;
          tooltipRef.current.style.display = "none";
        });

        // CLICK — INFO MODE ONLY (NO TOGGLE)
        hit.addEventListener("click", (e) => {
          const isSel = !!internalSelected.current[id];

          const svgRect = svgEl.getBoundingClientRect();
          const pos = {
            x: svgRect.left + bbox.x + bbox.width / 2,
            y: svgRect.top + bbox.y,
          };

          onChange?.(internalSelected.current, {
            id,
            number: originalId,
            isSelected: isSel,
            event: e,
            position: pos,
          });
        });

        path.parentNode.insertBefore(hit, path.nextSibling);
      });

      updatePathColors();
    }

    loadSVG();

    return () => {
      pathsRef.current = {};
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width,
        height,
      }}
    />
  );
}

export default TeethDiagram;
