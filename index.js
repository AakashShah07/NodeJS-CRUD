const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
let items = [];
let id = 1;

app.post("/items",(req, res) =>{
  const {name} =  req.body;
  if (!name) return res.status(400).send("Name is missing");

  const newItem = {id: id++, name};
  items.push(newItem);
  res.status(201).json(newItem);
})

app.get("/items", (req, res) => {
  res.json(items);
})

app.get("/items/:id", (req, res)=>{
  const item  = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).send("Item not found");
  res.json(item);
})

app.delete("/items/:id",(req, res)=>{
  
  const index =  items.findIndex(i => i.id ===parseInt(req.params.id));
  if (index === -1) return res.status(404).send("Item not found");

  const deleted = items.splice(index, 1);
  res.json(deleted[0])

})

app.put('/item/:id', (req, res)=>{
  const item = items.findIndex(i => i.id === parseInt(req.params.id));
  if(item === -1) return res.json(404).send("Item not found");

  const {name} = res.body ;
  if (!name) return res.status(400).send("Name is required");

  item.name = name;
  res.json(item);
})

app.listen(PORT, ()=>{
  console.log(`Server is running at http://localhost:${PORT}`)
})