/// <reference types="@shelex/cypress-allure-plugin" />

const allureWriter = require('@shelex/cypress-allure-plugin/writer');
const failFast = require('cypress-fail-fast/plugin');

module.exports = (on, config) => {
    // Подключаем Allure writer для записи отчетов
    allureWriter(on, config);

    // Подключаем fail-fast плагин (если установлен)
    failFast(on, config);

    return config;
};
