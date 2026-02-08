// Iremos ultilizar a biblioteca express para definir rotas
import express from 'express'
import cors from 'cors'
//Iremos agora utilizar o Prisma cliente para salvar nossos usuarios nno database online
import { PrismaClient } from '@prisma/client'

const prisma =  new PrismaClient()


// Para usarmos o express precisaremos usar uma variável "APP"
// e iremos passar o express como uma função

const app = express()
//Por padrão o express não usa JSON, então iremos informar para ele
app.use(express.json())
app.use(cors())


// Iremos criar uma rota para mostrar uma informação (GET -> Obter)
/*
    As rotas precisam de 2 coisas:

    1) O tipo da rota / metodo HTTP (get, post, put etc...)
    2) Endereço ( /users)

*/
// Aqui iremos usar (req, res) para representar a requisição e a resposta
app.post('/users', async (req, res) => {
    // //iremos salvar nosso usuarios na nossa lista de usuarios
    // usuario.push(req.body)
    // // E enviaremos uma resposta de confirmação e mostraremos o usuário que foi criado
    // res.status(201).json(req.body)

    //Dessa vez usaremos o prisma para salvar nossos usuários
    await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.status(200).json(req.body)
    
})

app.get('/users', async (req, res) => {
    
    // Aqui usamos o prisma para usar os usuários
    const user = await prisma.user.findMany()
    //Enviaremos um codigo de confirmação e mostremos os usuários
    res.status(200).json(user)
})

// Rota para editar as configurações
app.put('/users/:id', async (req, res) => {
    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.status(201).json(req.body)
})

//Rota para deletar um usuário
app.delete('/users/:id', async (req, res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })

    res.status(200).json("Message: Deleted User with Sucefull!")
})

/*
=======================================
---------- ROTA DE PRODUTOS ----------- 
=======================================
*/

app.post('/products', async (req, res) => {
    await prisma.product.create({
        data: {
            title: req.body.title,
            description: req.body.description,
            value: req.body.value,
            mark: req.body.mark,
            category: req.body.category
        }
    })

    res.status(201).json(req.body)
})

app.get('/products', async (req, res) => {

    // res.send('Okay deu certo')
    const product = await prisma.product.findMany()

    res.status(200).json(product)

})

app.put('/products/:id', async (req, res) => {
    
    await prisma.product.update({
        where: {
            id: req.params.id
        },
        data: {
            title: req.body.title,
            description: req.body.description,
            value: req.body.value,
            mark: req.body.mark,
            category: req.body.category
        }
    })

    res.status(200).json(req.body)
})

app.delete('/products/:id', async (req, res) => {
    await prisma.product.delete({
        where: {
            id: req.params.id
        }
    })

    res.status(200).json("message: Product DELETE with sucess!!!")
})
/*
    Criar nossa API de usuários

    - Criar um usuário (Post)
    - Listar todos os usuários (Get)
    - Editar um usuário 
    - Deletar um usuário (Put)
    
*/


//Definindo uma porta para rodar o servidor
app.listen(3000)

/* 
    Usuários: olivdmt
    Senha: DbyJq0zqYT4Uf07e

*/


