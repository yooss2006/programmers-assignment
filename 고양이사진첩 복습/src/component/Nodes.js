export default function Nodes({ $app, initialState, onClick }) {
  this.state = initialState;
  this.$nodes = document.createElement("div");
  this.$nodes.className = "Nodes";
  $app.appendChild(this.$nodes);
  this.onClick = onClick;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    if (this.state.nodes) {
      this.$nodes.innerHTML = this.state.nodes
        .map((node) => {
          let nodeType;
          if (node.type === "DIRECTORY") nodeType = "directory";
          else if (node.type === "FILE") nodeType = "file";
          return `
       <div class="Node">
          <img src="./assets/${nodeType}.png" />
          <div>${node.name}</div>
        </div>
       `;
        })
        .join("");
    }
  };
  this.render();
}
