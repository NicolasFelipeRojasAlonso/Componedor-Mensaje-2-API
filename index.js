
// Axios, que nos permite hacer solicitudes HTTP
const axios = require('axios');
// Chalk, permite dar color al texto en la consola
const chalk = require('chalk');

// URL para obtener la lista de usuarios
const usersE = "https://jsonplaceholder.typicode.com/users";
// URL para obtener la lista de posts
const postE = "https://jsonplaceholder.typicode.com/posts";

// Función para obtener la lista de usuarios
const getUsers = async () => {
    console.log(chalk.yellow("Obteniendo usuarios..."));
    const response = await axios.get(usersE);
    console.log(chalk.green(`Usuarios obtenidos ${response.data.length}`));
    return response.data;
};
// Función para obtener la lista de posts
const getPosts = async () => {
    console.log(chalk.yellow("Obteniendo posts..."))
    const response = await axios.get(postE);
    console.log(chalk.green(`Posts obtenidos ${response.data.length}`));
    return response.data;
};

// Función para contar la cantidad de posts que contienen la palabra "qui" y asignarlos a cada usuario
const conteoqui = async (users, posts) => {
    // Array vacío para almacenar información de los usuarios
    const InfoUsers = [];
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        let userPostsConteo = 0;
        for (let j = 0; j < posts.length; j++) {
            // Verifico si el post pertenece al usuario actual y si contiene la palabra "qui" en su body
            if (posts[j].userId === user.id && posts[j].body.includes("qui")) {
                userPostsConteo++;
            }
        }
        // Asigno el nombre de usuario y la cantidad de "qui" al usuario correspondiente en el array de InfoUsers
        InfoUsers[i] = { userName: user.username, postsNumber: userPostsConteo };
    }
    // Retorno el array con la información
    return InfoUsers;
};

// Función que ejecuta el programaa
const resultado = async () => {
    const users = await getUsers();
    const posts = await getPosts();
    console.log(chalk.yellow("Juntando información..."));
    const userInfo = await conteoqui(users, posts);
    console.log(userInfo);
};
resultado();
