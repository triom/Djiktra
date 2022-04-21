
const printTable = (table) => {
  return Object.keys(table)
    .map((vertex) => {
      var { vertex: from, cost } = table[vertex];
      return `${vertex}: ${cost} via ${from}`;
    })
    .join("\n");
};

const tracePath = (table, start, end) => {
  var path = [];
  var next = end;
  while (true) {
    path.unshift(next);
    if (next === start) {
      break;
    }
    next = table[next].vertex;
  }

  return path;
};

const formatGraph = (g) => {
  const tmp = {};
  Object.keys(g).forEach((k) => {
    const obj = g[k];
    const arr = [];
    Object.keys(obj).forEach((v) => arr.push({ vertex: v, cost: obj[v] }));
    tmp[k] = arr;
  });
  return tmp;
};

const dijkstra = (graph, start, end) => {
  var map = formatGraph(graph);

  var visited = [];
  var unvisited = [start];
  var shortestDistances = { [start]: { vertex: start, cost: 0 } };

  var vertex;
  while ((vertex = unvisited.shift())) {
    // Explore unvisited neighbors
    var neighbors = map[vertex].filter((n) => !visited.includes(n.vertex));

    // Add neighbors to the unvisited list
    unvisited.push(...neighbors.map((n) => n.vertex));

    var costToVertex = shortestDistances[vertex].cost;

    for (let { vertex: to, cost } of neighbors) {
      var currCostToNeighbor =
        shortestDistances[to] && shortestDistances[to].cost;
      var newCostToNeighbor = costToVertex + cost;
      if (
        currCostToNeighbor == undefined ||
        newCostToNeighbor < currCostToNeighbor
      ) {
        // Update the table
        shortestDistances[to] = { vertex, cost: newCostToNeighbor };
      }
    }

    visited.push(vertex);
  }

  console.log("Table of costs:");
  console.log(printTable(shortestDistances));

  const path = tracePath(shortestDistances, start, end);

  console.log(
    "Shortest path is: ",
    path.join(" -> "),
    " with weight ",
    shortestDistances[end].cost
  );
};


//distance
// let graph = {
// 	Parme: { LaSpezia: 124, Bologne: 104 },
// 	LaSpezia: { Parme: 124, Florence: 163},
// 	Bologne: { Parme: 104, Florence: 131, Perouse: 245 },
// 	Florence: { LaSpezia: 163, Bologne: 131, Perouse: 150, Rome: 283 },
// 	Perouse: { Bologne: 245, Florence: 150, Rome: 181 },
// 	Rome: { Florence: 283, Perouse: 181},
// };

// dijkstra(graph, "Parme", "Rome");




//temps
// let graph = {
// 	Parme: { LaSpezia: 83, Bologne: 71 },
// 	LaSpezia: { Parme: 83, Florence: 106},
// 	Bologne: { Parme: 71, Florence: 99, Perouse: 174 },
// 	Florence: { LaSpezia: 106, Bologne: 99, Perouse: 103, Rome: 168 },
// 	Perouse: { Bologne: 174, Florence: 103, Rome: 127 },
// 	Rome: { Florence: 168, Perouse: 127},
// };




//cout
let graph = {
	Parme: { LaSpezia: 25, Bologne: 16 },
	LaSpezia: { Parme: 25, Florence: 43},
	Bologne: { Parme: 16, Florence: 22, Perouse: 30 },
	Florence: { LaSpezia: 43, Bologne: 22, Perouse: 20, Rome: 42 },
	Perouse: { Bologne: 30, Florence: 20, Rome: 22 },
	Rome: { Florence: 42, Perouse: 22},
};
dijkstra(graph,"Rome", "Parme");

// //cout
// let graph = {
// 	start: { A: 5, B: 2 },
// 	A: { start: 1, C: 4, D: 2 },
// 	B: { A: 8, D: 7 },
// 	C: { D: 6, finish: 3 },
// 	D: { finish: 1 },
// 	finish: {},
// };
// console.log(findShortestPath(graph, "start", "finish"));
// > {
// distance: 1
// path: (2) ["A", "start"]
// }


// // importer le module readline 
// const readline = require("readline");

// // créer l'interface d'entrée et sortie
// const rln = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// // declaration de la varaible de choix
// let  choix = "";

// // Recuper le choix de trajet
// rln.question("***Quel trajet Voulez vous?***\n\t1->Le plus Rapide\n\t2->Le plus court\n\t3->Le moins chère\n", function (string) {
//   choix= string;

//   console.log("Votre choix " +  choix);

//   // fermer la file d'entrée
//   rln.close();
// });
