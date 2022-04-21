
const printTable = (table) => {
  return Object.keys(table)
    .map((sommet) => {
      var { sommet: de, cout } = table[sommet];
      return `${sommet}: ${cout} via ${de}`;
    })
    .join("\n");
};

//afficher le parcours
const afficherParcours = (tab, depart, arrive) => {
  var chemin = [];
  var suivant= arrive;
  while (true) {
    chemin.unshift(suivant);
    if (suivant === depart) {
      break;
    }
    suivant = tab[suivant].sommet;
  }

  return chemin;
};


//on rassemble pour chaque noeud ses voisins respectifs
const formatGraph = (graphe) => {
  let tmp = {};
  Object.keys(graphe).forEach((k) => {
    let obj = graphe[k];
    let tab = [];
    Object.keys(obj).forEach((s) => tab.push({ sommet: s, cout: obj[s] }));
    tmp[k] = tab;
  });
  console.log(tmp);
  return tmp;
};


const dijkstra = (graph, depart, arrive) => {
  var map = formatGraph(graph);

  var visited = [];
  var unvisited = [depart];

  var plusCourtChemins = { [depart]: { sommet: depart, cout: 0 } };

  var sommet;
  while ((sommet = unvisited.shift())) {
    // Explore unvisited neighbors
    var voisins = map[sommet].filter((n) => !visited.includes(n.sommet));

    // Add neighbors to the unvisited list
    unvisited.push(...voisins.map((n) => n.sommet));

    var costToVertex = plusCourtChemins[sommet].cout;

    for (let { sommet: to, cout } of voisins) {
      var coutVoisin =
        plusCourtChemins[to] && plusCourtChemins[to].cout;
      var newCoutVoisin = costToVertex + cout;
      if (
        coutVoisin == undefined ||
        newCoutVoisin < coutVoisin
      ) {
        // Update the table
        plusCourtChemins[to] = { sommet, cout: newCoutVoisin };
      }
    }

    visited.push(sommet);
  }

  console.log("Table of costs:");
  console.log(printTable(plusCourtChemins));

  const path = afficherParcours(plusCourtChemins, depart, arrive);

  console.log(
    "Le plus court chemin: ",
    path.join(" -> "),
    " il coute: ",
    plusCourtChemins[arrive].cout
  );
};


//distance
const graph = {
	Parme: { LaSpezia: 124, Bologne: 104 },
	LaSpezia: { Parme: 124, Florence: 163},
	Bologne: { Parme: 104, Florence: 131, Perouse: 245 },
	Florence: { LaSpezia: 163, Bologne: 131, Perouse: 150, Rome: 283 },
	Perouse: { Bologne: 245, Florence: 150, Rome: 181 },
	Rome: { Florence: 283, Perouse: 181},
};

//dijkstra(graph, "Parme", "Rome");

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
// let graph = {
// 	Parme: { LaSpezia: 25, Bologne: 16 },
// 	LaSpezia: { Parme: 25, Florence: 43},
// 	Bologne: { Parme: 16, Florence: 22, Perouse: 30 },
// 	Florence: { LaSpezia: 43, Bologne: 22, Perouse: 20, Rome: 42 },
// 	Perouse: { Bologne: 30, Florence: 20, Rome: 22 },
// 	Rome: { Florence: 42, Perouse: 22},
// };
//dijkstra(graph,"Rome", "Parme");

// //cout
// let graph = {
// 	start: { A: 5, B: 2 },
// 	A: { start: 1, C: 4, D: 2 },
// 	B: { A: 8, D: 7 },
// 	C: { D: 6, finish: 3 },
// 	D: { finish: 1 },
// 	finish: {},
// };


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
