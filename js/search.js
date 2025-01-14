"use strict"

// declare variables

const searchInput = getElement(".filters__input--name")
const productsContainer = getElement(".products")
const tabButtons = getElement(".filters__row--tabs")

let activeFilter = null
let searchQuery = ""

let products = [
  {
    productName: "Apple iphone 14 pro",
    productPrice: "1499",
    productImg: "./img/iphone.png",
    categories: ["tech"],
  },
  {
    productName: "Running shoes",
    productPrice: "199",
    productImg: "./img/shoes.png",
    categories: ["clothing"],
  },
  {
    productName: "Apple watch",
    productPrice: "399",
    productImg: "./img/watch.png",
    categories: ["tech"],
  },
  {
    productName: "College Bag",
    productPrice: "139",
    productImg: "./img/bag.png",
    categories: ["clothing"],
  },
  {
    productName: "Boy's Jacket",
    productPrice: "169",
    productImg: "./img/jacket.png",
    categories: ["clothing"],
  },
  {
    productName: "Keratin Hair Care",
    productPrice: "39",
    productImg: "./img/shampoo.png",
    categories: ["health"],
  },
  {
    productName: "Apple airpods pro",
    productPrice: "299",
    productImg: "./img/airpods.png",
    categories: ["tech"],
  },
  {
    productName: "Vitamin E",
    productPrice: "39",
    productImg: "./img/vitamin.png",
    categories: ["health"],
  },
  {
    productName: "Face Cream",
    productPrice: "59",
    productImg: "./img/cream.png",
    categories: ["health"],
  },
]

// functions definitions

function getElement(element) {
  return document.querySelector(element)
}

const createElement = (element, className = "", elementText = "") => {
  const newElement = document.createElement(element)
  newElement.className = className
  newElement.textContent = elementText

  return newElement
}

const createProductElement = ({ productName, productPrice, productImg }) => {
  const productItem = createElement("div", "products__item")
  const productImgWrapper = createElement("div", "products__image-wrapper")
  const productImgElement = createElement("img", "products__image")
  const productTitleElement = createElement("h2", "products__title", productName)
  const productPriceElement = createElement("span", "products__price", productPrice)

  productImgElement.src = productImg

  productImgWrapper.append(productImgElement)
  productItem.append(productImgWrapper, productTitleElement, productPriceElement)

  return productItem
}

const showSearchedProduct = products => {
  const productsElement = products.map(product => createProductElement(product))

  productsContainer.innerHTML = ""
  productsContainer.append(...productsElement)
}

const searchAndFilterHandler = event => {
  const filteredProducts = products.filter(({ productName, categories }) => {
    const matchesSearch = productName.toLowerCase().includes(searchQuery)
    const matchesFilter = !activeFilter || categories.includes(activeFilter)
    return matchesSearch && matchesFilter
  })

  showSearchedProduct(filteredProducts)
}

const searchHandler = event => {
  searchQuery = searchInput.value.trim().toLowerCase()
  searchAndFilterHandler()
}

const filterHandler = event => {
  const target = event.target

  if (!target.classList.contains("filters__button")) return

  activeFilter = target.dataset.filter

  const activeTab = document.querySelector(".filters__button--active")
  activeTab.classList.remove("filters__button--active")

  target.classList.add("filters__button--active")
  searchAndFilterHandler()
}

// declare functions
showSearchedProduct(products)

// event definitions

searchInput.addEventListener("input", searchHandler)
tabButtons.addEventListener("click", filterHandler)
