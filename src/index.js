import fs from 'fs';
import chalk from 'chalk';

const trataErro = (erro) => {
    console.log(erro);
    throw new Error(chalk.red(erro.code, 'danger'));
}

const extract = (texto) => {
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const capturas = [...texto.matchAll(regex)];
    const resultados = capturas.map(captura => ({[captura[1]]: [captura[2]]}))
    return resultados.length !== 0 ? resultados : 'não há links'
}

 const pegaArquivo = async (caminhoDoArquivo) =>{
    try{
        const encoding = 'utf8';
        const texto = await fs.promises.readFile(caminhoDoArquivo, encoding)
        return extract(texto);
    }catch(erro){
        trataErro(erro);
    }
    
}


pegaArquivo('./arquivos/texto.md')

//\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)

export default pegaArquivo