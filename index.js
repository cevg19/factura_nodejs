import express, { response } from 'express'
import {db} from './config/config_firebase.js'

const app = express()

app.listen('3000',(req,res)=>{
    console.log('Aplicacion Iniciada en http://localhost:3000')
})

app.set('views','./views') 
app.set('view engine', 'ejs') 
app.use(express.static('./src')) // carga los archivos estaticos (css)
app.use(express.urlencoded({extended:true})) 


// VISTA PRINCIPAL
app.get('/', async(req,res)=>{        
    const peticion = await db.collection('facturas').get() // Devuelve todos los datos
    const {docs} = peticion
    const facturas = docs.map(factura => ({id:factura.id,datos:factura.data()})).reverse()
   console.log({facturas})
    res.render('index',{facturas})
    
})
// GUARDAR FACTURA 
app.post('/nueva-factura',(req,res)=>{
    var valorSinIva = []
    var valorIva = []
    var total = 0
    
    for(let i=0;i<req.body.articulo.length;i++){
       
         valorSinIva[i] = ((req.body.valor[i] *  req.body.cantidad[i]) / ((req.body.iva[i]/100)+1)).toFixed(4)
          valorIva[i] = (valorSinIva[i] * (req.body.iva[i]/100)).toFixed(4)
        
        total += req.body.valor[i]*req.body.cantidad[i];              
    }
    const newFactura = {
        nombre: req.body.nombre,
        identificacion: req.body.identificacion,
        telefono: req.body.telefono,
        articulo: req.body.articulo,
        valor: req.body.valor,
        cantidad: req.body.cantidad,
        iva: req.body.iva,
        valorSinIva: valorSinIva,
        valorIva: valorIva,
        total: total
        
    }
    db.collection('facturas').add(newFactura)
    res.redirect('/')

})


//BORRAR
app.get('/borrar-factura/:id', (req,res)=>{
    let id = req.params.id
    db.collection('facturas').doc(id).delete()
    res.redirect('/')
})

// GENERAR FACTURA
app.get('/generar-factura/:id', async(req,res) =>{
    let id = req.params.id
    const peticion = await db.collection('facturas').doc(id).get()
    const factura = {id:id, datos:peticion.data()}    
    res.render('factura',{factura})
})