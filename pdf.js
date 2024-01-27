import * as pdf from 'html-pdf';
import * as fs from 'fs';
import * as http from 'http'
import { getTemplateSync, templateAddData, templateInject } from './template.js';

// const server = http.createServer((req, res) => {
//     if (req.method === 'POST')
//     {
//         const data = JSON.parse(req?.body);

//         const templateContent = getTemplateSync('/template.html', 'utf-8');
//     }
// })

const template = getTemplateSync('/template.html');

console.log(template, '\n');

const changedData = [
    templateAddData('title', 'Hola ${nombe}', template),
    templateAddData('subtitle', 'Remplaza texto', template)
]

templateInject(changedData);