const express = require("express");

const app = express();
const port = 3000;

//parse JSON using express
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

let chores =[
    {
        id: "1",
        chore: "Sweeping",
        area: "living room"
    },{
        id: "2",
        chore: "Clean",
        area: "bathroom"
    },{
        id: "3",
        chore: "Wash Walls",
        area: "Bedroom"
    },{
        id: "4",
        chore: "Wash Walls",
        area: "LivingRoom"
    },{
        id: "5",
        chore: "Wash Walls",
        area: "Kitchen"
    },{
        id: "6",
        chore: "Wash Walls",
        area: "Hallway"
    },{
        id: "7",
        chore: "Vacuum",
        area: "Bedroom"
    },{
        id: "21",
        chore: "Vacuum",
        area: "living Room"
    },{
        id: "74",
        chore: "Vacuum",
        area: "Hallway"
    },{
        id: "8",
        chore: "Wash Clothes",
        area: ""
    }
];

//get the chores list in the form of JSON

app.get("/chore", (req, res)=>{
    res.json(chores);
});

//add a chore to the list of chores

app.post("/chore", (req,res)=>{
    const chore = req.body

    console.log(chore);
    chores.push(chore);
    res.send("Chore is added to the list");
})

//search for a chore on the list
app.get('/chore/:id', (req,res) =>{
    const id= req.params.id;
   
    for(let chore of chores) {
        if (chore.id === id){
            res.json(chore);
            return;
        }
    }
    res.status(404).send("Chore not found!")
})

//Delete a chore in the list

app.delete('/chore/:id', (req,res) => {
    const id= req.params.id;

    chores = chores.filter(chore => {
        if(chore.id !==id) return true;

        return false;
    })

    res.send('The Chore has been deleted.')
})

//set the server to listen at the port
app.listen(port, () => console.log(`Server is listening at port ${port}`));