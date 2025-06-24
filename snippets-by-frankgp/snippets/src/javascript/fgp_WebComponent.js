let html = `<p>web component</p>`;
let css = `<style>:host{color: tomato;}</style>`;

class WebComponent extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = html + css;
  }
}
customElements.define("web-component", WebComponent);
