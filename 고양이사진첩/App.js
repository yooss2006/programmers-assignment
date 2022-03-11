import { Nodes } from "./src/component/Nodes.js";
import { Breadcrumb } from "./src/component/Breadcrumb.js";
import { request } from "./src/api/api.js";

function App($app) {
  this.state = {
    isRoot: false,
    nodes: [],
    depth: [],
  };

  this.setState = (nextState) => {
    this.state = nextState;
    breadcrumb.setState(this.state.depth);
    nodes.setState({
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    });
  };

  const breadcrumb = new Breadcrumb({
    $app,
    initialState: this.state.depth,
  });

  const nodes = new Nodes({
    $app,
    initialState: {
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    },

    onClick: (node) => {
      if (node.type === "DIRECTORY") {
      } else if (node.type === "FILE") {
      }
    },
  });

  const init = async () => {
    try {
      const rootNodes = await request();
      this.setState({
        ...this.state,
        isRoot: true,
        nodes: rootNodes,
      });
    } catch (e) {
      console.log("에러", e);
    }
  };

  init();
}
new App(document.querySelector(".App"));
