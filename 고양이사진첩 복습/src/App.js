import Nodes from "./component/Nodes.js";
import Breadcrumb from "./component/Breadcrumb.js";
import { request } from "./api/api.js";

export default function App($app) {
  this.state = {
    isRoot: false,
    깊이: [],
    nodes: [],
  };

  const breadcrumb = new Breadcrumb({ $app, 깊이: this.state.깊이 });
  const nodes = new Nodes({
    $app,
    initialState: { isRoot: this.state.isRoot, nodes: this.state.nodes },
    onClick: async () => {},
  });

  this.setState = (nextState) => {
    this.state = nextState;
    breadcrumb.setState(this.state.깊이);
    nodes.setState({
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    });
  };

  this.init = async () => {
    try {
      const res = await request();
      this.setState({
        isRoot: true,
        깊이: ["root"],
        nodes: res,
      });
    } catch (error) {
      console.log(error);
    }
  };

  this.init();
}
