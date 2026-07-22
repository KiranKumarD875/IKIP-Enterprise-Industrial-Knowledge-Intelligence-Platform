"use client";

import { useEffect, useRef, useState } from "react";
import ForceGraph2D from "react-force-graph-2d";

export default function DynamicGraph({ data, onNodeSelect }: { data: any, onNodeSelect?: (node: any) => void }) {
  const fgRef = useRef<any>();
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  useEffect(() => {
    if (!containerRef.current) return;
    
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.target === containerRef.current) {
          setDimensions({
            width: entry.contentRect.width,
            height: entry.contentRect.height,
          });
        }
      }
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    // Re-center when data changes
    if (fgRef.current) {
      fgRef.current.d3Force("charge").strength(-300); // spread nodes out
      setTimeout(() => {
        fgRef.current?.zoomToFit(400, 50);
      }, 800);
    }
  }, [data]);

  return (
    <div ref={containerRef} className="w-full h-full relative cursor-crosshair">
      <ForceGraph2D
        ref={fgRef}
        graphData={data}
        nodeLabel="name"
        nodeColor="color"
        nodeVal="val"
        linkColor={() => "#cbd5e1"}
        linkWidth={1.5}
        width={dimensions.width}
        height={dimensions.height}
        onNodeClick={(node) => {
          fgRef.current?.centerAt(node.x, node.y, 1000);
          fgRef.current?.zoom(4, 2000);
          if (onNodeSelect) onNodeSelect(node);
        }}
        nodeCanvasObjectMode={() => "after"}
        nodeCanvasObject={(node: any, ctx, globalScale) => {
          // Draw text label on nodes if zoomed in enough
          if (globalScale > 2) {
            const label = node.name;
            const fontSize = 12 / globalScale;
            ctx.font = `${fontSize}px Sans-Serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#1e293b'; // slate-800
            ctx.fillText(label, node.x, node.y + (Math.sqrt(Math.max(0, node.val || 1)) * 4) + (fontSize * 1.5));
          }
        }}
      />
    </div>
  );
}
