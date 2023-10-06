import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const searchUser = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const userEmail = req.body.email;
        const userPassword = req.body.password;


        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const API_TOKEN = process.env.API_TOKEN;
        const SECRET_KEY = process.env.SECRET_KEY;  // Adicione esta chave secreta às suas variáveis de ambiente para assinar o JWT.
        console.log("API_URL:" + API_URL + " API_TOKEN:" + API_TOKEN + " SECRET_KEY:" + SECRET_KEY);
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: API_TOKEN ? 'Basic ' + Buffer.from(API_TOKEN).toString('base64') : '',

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
            if (API_URL) {
                const response = await axios.post(API_URL, body, { headers: config.headers });

                if (SECRET_KEY) {
                    const user = response.data.registros[0];  // Assumindo que a resposta contém um array chamado registros.
                    // Logs para depuração:
                    console.log("userPassword:", userPassword);
                    console.log("user.senha:", user.senha);
                    console.log("Type of userPassword:", typeof userPassword);
                    console.log("Type of user.senha:", typeof user.senha);
                    if (user && bcrypt.compareSync(userPassword, user.senha)) {

                        // Se a senha for correta, assine o JWT.
                        const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
                        return res.status(200).json({ token });
                    }

                    // Autenticação falhou.
                    res.status(401).json({ error: 'Authentication failed.' });
                } else {
                    res.status(500).json({ error: 'Internal Server Error', details: 'SECRET_KEY is undefined' });
                }
            } else {
                res.status(500).json({ error: 'Internal Server Error', details: 'API_URL is undefined' });
            }
        } catch (error: any) {
            console.error("Erro na chamada da API:", error.response?.data || error.message);
            res.status(500).json({ error: 'Internal Server Error', details: error.message });
        }
    } else {
        res.status(405).end(); // Method Not Allowed
    }
};

export default searchUser;
