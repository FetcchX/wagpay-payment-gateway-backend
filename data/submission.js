"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
exports.default = [
    {
        id: 1,
        fields: [
            {
                name: "name",
                type: "text",
                value: "Satyam Kulkarni",
            },
        ],
        email: "test12@gmail.com",
        eth_address: "0x4e7f624C9f2dbc3bcf97D03E765142Dd46fe1C46",
        pagesId: 1,
        productId: 3,
        transaction_hash: "0xcf8d4d1f83d55379d2e8f1fd714a69d1552be42d336c967ffd4e907c4e6961a9",
        currency: client_1.CURRENCY.ethereum
    },
    {
        id: 2,
        fields: [
            {
                name: "name",
                type: "text",
                value: "Satyam Kulkarni",
            },
        ],
        email: "test2@gmail.com",
        eth_address: "0x4e7f624C9f2dbc3bcf97D03E765142Dd46fe1C46",
        pagesId: 1,
        productId: 2,
        transaction_hash: "0xcf8d4d1f83d55379d2e8f1fd714a69d1552be42d336c967ffd4e907c4e6961a9",
        currency: client_1.CURRENCY.ethereum
    },
    {
        id: 3,
        fields: [
            {
                name: "name",
                type: "text",
                value: "Satyam Kulkarni",
            },
        ],
        email: "test1@gmail.com",
        eth_address: "0x4e7f624C9f2dbc3bcf97D03E765142Dd46fe1C46",
        pagesId: 2,
        productId: 1,
        transaction_hash: "0xcf8d4d1f83d55379d2e8f1fd714a69d1552be42d336c967ffd4e907c4e6961a9",
        currency: client_1.CURRENCY.ethereum
    },
    {
        id: 4,
        fields: [
            {
                name: "name",
                type: "text",
                value: "Satyam Kulkarni",
            },
        ],
        email: "test1@gmail.com",
        eth_address: "0x4e7f624C9f2dbc3bcf97D03E765142Dd46fe1C46",
        pagesId: 1,
        productId: 5,
        transaction_hash: "0xcf8d4d1f83d55379d2e8f1fd714a69d1552be42d336c967ffd4e907c4e6961a9",
        currency: client_1.CURRENCY.usdceth
    },
    {
        id: 5,
        fields: [
            {
                name: "name",
                type: "text",
                value: "Satyam Kulkarni",
            },
        ],
        email: "tes1t@gmail.com",
        eth_address: "0x4e7f624C9f2dbc3bcf97D03E765142Dd46fe1C46",
        pagesId: 3,
        productId: 4,
        transaction_hash: "0xcf8d4d1f83d55379d2e8f1fd714a69d1552be42d336c967ffd4e907c4e6961a9",
        currency: client_1.CURRENCY.usdcsol
    },
    {
        id: 6,
        fields: [
            {
                name: "name",
                type: "text",
                value: "Satyam Kulkarni",
            },
        ],
        email: "test1@gmail.com",
        eth_address: "0x4e7f624C9f2dbc3bcf97D03E765142Dd46fe1C46",
        pagesId: 1,
        productId: 1,
        transaction_hash: "0xcf8d4d1f83d55379d2e8f1fd714a69d1552be42d336c967ffd4e907c4e6961a9",
        currency: client_1.CURRENCY.solana
    },
];
