export default function Breadcrumb({ $app, 깊이 }) {
  this.state = 깊이;
  this.$nav = document.createElement("nav");
  this.$nav.className = "Breadcrumb";
  $app.appendChild(this.$nav);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    this.$nav.innerHTML = this.state
      .map((node) => {
        return `
      <div>${node}</div>
      `;
      })
      .join("");
  };

  this.render();
}
