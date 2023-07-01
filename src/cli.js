import pegaArquivo from "./index.js"; 
import fs from "fs";
import chalk from "chalk";

import listaValidada from "./http-validacao.js";

const caminho = process.argv;

const imprimeLista = async (valida, resultado, identificador = '') => {
    if(valida){
        console.log(chalk.yellow('lista validada'),
        chalk.black.bgGreen(identificador),
        await listaValidada(resultado))  
    }else{
        console.log(chalk.yellow('lista validada'),
        chalk.black.bgGreen(identificador),
        resultado)
    }
    
    
}

const processaTexto = async (argumentos) => {
    const caminho = argumentos[2]
    const valida = argumentos[3] === '--valida';


    try{
        fs.lstatSync(caminho);
    }catch(erro){
        if (erro.code === "ENOENT"){
            console.log('arquivo no exist')
            return
        }
    }
    if (fs.lstatSync(caminho).isFile()){
        const resultado = await pegaArquivo(argumentos[2]);
        imprimeLista(valida, resultado)
    }else if (fs.lstatSync(caminho).isDirectory()){
        const arquivos = await fs.promises.readdir(caminho)
        arquivos.forEach(async (nomeDeArquivo) => {
            const lista = await pegaArquivo(`${caminho}/${nomeDeArquivo}`)
            imprimeLista(valida, lista, nomeDeArquivo)
        })
    }


}

processaTexto(caminho)

/*


*/