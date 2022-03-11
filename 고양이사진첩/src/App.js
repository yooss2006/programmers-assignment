import { Nodes } from "./component/Nodes.js";
import { Breadcrumb } from "./component/Breadcrumb.js";
import { request } from "./api/api.js";
import { ImageView } from "./component/ImageView.js";
import Loading from "./component/Loding.js";
const cashe = {};

export default function App($app) {
  this.state = {
    isRoot: false,
    isLoding: false,
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
    loading.setState(this.state.isLoading);
  };

  const breadcrumb = new Breadcrumb({
    $app,
    initialState: [],
    onClick: (index) => {
      if (index === null) {
        this.setState({
          ...this.state,
          depth: [],
          nodes: cashe.root,
        });
        return;
      }
      if (index === this.state.depth.length - 1) {
        return;
      }
      const nextState = { ...this.state };
      const nextDepth = this.state.depth.slice(0, index + 1);
      console.log(this.state.depth);
      this.setState({
        ...nextState,
        depth: nextDepth,
        nodes: cashe[nextDepth[nextDepth.length - 1].id],
      });
    },
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
          if (cashe[node.id]) {
            this.setState({
              ...this.state,
              depth: [...this.state.depth, node],
              nodes: cashe[node.id],
              isRoot: false,
            });
          } else {
            this.setState({
              ...this.state,
              isLoading: true,
            });
            const nextNodes = await request(node.id);
            this.setState({
              ...this.state,
              isRoot: false,
              depth: [...this.state.depth, node],
              nodes: nextNodes,
            });
            cashe[node.id] = nextNodes;
          }
        } else if (node.type === "FILE") {
          this.setState({
            ...this.state,
            selectedFilePath: node.filePath,
          });
        }
      } catch (e) {
        console.log(e);
      } finally {
        this.setState({
          ...this.state,
          isLoading: false,
        });
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
          this.setState({
            ...this.state,
            isLoading: true,
          });
          const rootNodes = await request();
          this.setState({
            ...nextState,
            isRoot: true,
            nodes: rootNodes,
          });
        } else {
          this.setState({
            ...this.state,
            isLoading: true,
            nodes: cache[prevNodes],
          });
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

  const loading = new Loading({ $app, initialState: this.state.isLoding });

  const init = async () => {
    try {
      this.setState({
        ...this.state,
        isLoading: true,
      });
      const rootNodes = await request();
      this.setState({
        ...this.state,
        isRoot: true,
        nodes: rootNodes,
      });
      cashe.root = rootNodes;
    } catch (e) {
      console.log("에러", e);
    } finally {
      this.setState({
        ...this.state,
        isLoading: false,
      });
    }
  };

  init();
}
