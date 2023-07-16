const express = require('express')  //1 importei o express aqui na variavel
const uuid = require('uuid')
const port = 3000//coloqei esta variavel caso eu queira trocar o numero da porta ira facilitar
const app = express() //para facilitar minha vida coloquei o expres dentro da variavel app
app.use(express.json())


const users = []//numca fazer isso se nao perde todos os dados

const chackList = (request, response, next) => {
    const { id } = request.params

    const index = users.findIndex(user => user.id === id)//encontrar que posiçao do arrey o usuario esta

    if (index < 0) {                                        //caso não encontre usuario cai no if de erro
        return response.status(404).json({ message: 'user not found' })
    }

    request.userIndex = index
    request.userId = id

    next()
}

//lista de usuarios
app.get(`/users`, (request, response) => {//criei minha primeira rota, para começas a roda e node index.js
    //parametro procuro nome e idade, requesitos.filtrar
    return response.json(users)//troquei para json
})

//adicionar usuario
app.post(`/users`, (request, response) => {
    const { name, age } = request.body

    const user = { id: uuid.v4(), name, age }

    users.push(user)

    return response.status(201).json(user)
})
//encontrar e atualizar usuarios
app.put(`/users/:id`, chackList, (request, response) => {
    //peguei o id do usuario
    const { name, age } = request.body//no meo body trago as informaçoes que quero ser atualisadas
    const index = request.userIndex
    const id = request.userId

    const updatedUser = { id, name, age }// primeiro e criar o usuario atualizado, peguei ID, nome e idade atualizados

    users[index] = updatedUser//usuario encontrado e atualização

    return response.json(updatedUser)//mostro em tela o usuario atualizado
})

//Deletar usuario

app.delete(`/users/:id`, chackList, (request, response) => {
    const index = users.findIndex(user => user.id === id)


    users.splice(index, 1)
    return response.status(204).json()
})

app.listen(port, () => {// importante avisar em qual porta a minha aplicação esta rodando
    console.log(`server start ${port}`)
})// coloquei um segundo parametro, quando servidor começas a rodas, ira mostrar a mensagem