import type { Node, NodeTypes } from "reactflow";
import { PositionLoggerNode } from "./PositionLoggerNode";

export const initialNodes = [
  {
    id: "a",
    type: "input",
    position: { x: 0, y: 0 },
    data: { label: "Create" },
  },
  {
    id: "b",
    type: "position-logger",
    position: { x: -100, y: 100 },
    data: { label: "your flow" },
  },
  { id: "c", position: { x: 100, y: 100 }, data: { label: "with" } },
  {
    id: "d",
    type: "output",
    position: { x: 0, y: 200 },
    data: { label: "AI!" },
  },
] satisfies Node[];

export const nodeTypes = {
  "position-logger": PositionLoggerNode,
  // Add any of your custom nodes here!
} satisfies NodeTypes;
