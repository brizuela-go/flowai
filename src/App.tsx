import type { OnConnect } from "reactflow";
import { useCallback, useState } from "react";
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
} from "reactflow";
import OpenAI from "openai";
import Confetti from "react-confetti";

import "reactflow/dist/style.css";

import { initialNodes, nodeTypes } from "./nodes";
import { initialEdges, edgeTypes } from "./edges";

// Initialize OpenAI API
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY as string,
  dangerouslyAllowBrowser: true,
});

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confetti, setConfetti] = useState(false);

  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((edges) => addEdge(connection, edges)),
    [setEdges]
  );

  const createNewFlowWithAi = async () => {
    setLoading(true);
    try {
      // Call OpenAI API to get the new flow structure
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `Based on the following typescript types: 

          Edge: 

import type { CSSProperties, ComponentType, HTMLAttributes, ReactNode, MouseEvent as ReactMouseEvent } from 'react';
import { ConnectionStatus, Position } from '.';
import type { Connection, HandleElement, HandleType, Node } from '.';
type EdgeLabelOptions = {
    label?: string | ReactNode;
    labelStyle?: CSSProperties;
    labelShowBg?: boolean;
    labelBgStyle?: CSSProperties;
    labelBgPadding?: [number, number];
    labelBgBorderRadius?: number;
};
type DefaultEdge<T = any> = {
    id: string;
    type?: string;
    source: string;
    target: string;
    sourceHandle?: string | null;
    targetHandle?: string | null;
    style?: CSSProperties;
    animated?: boolean;
    hidden?: boolean;
    deletable?: boolean;
    data?: T;
    className?: string;
    sourceNode?: Node;
    targetNode?: Node;
    selected?: boolean;
    markerStart?: EdgeMarkerType;
    markerEnd?: EdgeMarkerType;
    zIndex?: number;
    ariaLabel?: string;
    interactionWidth?: number;
    focusable?: boolean;
    updatable?: EdgeUpdatable;
} & EdgeLabelOptions;
export type EdgeUpdatable = boolean | HandleType;
export type SmoothStepPathOptions = {
    offset?: number;
    borderRadius?: number;
};
type SmoothStepEdgeType<T> = DefaultEdge<T> & {
    type: 'smoothstep';
    pathOptions?: SmoothStepPathOptions;
};
export type BezierPathOptions = {
    curvature?: number;
};
type BezierEdgeType<T> = DefaultEdge<T> & {
    type: 'default';
    pathOptions?: BezierPathOptions;
};
export type Edge<T = any> = DefaultEdge<T> | SmoothStepEdgeType<T> | BezierEdgeType<T>;
export type DefaultEdgeOptions = Omit<Edge, 'id' | 'source' | 'target' | 'sourceHandle' | 'targetHandle' | 'sourceNode' | 'targetNode'>;
export type EdgeMouseHandler = (event: ReactMouseEvent, edge: Edge) => void;
export type WrapEdgeProps<T = any> = Omit<Edge<T>, 'sourceHandle' | 'targetHandle'> & {
    onClick?: EdgeMouseHandler;
    onEdgeDoubleClick?: EdgeMouseHandler;
    sourceHandleId?: string | null;
    targetHandleId?: string | null;
    sourceX: number;
    sourceY: number;
    targetX: number;
    targetY: number;
    sourcePosition: Position;
    targetPosition: Position;
    elementsSelectable?: boolean;
    onEdgeUpdate?: OnEdgeUpdateFunc;
    onContextMenu?: EdgeMouseHandler;
    onMouseEnter?: EdgeMouseHandler;
    onMouseMove?: EdgeMouseHandler;
    onMouseLeave?: EdgeMouseHandler;
    edgeUpdaterRadius?: number;
    onEdgeUpdateStart?: (event: ReactMouseEvent, edge: Edge, handleType: HandleType) => void;
    onEdgeUpdateEnd?: (event: MouseEvent | TouchEvent, edge: Edge, handleType: HandleType) => void;
    rfId?: string;
    isFocusable: boolean;
    isUpdatable: EdgeUpdatable;
    pathOptions?: BezierPathOptions | SmoothStepPathOptions;
    disableKeyboardA11y?: boolean;
};
export type EdgeProps<T = any> = Pick<Edge<T>, 'id' | 'animated' | 'data' | 'style' | 'selected' | 'source' | 'target'> & Pick<WrapEdgeProps, 'sourceX' | 'sourceY' | 'targetX' | 'targetY' | 'sourcePosition' | 'targetPosition' | 'sourceHandleId' | 'targetHandleId' | 'interactionWidth'> & EdgeLabelOptions & {
    markerStart?: string;
    markerEnd?: string;
    pathOptions?: any;
};
export type BaseEdgeProps = Pick<EdgeProps, 'style' | 'markerStart' | 'markerEnd' | 'interactionWidth'> & EdgeLabelOptions & {
    id?: string;
    labelX?: number;
    labelY?: number;
    path: string;
};
export type SmoothStepEdgeProps<T = any> = EdgeProps<T> & {
    pathOptions?: SmoothStepPathOptions;
};
export type BezierEdgeProps<T = any> = EdgeProps<T> & {
    pathOptions?: BezierPathOptions;
};
export type EdgeTextProps = HTMLAttributes<SVGElement> & EdgeLabelOptions & {
    x: number;
    y: number;
};
export declare enum ConnectionLineType {
    Bezier = "default",
    Straight = "straight",
    Step = "step",
    SmoothStep = "smoothstep",
    SimpleBezier = "simplebezier"
}
export type ConnectionLineComponentProps = {
    connectionLineStyle?: CSSProperties;
    connectionLineType: ConnectionLineType;
    fromNode?: Node;
    fromHandle?: HandleElement;
    fromX: number;
    fromY: number;
    toX: number;
    toY: number;
    fromPosition: Position;
    toPosition: Position;
    connectionStatus: ConnectionStatus | null;
};
export type ConnectionLineComponent = ComponentType<ConnectionLineComponentProps>;
export type OnEdgeUpdateFunc<T = any> = (oldEdge: Edge<T>, newConnection: Connection) => void;
export type EdgeMarker = {
    type: MarkerType;
    color?: string;
    width?: number;
    height?: number;
    markerUnits?: string;
    orient?: string;
    strokeWidth?: number;
};
export type EdgeMarkerType = string | EdgeMarker;
export declare enum MarkerType {
    Arrow = "arrow",
    ArrowClosed = "arrowclosed"
}
export {};
//# sourceMappingURL=edges.d.ts.map

Node: 

import type { CSSProperties, MouseEvent as ReactMouseEvent } from 'react';
import { internalsSymbol } from '../utils';
import type { XYPosition, Position, CoordinateExtent, HandleElement } from '.';
export type Node<T = any, U extends string | undefined = string | undefined> = {
    id: string;
    position: XYPosition;
    data: T;
    type?: U;
    style?: CSSProperties;
    className?: string;
    sourcePosition?: Position;
    targetPosition?: Position;
    hidden?: boolean;
    selected?: boolean;
    dragging?: boolean;
    draggable?: boolean;
    selectable?: boolean;
    connectable?: boolean;
    deletable?: boolean;
    dragHandle?: string;
    width?: number | null;
    height?: number | null;
    /** @deprecated use parentId instead */
    parentNode?: string;
    parentId?: string;
    zIndex?: number;
    extent?: 'parent' | CoordinateExtent;
    expandParent?: boolean;
    positionAbsolute?: XYPosition;
    ariaLabel?: string;
    focusable?: boolean;
    resizing?: boolean;
    [internalsSymbol]?: {
        z?: number;
        handleBounds?: NodeHandleBounds;
        isParent?: boolean;
    };
};
export type NodeMouseHandler = (event: ReactMouseEvent, node: Node) => void;
export type NodeDragHandler = (event: ReactMouseEvent, node: Node, nodes: Node[]) => void;
export type SelectionDragHandler = (event: ReactMouseEvent, nodes: Node[]) => void;
export type WrapNodeProps<T = any> = Pick<Node<T>, 'id' | 'data' | 'style' | 'className' | 'dragHandle' | 'sourcePosition' | 'targetPosition' | 'hidden' | 'ariaLabel'> & Required<Pick<Node<T>, 'selected' | 'type' | 'zIndex'>> & {
    isConnectable: boolean;
    xPos: number;
    yPos: number;
    xPosOrigin: number;
    yPosOrigin: number;
    initialized: boolean;
    isSelectable: boolean;
    isDraggable: boolean;
    isFocusable: boolean;
    selectNodesOnDrag: boolean;
    onClick?: NodeMouseHandler;
    onDoubleClick?: NodeMouseHandler;
    onMouseEnter?: NodeMouseHandler;
    onMouseMove?: NodeMouseHandler;
    onMouseLeave?: NodeMouseHandler;
    onContextMenu?: NodeMouseHandler;
    resizeObserver: ResizeObserver | null;
    isParent: boolean;
    noDragClassName: string;
    noPanClassName: string;
    rfId: string;
    disableKeyboardA11y: boolean;
    hasHandleBounds: boolean;
};
export type NodeProps<T = any> = Pick<WrapNodeProps<T>, 'id' | 'data' | 'dragHandle' | 'type' | 'selected' | 'isConnectable' | 'xPos' | 'yPos' | 'zIndex'> & {
    dragging: boolean;
    targetPosition?: Position;
    sourcePosition?: Position;
};
export type NodeHandleBounds = {
    source: HandleElement[] | null;
    target: HandleElement[] | null;
};
export type NodeDimensionUpdate = {
    id: string;
    nodeElement: HTMLDivElement;
    forceUpdate?: boolean;
};
export type NodeInternals = Map<string, Node>;
export type NodeBounds = XYPosition & {
    width: number | null;
    height: number | null;
};
export type NodeDragItem = {
    id: string;
    position: XYPosition;
    positionAbsolute: XYPosition;
    distance: XYPosition;
    width?: number | null;
    height?: number | null;
    extent?: 'parent' | CoordinateExtent;
    parentNode?: string;
    parentId?: string;
    dragging?: boolean;
    expandParent?: boolean;
};
export type NodeOrigin = [number, number];
//# sourceMappingURL=nodes.d.ts.map


Return a new flow structure that includes based on the user prompt the nodes and edges. Return a json array of objects.

Be creative!
          `,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        model: "gpt-4o",
        response_format: {
          type: "json_object",
        },
        max_tokens: 4000,
      });

      const aiGeneratedFlow = JSON.parse(
        completion.choices[0].message.content as any
      );
      const newNodes = aiGeneratedFlow?.nodes;
      const newEdges = aiGeneratedFlow?.edges;

      console.log(aiGeneratedFlow);

      setNodes(newNodes);
      setEdges(newEdges);
    } catch (error) {
      console.error("Error generating flow with AI:", error);
    } finally {
      setLoading(false);
      setIsModalOpen(false);
      setConfetti(true);
      setPrompt("");

      setTimeout(() => {
        setConfetti(false);
      }, 5000);
    }
  };

  return (
    <>
      <button
        className="fixed top-4 right-4 m-4 p-2 bg-gradient-to-tr from-emerald-300 to-emerald-600 text-white rounded-md shadow-md hover:from-emerald-600 hover:to-emerald-300 hover:scale-105 duration-500 ease-in-out transition  z-10"
        onClick={() => setIsModalOpen(true)}
      >
        Generate with AI
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-xl font-bold mb-4">Enter your prompt</h2>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <div className="flex justify-end">
              <button
                className="mr-4 p-2 bg-red-500 text-white rounded-md"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="p-2 bg-blue-500 text-white rounded-md"
                onClick={createNewFlowWithAi}
                disabled={loading}
              >
                {loading ? "Generating..." : "Generate"}
              </button>
            </div>
          </div>
        </div>
      )}

      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        edges={edges}
        edgeTypes={edgeTypes}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background />
        <MiniMap />
        <Controls />
      </ReactFlow>
      <Confetti className="w-full h-full" recycle={confetti} />
    </>
  );
}
