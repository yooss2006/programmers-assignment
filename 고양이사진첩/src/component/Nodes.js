function Nodes({ $app, initialState, onClick}) {
  this.state = initialState;
  this.$target = document.createElement("ul");
  $app.appendChild(this.$target);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  //dom을 제어하는 시점을 render될 때 할수있게 제한
  this.render = () => {
    this.$target.innerHTML = this.state.nodes.map(
      (node) => `<li>${node.name}</li>`
    );
  };
}
