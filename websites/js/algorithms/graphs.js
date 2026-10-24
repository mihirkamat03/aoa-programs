/**
 * Graph Traversal Step Generators:
 * Breadth-First Search (BFS) and Depth-First Search (DFS).
 * Output requirements:
 * - BFS: Traversal order, distance vector d, predecessor vector pi.
 * - DFS: Traversal order, discovery timestamps d[], finishing timestamps f[].
 */

const TRAVERSAL_GRAPH = {
  numVertices: 6,
  vertexLabels: ["0", "1", "2", "3", "4", "5"],
  positions: [
    { x: 100, y: 180 },  // 0
    { x: 240, y: 80 },   // 1
    { x: 240, y: 280 },  // 2
    { x: 380, y: 80 },   // 3
    { x: 380, y: 280 },  // 4
    { x: 500, y: 180 }   // 5
  ],
  adjMatrix: [
    [0, 1, 1, 0, 0, 0],
    [1, 0, 0, 1, 1, 0],
    [1, 0, 0, 0, 0, 1],
    [0, 1, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 1],
    [0, 0, 1, 0, 1, 0]
  ]
};

function generateBFSSteps(graphData = TRAVERSAL_GRAPH, start = 0) {
  const steps = [];
  const n = graphData.numVertices;
  const adj = graphData.adjMatrix;

  const visited = new Array(n).fill(false); // false = white, true = black/gray
  const inQueue = new Array(n).fill(false);
  const d = new Array(n).fill(-1);
  const pi = new Array(n).fill(-1);
  const queue = [];
  const traversalOrder = [];

  queue.push(start);
  inQueue[start] = true;
  d[start] = 0;

  steps.push({
    codeLine: 2,
    graph: {
      ...graphData,
      visited: [...visited],
      inQueue: [...inQueue],
      d: [...d],
      pi: [...pi],
      queue: [...queue],
      traversalOrder: [...traversalOrder]
    },
    variables: { start, "Queue Q": JSON.stringify(queue), "d[start]": 0 },
    explanation: `BFS starts at vertex ${start}! Push ${start} into FIFO Queue. Set distance d[${start}] = 0. All other vertices are unvisited (White).`,
    examLog: `BFS initialized with source ${start}`
  });

  while (queue.length > 0) {
    const u = queue.shift();
    inQueue[u] = false;
    visited[u] = true;
    traversalOrder.push(u);

    steps.push({
      codeLine: 5,
      graph: {
        ...graphData,
        visited: [...visited],
        inQueue: [...inQueue],
        d: [...d],
        pi: [...pi],
        queue: [...queue],
        currentU: u,
        traversalOrder: [...traversalOrder]
      },
      variables: {
        "Dequeued u": u,
        "Distance d[u]": d[u],
        "Queue Q": JSON.stringify(queue),
        "Traversal Order": JSON.stringify(traversalOrder)
      },
      explanation: `Dequeued vertex u = ${u} from the front of the queue! Mark ${u} as visited (Black). Now inspect all its neighbors.`,
      examLog: `Visited vertex ${u} (Distance = ${d[u]})`
    });

    for (let v = 0; v < n; v++) {
      if (adj[u][v] === 1) {
        if (!visited[v] && !inQueue[v]) {
          inQueue[v] = true;
          d[v] = d[u] + 1;
          pi[v] = u;
          queue.push(v);

          steps.push({
            codeLine: 8,
            graph: {
              ...graphData,
              visited: [...visited],
              inQueue: [...inQueue],
              d: [...d],
              pi: [...pi],
              queue: [...queue],
              currentU: u,
              activeNeighbor: v,
              traversalOrder: [...traversalOrder]
            },
            variables: {
              u, v,
              "New Distance d[v]": d[v],
              "Predecessor pi[v]": u,
              "Enqueued": v,
              "Queue Q": JSON.stringify(queue)
            },
            explanation: `Found unvisited neighbor v = ${v}! Set distance d[${v}] = d[${u}] + 1 = ${d[v]}, set parent pi[${v}] = ${u}, and push ${v} into Queue!`,
            examLog: `Enqueued vertex ${v} from ${u}`
          });
        }
      }
    }
  }

  steps.push({
    codeLine: 11,
    graph: {
      ...graphData,
      visited: [...visited],
      inQueue: [...inQueue],
      d: [...d],
      pi: [...pi],
      queue: [],
      traversalOrder: [...traversalOrder]
    },
    variables: {
      "BFS Traversal Order": traversalOrder.join(" -> "),
      "Final Distances": JSON.stringify(d)
    },
    explanation: `🎉 BFS Traversal Complete! All reachable vertices visited level-by-level. Traversal Order: ${traversalOrder.join(" -> ")} (as required by TSEC practical exam!).`,
    examLog: `=== Final BFS Output ===\nBFS Traversal Order: ${traversalOrder.join(" ")}\nDistances from source ${start}:\n` +
      d.map((dist, idx) => `Vertex ${idx}: distance = ${dist}`).join("\n")
  });

  return steps;
}

function generateDFSSteps(graphData = TRAVERSAL_GRAPH) {
  const steps = [];
  const n = graphData.numVertices;
  const adj = graphData.adjMatrix;

  const color = new Array(n).fill("WHITE"); // WHITE, GRAY, BLACK
  const d = new Array(n).fill(0);
  const f = new Array(n).fill(0);
  const pi = new Array(n).fill(-1);
  let time = 0;
  const traversalOrder = [];
  const stack = [];

  steps.push({
    codeLine: 1,
    graph: {
      ...graphData,
      color: [...color],
      d: [...d],
      f: [...f],
      pi: [...pi],
      traversalOrder: [...traversalOrder],
      stack: [...stack]
    },
    variables: { time: 0, status: "All vertices WHITE" },
    explanation: "DFS Traversal starts! Global clock time = 0. All vertices are undiscovered (WHITE). We will explore as deeply as possible along each branch before backtracking.",
    examLog: "DFS Initialized"
  });

  function dfsVisit(u) {
    time++;
    d[u] = time;
    color[u] = "GRAY";
    traversalOrder.push(u);
    stack.push(u);

    steps.push({
      codeLine: 3,
      graph: {
        ...graphData,
        color: [...color],
        d: [...d],
        f: [...f],
        pi: [...pi],
        currentU: u,
        traversalOrder: [...traversalOrder],
        stack: [...stack]
      },
      variables: {
        "Discovered u": u,
        "Discovery Time d[u]": d[u],
        "Color": "GRAY (Exploring)",
        "Call Stack": JSON.stringify(stack),
        "Traversal": JSON.stringify(traversalOrder)
      },
      explanation: `⏱️ Clock = ${time}: Discovered vertex u = ${u}! Mark ${u} as GRAY (currently on call stack). Recorded discovery timestamp d[${u}] = ${time}.`,
      examLog: `Discovered ${u} at time ${time}`
    });

    for (let v = 0; v < n; v++) {
      if (adj[u][v] === 1) {
        if (color[v] === "WHITE") {
          pi[v] = u;

          steps.push({
            codeLine: 6,
            graph: {
              ...graphData,
              color: [...color],
              d: [...d],
              f: [...f],
              pi: [...pi],
              currentU: u,
              activeNeighbor: v,
              edgeType: "TREE EDGE",
              traversalOrder: [...traversalOrder],
              stack: [...stack]
            },
            variables: { u, v, "Edge Type": "TREE EDGE (New Vertex)" },
            explanation: `Edge (${u} -> ${v}): Neighbor ${v} is WHITE (undiscovered). This is a TREE EDGE! We will dive deeper and call dfsVisit(${v}).`,
            examLog: null
          });

          dfsVisit(v);
        } else if (color[v] === "GRAY" && v !== pi[u]) {
          steps.push({
            codeLine: 7,
            graph: {
              ...graphData,
              color: [...color],
              d: [...d],
              f: [...f],
              pi: [...pi],
              currentU: u,
              activeNeighbor: v,
              edgeType: "BACK EDGE",
              traversalOrder: [...traversalOrder],
              stack: [...stack]
            },
            variables: { u, v, "Edge Type": "BACK EDGE (Cycle Detected!)" },
            explanation: `⚠️ Edge (${u} -> ${v}): Neighbor ${v} is currently GRAY (ancestor on call stack)! This is a BACK EDGE, proving a CYCLE exists in the graph!`,
            examLog: `Back edge (${u} -> ${v}) detected!`
          });
        }
      }
    }

    time++;
    f[u] = time;
    color[u] = "BLACK";
    stack.pop();

    steps.push({
      codeLine: 9,
      graph: {
        ...graphData,
        color: [...color],
        d: [...d],
        f: [...f],
        pi: [...pi],
        currentU: u,
        traversalOrder: [...traversalOrder],
        stack: [...stack]
      },
      variables: {
        "Finished u": u,
        "Finishing Time f[u]": f[u],
        "Interval [d, f]": `[${d[u]}, ${f[u]}]`,
        "Color": "BLACK (Finished)",
        "Call Stack": JSON.stringify(stack)
      },
      explanation: `⏱️ Clock = ${time}: Finished exploring all neighbors of vertex u = ${u}! Mark ${u} as BLACK. Recorded finish timestamp f[${u}] = ${time}. Pop ${u} from call stack.`,
      examLog: `Finished ${u} at time ${time} (Interval [${d[u]}, ${f[u]}])`
    });
  }

  for (let i = 0; i < n; i++) {
    if (color[i] === "WHITE") {
      dfsVisit(i);
    }
  }

  steps.push({
    codeLine: 11,
    graph: {
      ...graphData,
      color: [...color],
      d: [...d],
      f: [...f],
      pi: [...pi],
      traversalOrder: [...traversalOrder],
      stack: []
    },
    variables: {
      "DFS Traversal Order": traversalOrder.join(" -> ")
    },
    explanation: `🎉 DFS Traversal Complete! All discovery times d[] and finish times f[] calculated (required by TSEC practical exam!).`,
    examLog: `=== Final DFS Output ===\nDFS Traversal Order: ${traversalOrder.join(" ")}\n\nTimestamps [Discovery / Finish]:\n` +
      d.map((val, idx) => `Vertex ${idx}: d = ${val}, f = ${f[idx]}`).join("\n")
  });

  return steps;
}
