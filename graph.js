class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let i = 0; i < vertexArray.length; i++) {
      this.addVertex(vertexArray[i]);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    for (let i = 0; i < this.nodes.length; i++) {
      if (this.nodes[i].adjacent.has(vertex)) {
        this.nodes[i].adjacent.delete(vertex);
      }
    }
    this.nodes.delete(vertex);
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    let visited = new Set();
    let stack = [start];
    let result = [];

    while (stack.length > 0) {
      let current = stack.pop();

      if (!visited.has(current)) {
        visited.add(current);
        result.push(current.value);

        let neighbors = Array.from(current.adjacent).reverse();
        neighbors.forEach(neighbor => {
          if (!visited.has(neighbor)) {
            stack.push(neighbor);
          }
        });

      }
    }

    return result;
  }


  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    let visited = new Set();
    let queue = [start];
    let result = [];
    while (queue.length > 0) {
      let current = queue.shift();
      if (!visited.has(current)) {
        visited.add(current);
        result.push(current.value);
        queue.push(...current.adjacent);
      }
    }
    return result;
  }
}

module.exports = { Graph, Node }