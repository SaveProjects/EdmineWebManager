import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('basededonner_edminewebmanager', '347945', '@Milo2003', {
    dialect: 'mysql',
    host: 'mysql-basededonner.alwaysdata.net',
    dialectModule: require('mysql2'),
});

export default sequelize