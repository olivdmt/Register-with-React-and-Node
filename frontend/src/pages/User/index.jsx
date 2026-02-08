import { useEffect, useState, useRef } from 'react'
import reactLogo from '../../assets/react.svg'
import viteLogo from '/vite.svg'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import './style.css'

import Trash from '../../assets/delete.png'
import pencil from '../../assets/edit-text.png'
import products from '../../pages/products/index.jsx'

function User() {
  const [users, setUsers] = useState()

  const usuario = []

  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()

  async function getUsers() {
    const usersFromApi = await api.get('/users')

    setUsers(usersFromApi.data)
  }

  async function createUsers() {

    await api.post('/users', {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value
    })
    getUsers()
  }

  async function deleteUsers(id) {
    await api.delete(`/users/${id}`)
    getUsers()
  }

  // async function editUsers(id) {
  //   await api.update(`/users/${id}`, {
  //     where: {
       
  //     }
  //   })
  // }

  useEffect(() => {
    getUsers()
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
        {Array.isArray(users) && users.map(user => (
          <section key={user.id} className='information'>
            <div className="backcolor"></div>
            <img className='avatar' src={`https://api.dicebear.com/9.x/bottts/svg?seed=${user.name}`} alt="avatar" />
            <div>
              <h3>{user.name}</h3>
              <div className="info-section">
                <p className='id'>
                  {/* AQUI ESTÁ O CORTE DO ID SEGURO */}
                  id: {user.id ? String(user.id).slice(0, 2) : ''}
                </p>
                <p className='age'>{user.age}</p>
              </div>
              <span>{user.email}</span>
            </div>
            <div className="btn-action">
              <button className='delete' onClick={() => deleteUsers(user.id)}>
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
          <h1>Cadastre Seu Usuário</h1>
        </div>
        
        <input type="text" name='nome' placeholder='nome'  ref={inputName}/>
        <input type="email" name='email' placeholder='email' ref={inputEmail}/>
        <input type="number" name='idade' placeholder='idade' ref={inputAge}/>
        <button type='button' onClick={createUsers}>Cadastrar</button>
      </form>
    </div>
    
    

  )
}

export default User
