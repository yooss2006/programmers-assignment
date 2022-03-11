export function Nodes({ $app, initialState, onClick, onBackClick }) {
  this.state = initialState;
  this.$target = document.createElement("div");
  this.$target.className = "Nodes";
  $app.appendChild(this.$target);
  this.onClick = onClick;
  this.onBackClick = onBackClick;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  //dom을 제어하는 시점을 render될 때 할수있게 제한
  this.render = () => {
    //nodes 배열에 자료가 있을 경우
    if (this.state.nodes) {
      const nodesTemplate = this.state.nodes
        .map((node) => {
          const iconPath =
            node.type === "FILE"
              ? "./assets/file.png"
              : "./assets/directory.png";

          return `
          <div class="Node" data-node-id="${node.id}">
            <img src="${iconPath}" data-node-id="${node.id}"/>
            <div>${node.name}</div>
          </div>
        `;
        })
        .join("");

      this.$target.innerHTML = !this.state.isRoot
        ? `<div class="Node"><img src="./assets/prev.png"/></div> ${nodesTemplate}`
        : nodesTemplate;
    }
    // this.$target.querySelectorAll(".Node img").forEach(($node) => {
    //   $node.addEventListener("click", (e) => {
    //     // dataset을 통해 data-로 시작하는 attribute를 꺼내올 수 있음
    //     const { nodeId } = e.target.dataset;
    //     console.log(e.target.dataset);
    //     if (!nodeId) {
    //       this.onBackClick();
    //     }
    //     const selectedNode = this.state.nodes.find(
    //       (node) => node.id === nodeId
    //     );

    //     if (selectedNode) {
    //       this.onClick(selectedNode);
    //     }
    //   });
    // });
  };
  this.$target.addEventListener("click", (e) => {
    const $node = e.target.closest(".Node");

    if ($node) {
      const { nodeId } = $node.dataset;

      if (!nodeId) {
        this.onBackClick();
        return;
      }

      const selectedNode = this.state.nodes.find((node) => node.id === nodeId);

      if (selectedNode) {
        this.onClick(selectedNode);
      }
    }
  });
}
