"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const sequelize_1 = require("sequelize");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const sequelize = new sequelize_1.Sequelize({
    dialect: "sqlite",
    storage: "./db.sqlite",
});
const Todo = sequelize.define('Todo', {
    value: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
}, { timestamps: false,
});
funcSync();
function funcSync() {
    return __awaiter(this, void 0, void 0, function* () {
        yield sequelize.sync();
    });
}
// Fonction pour ajouter une entrée "testTodoValue" dans la table Todo
function addTodo(valueTodo, valueStatus) {
    return __awaiter(this, void 0, void 0, function* () {
        // Cela crée automatiquement la table si elle n'existe pas encore
        yield Todo.create({
            value: valueTodo,
            status: valueStatus
        });
    });
}
//
function updateTodo(valueTodo, valueStatus) {
    return __awaiter(this, void 0, void 0, function* () {
        yield Todo.update({ status: valueStatus }, {
            where: {
                value: valueTodo.toString(),
            },
        });
    });
}
app.get('/addSentenceToBDD/:sentance/:status', (req, res) => {
    // Récupérez les données du corps de la requête
    const donnees = req.params.sentance;
    const status = Boolean(req.params.status);
    //
    addTodo(donnees, status);
    // Faites ici ce que vous souhaitez avec les données reçues
    console.log('Données reçues :', donnees);
    // Réponse à la requête 
    res.status(200).json({ message: 'Données créées avec succès' });
});
app.get('/updateSentence/:sentance/:status', (req, res) => {
    // Récupérez les données du corps de la requête
    const donnees = req.params.sentance;
    const status = req.params.status;
    //
    updateTodo(donnees, status);
    // Faites ici ce que vous souhaitez avec les données reçues
    console.log('Données reçues :', donnees, " ", status);
    // Réponse à la requête
    res.status(200).json({ message: 'Données updated avec succès' });
});
app.get('/removeAll', (req, res) => {
    Todo.destroy({
        where: {},
        truncate: true
    });
    // Réponse à la requête
    res.status(200).json({ message: 'Données updated avec succès' });
});
function findAllTodos() {
    return __awaiter(this, void 0, void 0, function* () {
        const todos = yield Todo.findAll();
        return yield todos;
    });
}
app.get('/getAll', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let variabb = yield findAllTodos();
    // Réponse à la requête
    if (variabb.length > 0) {
        res.status(200).json(variabb);
    }
}));
app.get('/remove/:valueTodo', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield Todo.destroy({
        where: {
            value: req.params.valueTodo.toString()
        },
    });
}));

app.get('/' , (req,res)=>
{
    res.status(200)
})
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
