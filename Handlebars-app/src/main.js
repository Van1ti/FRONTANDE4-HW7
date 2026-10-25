import Handlebars from 'handlebars'
import { products } from './data.js'

let items = [...products]

const container = document.querySelector('#products-container')
const form = document.querySelector('#product-form')

const templateSource = document.querySelector('#product-template').innerHTML
const productsTemplate = Handlebars.compile(templateSource)

function renderProducts() {
  container.innerHTML = productsTemplate(items)
}

renderProducts()


form.addEventListener('submit', (event) => {
  event.preventDefault()
  const formData = new FormData(event.currentTarget)
  const name = formData.get('name')
  const price = Number(formData.get('price'))
  const description = formData.get('description')

  const newProduct = {
    id: Date.now(),
    name,
    price,
    description,
  }

  items.push(newProduct)
  renderProducts()

  event.currentTarget.reset()
})

container.addEventListener('click', (event) => {
  if (!event.target.classList.contains('delete-btn')) return

  const card = event.target.closest('.product-card')
  const productId = Number(card.dataset.id)

  items = items.filter((item) => item.id !== productId)
  renderProducts()
})