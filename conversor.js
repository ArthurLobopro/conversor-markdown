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
    //Outros
    hr: {open: "<hr>",close:""}
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
    //Outros
    "***": "hr"
}
//let string = `**teste**\n__teste__\n*teste*\n_teste_\n~~teste~~` //Formatação
//let string = `# T1\n## T2\n### T3\n#### T4\n##### T5\n###### T6` //Titulos
//let string = `\n\n a*** \n ---\n`
let string
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
    while (true) {
        let backup = string
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
        if(backup == string){ break}
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
const procura_hr = (str) => {
    const substitui_hr = (str,type) => {
        str = str.replace(type,"<hr>")
        return str
    }
    if(string.indexOf(str) != -1){
        console.log(string)
        let i = string.indexOf(str)
        let f = string.indexOf("\n",i)
        f = f == -1 ? string.length : f
        i = string.lastIndexOf("\n",i)
        i = i == -1 ? 0 : i
        let subs = string.substring(i,f)
        let error = false
        for(let i of subs){
            if(i != "\n" && i != str[0] && i != " "){
                error = true
            }
        }
        if(error == false){
            subs = subs.replace('\n','')
            string = string.replace(subs,substitui_hr(subs,str))
        }
    }
}
const input = document.getElementById('input')
const output = document.getElementById('output')
function init(){
    string = input.value
    procura_hr("***")
    procura_hr("---")
    for(let i of titles){
        procura_title(i)
    }
    for(let i of formats){
        procura_format(i)
    }
    output.value = string
}