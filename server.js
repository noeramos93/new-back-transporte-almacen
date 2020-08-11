const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());

var permisos = [
    { Id_Permiso: "1", Nombre: "Registrar" }, { Id_Permiso: "2", Nombre: "Eliminar" }, { Id_Permiso: "3",
        Nombre: "Modificar" },{Id_Permiso: "4", Nombre: "Consulta" },{ Id_Permiso: "5",Nombre: "Autorizar"}];

var roles =[
    {Id_Rol:"1", Nombre:"Administrador"},{Id_Rol:"2", Nombre:"Operativo"},{Id_Rol:"3", Nombre:"Gerente"},
    {Id_Rol:"4", Nombre:"Administrativo"}];

var products = [
    {id: "1",image: "assets/images/camiseta.png",title: "Camiseta",price: 80000,description: "bla bla bla bla bla"},
    {id: "2",image: "assets/images/hoodie.png",title: "Hoodie",price: 80000,description: "bla bla bla bla bla"},
    {id: "3",image: "assets/images/mug.png",title: "Mug",price: 80000,description: "bla bla bla bla bla"},
    {id: "4",image: "assets/images/pin.png",title: "Pin",price: 80000,description: "bla bla bla bla bla"},
    {id: "5",image: "assets/images/stickers1.png",title: "Stickers",price: 80000,description: "bla bla bla bla bla"},
    {id: "6",image: "assets/images/stickers2.png",title: "Stickers",price: 80000,description: "bla bla bla bla bla"},
];

app.get('/getRoles', function (req, res) {
    res.json({response_code:200,response_msg: 'Operacion exitosa',list: roles});
});

app.get('/getPermisos', function (req, res) {
  res.json({response_code:200,response_msg: 'Operacion exitosa',list: permisos});
});

/**
 * Metodo get para obtener la informacion de un permiso
 * en base al id
 */
app.get('/getPermisoById/:idPer', function(req,res){
    let  idSearch = req.params.idPer;
    let permiso = permisos.find(per => per.Id_Permiso === idSearch);
    let response = {};
    if(permiso === undefined){
        response ={
            response_code: 400,
            response_msg: `Permiso con id ${idSearch} no encontrado`,
            permiso: {},
        }
    }else{
        response ={
            response_code:200,
            response_msg: `Operacion exitosa`,
            permiso: permiso,
        }
    }
    res.json(response);
});

app.post('/saveInfo', function(req, res){
    res.send("Respuesta dumy de un post");
});

app.put('/updateInfoPermiso/:id', function(req, res){
    let  idSearch = req.params.id;
    const editPermiso ={
        Id_Permiso: idSearch,
        Nombre: req.body.Nombre
    };
    const index = permisos.findIndex(per => per.Id_Permiso === idSearch);
    permisos[index] = editPermiso;
    res.send(permisos);
});

app.get('/produts', function(req, res) {
    res.send(products);
});

app.get('/produts/:id', function(req, res) {
    let  idSearch = req.params.id;
    let product = products.find(prod => prod.id === idSearch);
    res.send(product);
});

app.post('/produts/', function(req, res) {
    const newProd = {
        id: req.body.id,
        image: "assets/images/cami.png",
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
    };
    products.push(newProd);
    res.send(newProd);
});

app.put('/produts/:id', function(req, res) {
    let  idSearch = req.params.id;
    const editProduct ={
        id: idSearch,
        image: "assets/images/cami.png",
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
    };
    const index = products.findIndex(prod => prod.id === idSearch);
    products[index] = editProduct;
    res.send(editProduct);
});

app.delete('/produts/:id', function(req, res) {
    let  idSearch = req.params.id;
    
    const index = products.findIndex(prod => prod.id === idSearch);
    if(index === -1){
        res.send(false);
    }else{
        products.splice( index, 1 );
        res.send(true);
    }
});

app.listen(3003, function () {
  console.log('Servidor con la politica de CORS desabilitado en el puerto 3003')
});