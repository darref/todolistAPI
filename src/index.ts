import express from "express"
import dotenv from "dotenv"
import { Sequelize , DataTypes} from "sequelize";
dotenv.config();
const app = express();
const port = process.env.PORT;  

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db.sqlite",
})
const Todo = sequelize.define('Todo', {
  value: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type : DataTypes.STRING,
    allowNull: false
  }, }, {   timestamps: false, 
});

funcSync();

async function funcSync()
{
  await sequelize.sync();
}

// Fonction pour ajouter une entrée "testTodoValue" dans la table Todo
async function addTodo(valueTodo:string , valueStatus:boolean) {
    // Cela crée automatiquement la table si elle n'existe pas encore
    await Todo.create({
      value: valueTodo,
      status: valueStatus
    });
  }
  //
  async function updateTodo(valueTodo:string , valueStatus:string) {

    await Todo.update({ status: valueStatus }, {
      where: {
        value : valueTodo.toString(),
      },
    });
  }



app.get('/addSentenceToBDD/:sentance/:status', (req, res) => {
  // Récupérez les données du corps de la requête
  const donnees = req.params.sentance;
  const status = Boolean(req.params.status);
  //
  addTodo(donnees , status); 
  // Faites ici ce que vous souhaitez avec les données reçues
  console.log('Données reçues :', donnees);
  // Réponse à la requête 
  res.status(200).json({ message: 'Données créées avec succès' }); 
});
app.get('/updateSentence/:sentance/:status', (req, res) => {
  // Récupérez les données du corps de la requête
  const donnees = req.params.sentance;
  const status = req.params.status ;
  //
  updateTodo(donnees , status);
  // Faites ici ce que vous souhaitez avec les données reçues
  console.log('Données reçues :', donnees , " " , status);
  // Réponse à la requête
  res.status(200).json({ message: 'Données updated avec succès' });
});
app.get('/removeAll', (req, res) => {
  Todo.destroy({
    where: {},
    truncate: true
  })

  // Réponse à la requête
  res.status(200).json({ message: 'Données updated avec succès' });
});

async function findAllTodos()
{
  const todos = await Todo.findAll(); 
  return  await todos; 
}

app.get('/getAll', async (req, res) => {
  
  let variabb =  await findAllTodos()
  // Réponse à la requête
  if(variabb.length > 0) 
  {
    res.status(200).json(variabb)
  }
  
});
app.get('/remove/:valueTodo', async (req, res) => {
  await Todo.destroy({
    where: {
      value: req.params.valueTodo.toString()
    },
  });
  
  
  
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
