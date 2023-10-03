// pages/api/searchUser.js

import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

// Utilizando as variáveis de ambiente
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const token = process.env.API_TOKEN;

const searchUser = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const userEmail = req.body.email;

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: token ? 'Basic ' + Buffer.from(token).toString('base64') : '',

                ixcsoft: 'listar',
            },
        };

        const body = {
            qtype: 'usuarios.email',
            query: userEmail,
            oper: '=',
            page: '1',
            rp: '2000',
            sortname: 'usuarios.id',
            sortorder: 'desc',
        };

        try {
            console.log("Buscando email:", userEmail);
            const response = await axios.post(
                apiUrl || '',  // Usando a variável de ambiente com null check

                body,
                { headers: config.headers }
            );
            res.status(200).json(response.data);
        } catch (error: any) {
            console.error("Erro na chamada da API:", error.response?.data || error.message);
            res.status(500).json({ error: 'Internal Server Error', details: error.message });
        }
    } else {
        res.status(405).end(); // Method Not Allowed
    }
};

export default searchUser;
