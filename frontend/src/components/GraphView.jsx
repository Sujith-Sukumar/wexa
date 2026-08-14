import {
  ReactFlow,
  Background,
  Controls,
  MiniMap
} from "reactflow";

import "reactflow/dist/style.css";

const GraphView = ({
  nodes = [],
  edges = [],
  height = 550
}) => {

  const formattedNodes = nodes.map(
    (node, index) => ({
      id: node.id,

      data: {
        label: (
          <div className="graph-node-content">
            <strong>
              {node.label}
            </strong>

            <span>
              {node.type}
            </span>
          </div>
        )
      },

      position: {
        x: 100 + (index % 3) * 280,
        y: 100 + Math.floor(index / 3) * 180
      },

      className: `graph-node graph-node-${node.type}`
    })
  );

  const formattedEdges = edges.map(
    (edge, index) => ({
      id: edge.id || `edge-${index}`,

      source: edge.source,

      target: edge.target,

      label: edge.label,

      animated: false,

      style: {
        strokeWidth: 2
      }
    })
  );

  return (
    <div
      className="graph-container"
      style={{ height }}
    >

      <ReactFlow
        nodes={formattedNodes}
        edges={formattedEdges}
        fitView
        attributionPosition="bottom-left"
      >

        <Background />

        <Controls />

        <MiniMap />

      </ReactFlow>

    </div>
  );
};

export default GraphView;