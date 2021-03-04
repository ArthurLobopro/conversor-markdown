const tags = {
    //Formatação
    bold: { open: "<strong>", close: "</strong>" },
    italic: { open:"<em>",close:"</em>" },
    del: {open: "<del>",close:"</del>"},
    //Titulos
    h1: {open: "<h1>",close:"</h1>"},
    h2: {open: "<h2>",close:"</h2>"},
    h3: {open: "<h3>",close:"</h3>"},
    h4: {open: "<h4>",close:"</h4>"},
    h5: {open: "<h5>",close:"</h5>"},
    h6: {open: "<h6>",close:"</h6>"},
}
const mark = {
    //Formatação
    "**": "bold", "__": "bold",
    "*": "italic", "_":"italic",
    "~~": "del",
    //Títulos
    "#": "h1",
    "##": "h2",
    "###": "h3",
    "####": "h4",
    "#####": "h5",
    "######": "h6",
}
//let string = `**teste**\n__teste__\n*teste*\n_teste_\n~~teste~~` //Formatação
let string = `# T1\n## T2\n### T3\n#### T4\n##### T5\n###### T6` //Titulos
const formats = ["**","__","*","_","~~"]//Formatação
const titles = ["######","#####","####","###","##","#"]//Titulos
const substitui_duo = (str,type) => {
    let open,close
    ({open, close } =  tags[mark[type]])
    str = String(str).replace(type,open)
    str = str.replace(type,close)
    return str
}
const substitui_title = (str,type) => {
    let open,close
    ({open, close } =  tags[mark[type]])
    str = String(str).replace(`${type} `,open)
    str = str+=close
    return str
}
const procura_format = str => {
    let t = str.length //tamanho
    if(string.indexOf(str) != -1){
        //Inicio
        let i = string.indexOf(str)
        if(string.indexOf(str, i+t ) != -1){
            //fim
            let f = string.indexOf(str, i+t )
            let subs = string.substring(i, f+t )
            string = string.replace(subs,substitui_duo(subs,str))
        }
    }
}
const procura_title = str => {
    let t = str.length //tamanho
    if(string.indexOf(`${str} `) != -1){
        let i = string.indexOf(`${str} `)
        let f = string.indexOf("\n", i+t )
        f = f== -1 ? string.length : f
        let subs = string.substring(i, f )
        string = string.replace(subs,substitui_title(subs,str))
    }
}
for(let i of titles){
    procura_title(i)
}
for(let i of formats){
    procura_format(i)
}
//procura_format(i)
console.log(string)