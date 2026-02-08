import { useEffect, useState, useRef } from 'react'
import reactLogo from '../../assets/react.svg'
import viteLogo from '/vite.svg'
import { Link } from 'react-router-dom'
import '../../pages/products'
import api from '../../services/api'
import Trash from '../../assets/delete.png'
import pencil from '../../assets/edit-text.png'

function Products() {
  const [products, setProducts] = useState()

  // const usuario = []

  const inputTile = useRef()
  const inputDescription = useRef()
  const inputValue = useRef()
  const inputMark = useRef()
  const inputCategory = useRef()

  async function getProducts() {
    const productsFromApi = await api.get('/products')

    setProducts(productsFromApi.data)
  }

  async function createProducts() {
    await api.post('/products', {
      title: inputTile.current.value,
      description: inputDescription.current.value,
      value: inputValue.current.value,
      mark: inputMark.current.value,
      category: inputCategory.current.value
    })
    getProducts()
  }

  async function deleteProducts(id) {
    await api.delete(`/products/${id}`)
    getProducts()
  }

  
   useEffect(() => {
    getProducts()
   }, [])

  
  return (
    
    
    <div className='container'>

      <header className='nav-bar'>
        <ul>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/">User</Link>
          </li>
        </ul>
      </header>

      <div className="user-list">
       {/* PROTEÇÃO: Verifica se 'users' é uma lista antes de fazer o map */}
        {Array.isArray(products) && products.map(product => (
          <section key={product.id} className='information'>
            <div className="backcolor"></div>
            <img className='avatar' src={`https://api.dicebear.com/9.x/bottts/svg?seed=${product.name}`} alt="avatar" />
            <div>
              <h3>{product.title}</h3>
              <div className="info-section">
                <p className='id'>
                  {/* AQUI ESTÁ O CORTE DO ID SEGURO */}
                  id: {product.id ? String(product.id).slice(0, 2) : ''}
                </p>
                <p className='age'>R$ {product.value}</p>
              </div>
              <span>{product.description}</span>
            </div>
            <div className="btn-action">
              <button className='delete' onClick={() => deleteProducts(product.id)}>
                <img src={Trash} alt="Excluir" />
              </button>
              <button className='edit'>
                <img src={pencil} alt="Editar" />
              </button>
            </div>
          </section>
        ))}
      </div>

      <form className='forms-group'>
        <div className="backcolor-user">
          <h1>Cadastre Seu Produto </h1>
        </div>
        
        <input type="text" name='title' placeholder='Título' ref={inputTile}/>
        <input type="text" name='description' placeholder='Descrição'ref={inputDescription}/>
        <input type="number" name='value' placeholder='Valor'ref={inputValue}/>
        <input type="text" name='mark' placeholder='Marca' ref={inputMark}/>
        <input type="text" name='category' placeholder='Categoria'ref={inputCategory}/>
        <button type='button' onClick={createProducts}>Cadastrar</button>
      </form>
    </div>
    
    

  )
}

export default Products
