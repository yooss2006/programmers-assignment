import { Nodes } from "./src/component/Nodes.js";
import { Breadcrumb } from "./src/component/Breadcrumb";
import { request } from "./src/api/api";

function App(위치) {
  this.state = {
    isRoot: false,
    nodes: [],
    depth: [],
  };
  const breadcrumb = new Breadcrumb({
    위치,
    initialState: this.state.depth,
  });

  const nodes = new Nodes({
    위치,
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

  this.setState = (nextState) => {
    this.state = nextState;
    breadcrumb.setState(this.state.depth);
    nodes.setState({
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    });
  };
  const init = (async = () => {
    try {
      const rootNodes = await request();
      this.setState({
        ...this.state,
        isRoot: true,
        nodes: rootNodes,
      });
    } catch (e) {
      // 에러처리 하기
    }
  });

  init();
}
new App(document.querySelector(".App"));
