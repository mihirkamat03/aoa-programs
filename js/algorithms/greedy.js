/**
 * Greedy Algorithm Step Generators:
 * Prim's MST, Kruskal's MST, and Dijkstra's SSSP.
 * Output requirements:
 * - Prim: Minimum cost and edges in MST.
 * - Kruskal: Minimum cost and edges in MST.
 * - Dijkstra: Final D and Pi vectors, and path from source to every vertex.
 */

// Default Graph dataset (5 vertices)
const DEFAULT_GRAPH = {
  numVertices: 5,
  vertexLabels: ["0 (A)", "1 (B)", "2 (C)", "3 (D)", "4 (E)"],
  positions: [
    { x: 100, y: 150 }, // 0
    { x: 260, y: 70 },  // 1
    { x: 420, y: 150 }, // 2
    { x: 360, y: 310 }, // 3
    { x: 160, y: 310 }  // 4
  ],
  adjMatrix: [
    [0, 2, 0, 6, 0],
    [2, 0, 3, 8, 5],
    [0, 3, 0, 0, 7],
    [6, 8, 0, 0, 9],
    [0, 5, 7, 9, 0]
  ],
  edges: [
    { u: 0, v: 1, w: 2 },
    { u: 0, v: 3, w: 6 },
    { u: 1, v: 2, w: 3 },
    { u: 1, v: 3, w: 8 },
    { u: 1, v: 4, w: 5 },
    { u: 2, v: 4, w: 7 },
    { u: 3, v: 4, w: 9 }
  ]
};

// Dijkstra Graph dataset
const DIJKSTRA_GRAPH = {
  numVertices: 5,
  vertexLabels: ["0", "1", "2", "3", "4"],
  positions: [
    { x: 80, y: 180 },   // 0 (Source)
    { x: 220, y: 80 },   // 1
    { x: 380, y: 80 },   // 2
    { x: 220, y: 280 },  // 3
    { x: 380, y: 280 }   // 4
  ],
  adjMatrix: [
    [0, 10, 0, 5, 0],
    [0, 0, 1, 2, 0],
    [0, 0, 0, 0, 4],
    [0, 3, 9, 0, 2],
    [7, 0, 6, 0, 0]
  ]
};

function generatePrimsMSTSteps(graphData = DEFAULT_GRAPH) {
  const steps = [];
  const V = graphData.numVertices;
  const matrix = graphData.adjMatrix;
  const INF = 999999;

  const key = new Array(V).fill(INF);
  const parent = new Array(V).fill(-1);
  const inMST = new Array(V).fill(false);
  const mstEdges = [];
  let totalCost = 0;

  key[0] = 0; // Start at vertex 0

  steps.push({
    codeLine: 2,
    graph: { ...graphData, inMST: [...inMST], key: [...key], parent: [...parent], mstEdges: [] },
    variables: { start: 0, "key[0]": 0, totalCost: 0 },
    explanation: "Prim's Algorithm starts! We pick vertex 0 as our starting root. We initialize key[0] = 0 and all other vertices key[v] = ∞. inMST is all false.",
    examLog: "Prim's MST started with root vertex 0."
  });

  for (let count = 0; count < V - 1; count++) {
    // Pick min key vertex not in MST
    let minKey = INF, u = -1;
    for (let v = 0; v < V; v++) {
      if (!inMST[v] && key[v] < minKey) {
        minKey = key[v];
        u = v;
      }
    }

    if (u === -1) break;

    inMST[u] = true;
    if (parent[u] !== -1) {
      mstEdges.push({ u: parent[u], v: u, w: matrix[u][parent[u]] });
      totalCost += matrix[u][parent[u]];
    }

    steps.push({
      codeLine: 5,
      graph: { ...graphData, inMST: [...inMST], key: [...key], parent: [...parent], mstEdges: [...mstEdges], currentU: u },
      variables: { u, "key[u]": minKey, totalCost, inMSTCount: count + 1 },
      explanation: `Step ${count + 1}: Pick unvisited vertex u = ${u} with smallest key = ${minKey}. Add u to MST! ` +
        (parent[u] !== -1 ? `Edge added to MST: (${parent[u]} - ${u}) with weight ${matrix[u][parent[u]]}. Running Cost = ${totalCost}.` : "Vertex 0 is the root."),
      examLog: parent[u] !== -1 ? `Added Edge to MST: ${parent[u]} - ${u} (Weight: ${matrix[u][parent[u]]})` : null
    });

    // Check neighbors
    for (let v = 0; v < V; v++) {
      if (matrix[u][v] !== 0 && !inMST[v]) {
        const edgeWeight = matrix[u][v];
        if (edgeWeight < key[v]) {
          const oldKey = key[v];
          key[v] = edgeWeight;
          parent[v] = u;

          steps.push({
            codeLine: 8,
            graph: { ...graphData, inMST: [...inMST], key: [...key], parent: [...parent], mstEdges: [...mstEdges], currentU: u, checkingV: v },
            variables: { u, v, "weight(u,v)": edgeWeight, "oldKey": oldKey === INF ? "∞" : oldKey, "newKey": edgeWeight },
            explanation: `Neighbor v = ${v} has edge (${u}-${v}) with weight ${edgeWeight} < previous key (${oldKey === INF ? "∞" : oldKey}). Updated key[${v}] = ${edgeWeight} and parent[${v}] = ${u}!`,
            examLog: null
          });
        }
      }
    }
  }

  // Include the last vertex in inMST for visual completion
  for (let v = 0; v < V; v++) {
    if (!inMST[v]) inMST[v] = true;
  }

  steps.push({
    codeLine: 10,
    graph: { ...graphData, inMST: [...inMST], key: [...key], parent: [...parent], mstEdges: [...mstEdges] },
    variables: { totalCost, numEdges: mstEdges.length },
    explanation: `🎉 Prim's Algorithm Complete! All ${V} vertices connected with ${mstEdges.length} edges. Total Minimum Cost = ${totalCost} (Required by TSEC practical exam!).`,
    examLog: `=== Final Prim's MST Output ===\nEdges in MST:\n` +
      mstEdges.map(e => `Edge ${e.u} - ${e.v} \tWeight: ${e.w}`).join("\n") +
      `\nMinimum Cost of MST = ${totalCost}`
  });

  return steps;
}

function generateKruskalsMSTSteps(graphData = DEFAULT_GRAPH) {
  const steps = [];
  const V = graphData.numVertices;
  const sortedEdges = [...graphData.edges].sort((a, b) => a.w - b.w);

  const parent = Array.from({ length: V }, (_, i) => i);

  function find(i) {
    if (parent[i] === i) return i;
    return parent[i] = find(parent[i]);
  }

  function union(u, v) {
    const rootU = find(u);
    const rootV = find(v);
    parent[rootU] = rootV;
  }

  const mstEdges = [];
  let totalCost = 0;

  steps.push({
    codeLine: 1,
    graph: { ...graphData, mstEdges: [], rejectedEdges: [], parent: [...parent] },
    variables: { sortedEdgesCount: sortedEdges.length, totalCost: 0, mstCount: 0 },
    explanation: "Kruskal's Algorithm starts! First, we sort ALL edges in non-decreasing order of weight: " +
      sortedEdges.map(e => `(${e.u}-${e.v}:${e.w})`).join(", ") + ". Every vertex is in its own set: parent = [0, 1, 2, 3, 4].",
    examLog: "Sorted Edges: " + sortedEdges.map(e => `(${e.u}-${e.v}: wt ${e.w})`).join(", ")
  });

  const rejectedEdges = [];

  for (let i = 0; i < sortedEdges.length && mstEdges.length < V - 1; i++) {
    const edge = sortedEdges[i];
    const rootU = find(edge.u);
    const rootV = find(edge.v);

    steps.push({
      codeLine: 4,
      graph: { ...graphData, mstEdges: [...mstEdges], rejectedEdges: [...rejectedEdges], activeEdge: edge, parent: [...parent] },
      variables: { "edge": `(${edge.u} - ${edge.v})`, weight: edge.w, "find(u)": rootU, "find(v)": rootV },
      explanation: `Considering cheapest remaining edge (${edge.u} - ${edge.v}) with weight ${edge.w}. We check: find(${edge.u}) = ${rootU}, find(${edge.v}) = ${rootV}.`,
      examLog: null
    });

    if (rootU !== rootV) {
      mstEdges.push(edge);
      totalCost += edge.w;
      union(rootU, rootV);

      steps.push({
        codeLine: 6,
        graph: { ...graphData, mstEdges: [...mstEdges], rejectedEdges: [...rejectedEdges], activeEdge: null, parent: [...parent] },
        variables: { "edgeAdded": `(${edge.u} - ${edge.v})`, weight: edge.w, totalCost, mstCount: mstEdges.length },
        explanation: `✅ ACCEPTED! Since find(${edge.u}) != find(${edge.v}), adding this edge DOES NOT form a cycle! Edge (${edge.u} - ${edge.v}) added to MST. Running Cost = ${totalCost}.`,
        examLog: `Added to MST: ${edge.u} - ${edge.v} (weight ${edge.w})`
      });
    } else {
      rejectedEdges.push(edge);
      steps.push({
        codeLine: 5,
        graph: { ...graphData, mstEdges: [...mstEdges], rejectedEdges: [...rejectedEdges], activeEdge: null, parent: [...parent] },
        variables: { "edgeRejected": `(${edge.u} - ${edge.v})`, weight: edge.w, reason: "Forms Cycle!" },
        explanation: `❌ REJECTED! Both vertices ${edge.u} and ${edge.v} already belong to set root ${rootU}. Adding this edge would form a closed loop (cycle)! Discarded.`,
        examLog: `Rejected (Cycle): ${edge.u} - ${edge.v} (weight ${edge.w})`
      });
    }
  }

  steps.push({
    codeLine: 11,
    graph: { ...graphData, mstEdges: [...mstEdges], rejectedEdges: [...rejectedEdges], parent: [...parent] },
    variables: { totalCost, edgesInMST: mstEdges.length },
    explanation: `🎉 Kruskal's MST Complete! Selected V - 1 = ${V - 1} edges. Total Minimum Cost = ${totalCost}.`,
    examLog: `=== Final Kruskal's MST Output ===\nEdges in MST:\n` +
      mstEdges.map(e => `Edge ${e.u} - ${e.v} \tWeight: ${e.w}`).join("\n") +
      `\nMinimum Cost of MST = ${totalCost}`
  });

  return steps;
}

function generateDijkstraSteps(graphData = DIJKSTRA_GRAPH, src = 0) {
  const steps = [];
  const V = graphData.numVertices;
  const matrix = graphData.adjMatrix;
  const INF = 999999;

  const D = new Array(V).fill(INF);
  const Pi = new Array(V).fill(-1);
  const visited = new Array(V).fill(false);

  D[src] = 0;

  steps.push({
    codeLine: 2,
    graph: { ...graphData, D: [...D], Pi: [...Pi], visited: [...visited], src },
    variables: { src, "D[src]": 0, visitedCount: 0 },
    explanation: `Dijkstra's Algorithm starts at source vertex ${src}! Initialize D[${src}] = 0 and all other distances D[v] = ∞. Predecessor Pi vector is all -1 (NIL).`,
    examLog: `Dijkstra started with source vertex ${src}. Initial D: ${JSON.stringify(D)}`
  });

  for (let count = 0; count < V; count++) {
    let minD = INF, u = -1;
    for (let v = 0; v < V; v++) {
      if (!visited[v] && D[v] < minD) {
        minD = D[v];
        u = v;
      }
    }

    if (u === -1 || minD === INF) break;

    visited[u] = true;

    steps.push({
      codeLine: 4,
      graph: { ...graphData, D: [...D], Pi: [...Pi], visited: [...visited], currentU: u, src },
      variables: { u, "D[u]": D[u], visitedCount: count + 1 },
      explanation: `Step ${count + 1}: Pick unvisited vertex u = ${u} with shortest known distance D[${u}] = ${D[u]}. Mark vertex ${u} as visited (finalized). Now check its outgoing edges for Relaxation.`,
      examLog: `Finalized vertex ${u} with distance ${D[u]}`
    });

    for (let v = 0; v < V; v++) {
      if (!visited[v] && matrix[u][v] !== 0 && D[u] !== INF) {
        const edgeW = matrix[u][v];
        const newDist = D[u] + edgeW;

        steps.push({
          codeLine: 7,
          graph: { ...graphData, D: [...D], Pi: [...Pi], visited: [...visited], currentU: u, checkingV: v, src },
          variables: { u, v, "D[u]": D[u], "weight(u,v)": edgeW, "D[u]+w": newDist, "current D[v]": D[v] === INF ? "∞" : D[v] },
          explanation: `Checking neighbor v = ${v}: Road (${u} -> ${v}) has weight ${edgeW}. Can we reach ${v} faster via ${u}? Test: D[${u}] (${D[u]}) + ${edgeW} = ${newDist} < D[${v}] (${D[v] === INF ? "∞" : D[v]}).`,
          examLog: null
        });

        if (newDist < D[v]) {
          D[v] = newDist;
          Pi[v] = u;

          steps.push({
            codeLine: 8,
            graph: { ...graphData, D: [...D], Pi: [...Pi], visited: [...visited], currentU: u, checkingV: v, src },
            variables: { u, v, "new D[v]": D[v], "new Pi[v]": u },
            explanation: `⚡ RELAXATION! Found a shorter shortcut to vertex ${v}! Updated D[${v}] = ${D[v]} and predecessor Pi[${v}] = ${u}.`,
            examLog: `Relaxed edge (${u} -> ${v}): D[${v}] updated to ${D[v]}, Pi[${v}] = ${u}`
          });
        }
      }
    }
  }

  function getPathStr(target) {
    if (target === src) return `${src}`;
    if (Pi[target] === -1) return "No Path";
    return getPathStr(Pi[target]) + " -> " + target;
  }

  const pathsSummary = [];
  for (let i = 0; i < V; i++) {
    pathsSummary.push(`To vertex ${i} (Dist ${D[i]}): Path: ${getPathStr(i)}`);
  }

  steps.push({
    codeLine: 10,
    graph: { ...graphData, D: [...D], Pi: [...Pi], visited: [...visited], src },
    variables: { "final D": JSON.stringify(D), "final Pi": JSON.stringify(Pi) },
    explanation: `🎉 Dijkstra's Complete! Final D vector and Pi vector computed. Shortest paths reconstructed from source ${src} to all vertices (as required by TSEC practical exam!).`,
    examLog: `=== Final Dijkstra SSSP Output ===\nFinal D Vector:  ${JSON.stringify(D)}\nFinal Pi Vector: ${JSON.stringify(Pi)}\n\nPaths from Source ${src}:\n` + pathsSummary.join("\n")
  });

  return steps;
}
