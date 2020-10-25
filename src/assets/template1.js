export class BoxElement extends HTMLElement {
  constructor() {
    super();
    const template = document.getElementById('swd-root-box');
    const node = document.importNode(template.content, true);
    this.appendChild(node);
  }
  static get observedAttributes() {
    return ['box'];
  }
  get box() {
    return this.getAttribute('box');
  }

  set box(box) {
    if (box) {
      this.setAttribute('box', box);
    } else {
      this.removeAttribute('box');
    }
  }
  connectedCallback() {
    this.updateUI();
    if (!this.hasAttribute('box')) {
      this.setAttribute('box', '{}');
    }
  }
  attributeChangedCallback(value, oldName, newName) {
    this.updateUI();
  }
  updateUI() {
    var _a;
    const headerImage = this.querySelector('#headerImage');
    const footerImage = this.querySelector('#footerImage');
    const productListsElement = this.querySelector('#product-lists');
    const boxData = JSON.parse(
      (_a = this.box) !== null && _a !== void 0 ? _a : '{}'
    );
    headerImage.src = boxData?.headerSrc;
    footerImage.src = boxData?.footerSrc;
    productListsElement.innerHTML = boxData?.productLists
      ?.map(
        (productList) =>
          `<swd-root-product-list product-list='${JSON.stringify(
            productList
          )}'></swd-root-product-list>`
      )
      .join(' ');
  }
}
window.customElements.define('swd-root-box', BoxElement);

const productListItem = (product) => `
<div class="row mx-0 pt-2">
<div class="col-8">
  <h6>${product.title}</h6>
  <p>${product.description}</p>
</div>
<div class="col-4">
  <h5 class="text-center">$ ${product.price}</h5>
</div>
</div>`;

export class ProductListElement extends HTMLElement {
  constructor() {
    super();
    const template = document.getElementById('swd-root-product-list');
    const node = document.importNode(template.content, true);
    this.appendChild(node);
  }
  static get observedAttributes() {
    return ['product-list'];
  }
  get productList() {
    return this.getAttribute('product-list');
  }

  set productList(productList) {
    if (productList) {
      this.setAttribute('product-list', productList);
    } else {
      this.removeAttribute('product-list');
    }
  }
  connectedCallback() {
    this.updateUI();
    if (!this.hasAttribute('product-list')) {
      this.setAttribute('product-list', '{}');
    }
  }
  attributeChangedCallback(value, oldName, newName) {
    this.updateUI();
  }
  updateUI() {
    var _a;
    const titleElement = this.querySelector('#title');
    const productsElement = this.querySelector('#products');
    const productListData = JSON.parse(
      (_a = this.productList) !== null && _a !== void 0 ? _a : '{}'
    );
    titleElement.innerText = productListData.title;
    productsElement.innerHTML = productListData?.products
      ?.map((product) => productListItem(product))
      .join(' ');
  }
}
window.customElements.define('swd-root-product-list', ProductListElement);

/******************************** MAIN ******************************** */
const data = `{"id":1,"name":"Demo Template","description":"Demo Template","storeId":1,"createdTime":"2020-10-07T12:13:43.373","uilink":null,"boxes":[{"id":1,"templateId":1,"boxType":{"id":1,"name":"product","description":"contain product list"},"location":1,"src":"","headerTitle":null,"footerTitle":null,"headerSrc":"https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500","footerSrc":null,"productLists":[{"id":1,"title":"Todays Specials","boxId":1,"maxSize":5,"location":1,"products":[{"id":21,"title":"Smoked Pastrami","description":"Smoked pastrami, cheese, onion","price":8.9900,"src":null,"location":1},{"id":22,"title":"The Italian","description":"Salami, Sliced Parmigiano Reggiano","price":6.9900,"src":null,"location":2},{"id":23,"title":"The Favorite","description":"Ham, Provoline, Roma Tomatoes","price":6.9900,"src":null,"location":3},{"id":24,"title":"Big Bird","description":"Turkey, Swiss, Cheedar, Avocado","price":5.9900,"src":null,"location":4},{"id":25,"title":"Albacore Tuna","description":"Albacore Tuna, Swiss, Romaine","price":7.9900,"src":null,"location":5}]}]},{"id":2,"templateId":1,"boxType":{"id":1,"name":"product","description":"contain product list"},"location":2,"src":"","headerTitle":"","footerTitle":"","headerSrc":"","footerSrc":"","productLists":[{"id":5,"title":"Made Fress","boxId":2,"maxSize":5,"location":1,"products":[{"id":26,"title":"BBQ Special","description":"BBQ Special","price":5.4900,"src":null,"location":1},{"id":27,"title":"The Big Roy","description":"Eggs, Prosclutta, Melted Swiss","price":6.9900,"src":null,"location":2},{"id":28,"title":"The Hawaiian","description":"Goat Cheese, Turkey, Spinach","price":5.9900,"src":null,"location":3},{"id":29,"title":"The Don","description":"Albacore Tuna, Melted Swiss Cheese","price":5.9900,"src":null,"location":4},{"id":30,"title":"Meatball Marianara","description":"Meatball, Tomato Sauce, Mazzaralla","price":6.9900,"src":null,"location":5}]},{"id":6,"title":"Quick Pick","boxId":2,"maxSize":4,"location":2,"products":[{"id":31,"title":"Chicken Wrap","description":"","price":4.9900,"src":null,"location":1},{"id":32,"title":"The Sarah","description":"","price":5.9900,"src":null,"location":2},{"id":33,"title":"Scotty Rock","description":"","price":5.9900,"src":null,"location":3},{"id":34,"title":"The Unusual","description":"","price":6.9900,"src":null,"location":4}]}]},{"id":3,"templateId":1,"boxType":{"id":1,"name":"product","description":"contain product list"},"location":3,"src":"","headerTitle":"","footerTitle":"","headerSrc":"","footerSrc":"https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500","productLists":[{"id":7,"title":"Healthy Eating","boxId":3,"maxSize":5,"location":1,"products":[{"id":35,"title":"London Sp.","description":"Iceberg, Radatone pasta","price":6.9900,"src":null,"location":1},{"id":36,"title":"Veggie Delight","description":"Albacore Tuna, Melted Swiss Cheese","price":5.9900,"src":null,"location":2},{"id":37,"title":"The 510","description":"With whipped cream","price":6.4900,"src":null,"location":3},{"id":38,"title":"Taco Wrap","description":"Albacone Tuna, Swiss, Rotaine","price":6.9900,"src":null,"location":4},{"id":39,"title":"The Greak","description":"Albacone Tuna, Melted Swiss Cheese","price":6.9900,"src":null,"location":5}]}]}]}`;
const dataAsObject = JSON.parse(data);
// const boxElements = document.querySelectorAll('swd-root-box');
// boxElements.forEach((boxElement) => {
//   boxElement.box = JSON.stringify(dataAsObject.boxes[0]);
// });
const templateDeclaration = `
<template id="swd-root-product-list-item">
<div class="col-8">
  <h6 id="title">title</h6>
  <p id="description">description</p>
</div>
<div class="col-4">
  <h5 class="text-center">$ <span id="price">price</span></h5>
</div>
</template>
<template id="swd-root-product-list">
<div class="bg-lightblue">
  <h1 class="bg-lightblue pl-3" id="title">Title</h1>
</div>
<div class="pl-3" id="products"></div>
</template>
<template id="swd-root-box">
<div class="mb-2 media-box">
  <img class="w-100 img-fluid" id="headerImage" />
</div>
<div id="product-lists"></div>
<div class="mb-2 media-box">
  <img class="w-100 img-fluid" id="footerImage" />
</div>
</template>
<template id="swd-root-template">
<div class="row mx-0">
  <swd-root-box class="col-4"></swd-root-box>
  <swd-root-box class="col-4"></swd-root-box>
  <swd-root-box class="col-4"></swd-root-box>
</div>
</template>`;
const styleDeclaration = `
.bg-lightblue {
  height: 4rem;
  background-color: #3586bb;
  color: white;
}
#template-root {
  background-color: #2f4554;
  color: #ffffff;
}
`;
const styleElement = document.createElement('style');
styleElement.innerText = styleDeclaration;
document.getElementsByTagName('head')[0].appendChild(styleElement);
const root = document.getElementById('template-root');
root.innerHTML = templateDeclaration;
const template = document.getElementById('swd-root-template');
const templateElement = document.importNode(template.content, true);
root.appendChild(templateElement);
const boxElements = document.querySelectorAll('swd-root-box');
dataAsObject.boxes.forEach((boxData, index) => {
  boxElements[index].classList.add('px-0');
  boxElements[index].box = JSON.stringify(boxData);
});
