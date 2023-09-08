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
// const sequelize = new Sequelize({
//   dialect: 'postgres', // Le dialecte dépend de votre base de données
//   host: 'localhost',    // L'adresse de votre serveur de base de données
//   username: 'Darref',
//   password: process.env.PWD,
//   database: 'jordaBDD',
// });
const sequelize = new sequelize_1.Sequelize({
    dialect: "sqlite",
    storage: "./db.sqlite",
});
const Todo = sequelize.define('Todo', {
    value: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
});
funcSync();
function funcSync() {
    return __awaiter(this, void 0, void 0, function* () {
        yield sequelize.sync();
    });
}
// Fonction pour ajouter une entrée "testTodoValue" dans la table Todo
function addTestTodo(valueTodo) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Cela crée automatiquement la table si elle n'existe pas encore
            yield Todo.create({
                value: valueTodo,
            });
        }
        catch (error) {
            console.error('Erreur lors de l\'ajout de l\'entrée dans la table Todo :', error);
        }
        finally {
            yield sequelize.close(); // N'oubliez pas de fermer la connexion lorsque vous avez terminé
        }
    });
}
app.get('/addSentenceToBDD/:sentance', (req, res) => {
    // Récupérez les données du corps de la requête
    const donnees = req.params.sentance;
    //
    addTestTodo(req.params.sentance);
    // ...
    // Faites ici ce que vous souhaitez avec les données reçues
    console.log('Données reçues :', donnees);
    // Réponse à la requête
    res.status(200).json({ message: 'Données reçues avec succès' });
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
