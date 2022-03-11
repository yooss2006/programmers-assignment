import { Nodes } from "./src/component/Nodes.js";
import { Breadcrumb } from "./src/component/Breadcrumb.js";
import { request } from "./src/api/api.js";
import { ImageView } from "./src/component/ImageView.js";

function App($app) {
  this.state = {
    isRoot: false,
    nodes: [],
    depth: [],
    selectedFilePath: null,
  };

  this.setState = (nextState) => {
    this.state = nextState;
    breadcrumb.setState(this.state.depth);
    nodes.setState({
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    });
    imageView.setState(this.state.selectedFilePath);
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
    onClick: async (node) => {
      try {
        if (node.type === "DIRECTORY") {
          const nextNodes = await request(node.id);
          this.setState({
            ...this.state,
            isRoot: false,
            depth: [...this.state.depth, node],
            nodes: nextNodes,
          });
        } else if (node.type === "FILE") {
          this.setState({
            ...this.state,
            selectedFilePath: node.filePath,
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
    onBackClick: async () => {
      try {
        const nextState = { ...this.state };
        nextState.depth.pop();
        const prevNodeId =
          nextState.depth.length === 0
            ? null
            : nextState.depth[nextState.depth.length - 1].id;
        if (prevNodeId === null) {
          const rootNodes = await request();
          this.setState({
            ...nextState,
            isRoot: true,
            nodes: rootNodes,
          });
        } else {
          const prevNodes = await request(prevNodeId);
          this.setState({
            ...nextNodes,
            isRoot: false,
            nodes: prevNodes,
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
  });

  const imageView = new ImageView({
    $app,
    initialState: this.state.selectedNodeImage,
  });

  const init = async () => {
    try {
      const rootNodes = await request();
      this.setState({
        ...this.state,
        isRoot: true,
        nodes: rootNodes,
      });
      console.log(this.state);
    } catch (e) {
      console.log("에러", e);
    }
  };

  init();
}
new App(document.querySelector(".App"));
