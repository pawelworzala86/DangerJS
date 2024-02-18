var fileName = process.argv[2]

const fs = require('fs')

//const sourceOrigin = await Deno.readTextFile('./source/test.c');
const sourceOrigin = fs.readFileSync('./source/'+fileName+'.js').toString()

var ignoredFunctions = ['alloc','realloc']
var FUNCTIONS = ['CreateWindow']
var MACROS = []
var DATA = []
var STR = []
var defaultContructors = ''
var ARRAYS = {}
var CLASSES = {}
var OBJECTS = {}
var REGISTERS = ['rax','rbx','rcx','rdx']
var TYPES = {}
var THREADS = []

function ignoreName(name){
    return ignoredFunctions.includes(name)
}


function ParseBlocks(ROOTSource){

    //this.ROOT.source = ''
    var iteration = 1
    var source = ''

    for(let i=0;i<ROOTSource.length;i++){

        var char = ROOTSource[i]

        if(char=='{'){
            source+=':'+iteration+'{'
            iteration++
        }else if(char=='}'){
            iteration--
            source+=':'+(iteration)+'}'
        }else{
            source+=char
        }

    }

    let uniuque = 1024
    let index = 1
    while(1024 > index){
        tmp = ' '+source
        while(tmp != source){
            tmp = source
            source = source
                .replace(':'+index+'{',':'+uniuque+'{')
                .replace(':'+index+'}',':'+uniuque+'}')
            if((tmp != source)){
                uniuque++
            }
        }
        index++
    }

    return source

}

var parseSource = (source)=>{



    var r=(match,replace)=>{
        source = source.replace(match,replace)
    }


    source = ParseBlocks(source)

    
    //clean code
    source = source.replace(/\/\/[\s\S]+?$/gm,'')
    source = source.replace(/\/\*[\s\S]+?\*\//gm,'')




    //inline functions
    r(/(.*)\(.*\(.*/gm,match=>{
        var first = match.split('(')[0]
        var rest = match.replace(first+'(','')
        var pref = ''
        var idx = 1
        rest=rest.replace(/([a-zA-Z0-9\_\.]+)\(\)|([a-zA-Z0-9\_\.]+)\([\s\S]+?\)/gm,mmm=>{
            var name = mmm.split('(')[0]
            var params = mmm.replace(name+'(','').split(')')[0]
            pref += 'prm'+idx+' = '+name+'('+params+')\n'
            idx++
            return 'prm'+(idx-1)
        })
        return pref+'\n'+first+'('+rest+''
    })
    //fs.writeFileSync('./cache/inline.js',source)


    var GLF = []
        r(/impGL\ ([\w]+)$/gm,match=>{
            //match.replace(/GLIMPORT\ /gm,'').replace(/([\w]+)/gm,name=>{
                var name = match.split('impGL')[1].trim()
                GLF.push(name)
            //})
            return ''+name+' dq ?'
        })
        r(/GLIMPORTFUNC/gm,match=>{
            return GLF.map(nn=>'MacroLoadGLFunc(\"'+nn+'\",'+nn+')').join('\n')
        })

        r( /gl\.(.*)\(\)/gm, 'gl$1()' )
        r( /gl\.([\w]+)\((.*)\)/gm, 'gl$1($2)' )
        r( /gl\./gm, 'GL_' )
        r( /GL_p/gm, 'GL_' )
    
        r( /out/gm, 'oout' )

        
    r(/[0-9]+\*[0-9]+/gm,match=>{
        return eval(match)
    })




    //function inner replacements
    var whileIndex = 0
    var _IFidx = 0
    var blockIndex = 6675
    source = source.replace(/function(.*)(?<num>\:[0-9]+)\{([\s\S]+?)(\k<num>)\}/gm,match=>{

        var LOCAL = ''

        //FOR
        match = match.replace(/\bfor([\s\S]+?)(?<num>\:[0-9]+)\{([\s\S]+?)(\k<num>)\}/gm,match=>{
            var head=match.split('(')[1].split(')')[0].trim().split(';')
            var body=match.split('{')[1]
            body=body.substring(0,body.length-6)
            blockIndex++
            return `${head[0]}
            while(${head[1]}):${blockIndex}{
                ${head[2]}
                ${body}
            :${blockIndex}}`
        })

        //while
        match = match.replace(/while([\s\S]+?)(?<num>\:[0-9]+)\{([\s\S]+?)(\k<num>)\}/gm,match=>{
            var head=match.split('(')[1].split(')')[0].trim()
            var body2=match.split('{')[1]
            body2=body2.substring(0,body2.length-6)
            //console.log('WHILE',head,body2)
            whileIndex++
            LOCAL+=`LOCAL while${whileIndex}\n`
            blockIndex++
            return `while${whileIndex}:
            ${body2}
            if(${head}):${blockIndex}{
                jmp while${whileIndex}
            :${blockIndex}}`
        })

        //if
        var __IF=(oper,var1,var2)=>{
            var regexpr=new RegExp('if\\(([\\w]+)['+oper+']+([\\w]+)\\)(?<num>\\:[0-9]+)\\{([\\s\\S]+?)(\\k<num>)\\}else(?<num2>\\:[0-9]+)\\{([\\s\\S]+?)(\\k<num2>)\\}','gm')
            match=match.replace( regexpr, mmm=>{
                var head = mmm.split('(')[1].split(')')[0]
                var left = head.split(oper.replace(/\\/gm,''))[0]
                var right = head.split(oper.replace(/\\/gm,''))[1]
                var body1 = mmm.split('{')[1].split('}')[0]
                var body2 = mmm.split('{')[2].split('}')[0]
                _IFidx++
                LOCAL+=`LOCAL if${_IFidx}\n`
                LOCAL+=`LOCAL else${_IFidx}\n`
                LOCAL+=`LOCAL endif${_IFidx}\n`
                LOCAL+=`LOCAL else${_IFidx}\n`
                return 'mov rax, '+left+'\nmov rbx, '+right+'\ncmp rax, rbx\n'+var1+' if'+_IFidx
                +'\n'+var2+' else'+_IFidx+'\njmp .endif'+_IFidx+'\n.if'
                +_IFidx+':\n'+body1+'jmp endif'+_IFidx+'\nelse'+_IFidx+':\n'+body2+'\nendif'+_IFidx+':'
            })
            var regexpr=new RegExp('if\\(([\\w]+)'+oper+'([\\w]+)\\)(?<num>\\:[0-9]+)\\{([\\s\\S]+?)(\\k<num>)\\}','gm')
            match=match.replace( regexpr, mmm=>{
                _IFidx++
                var head = mmm.split('(')[1].split(')')[0]
                var left = head.split(oper.replace(/\\/gm,''))[0]
                var right = head.split(oper.replace(/\\/gm,''))[1]
                var body = mmm.split('{')[1].split('}')[0]
                _IFidx++
                LOCAL+=`LOCAL if${_IFidx}\n`
                LOCAL+=`LOCAL endif${_IFidx}\n`
                return 'mov rax, '+left+'\nmov rbx, '+right+'\ncmp rax, rbx\n'+var1
                +' if'+_IFidx+'\njmp endif'+_IFidx+'\nif'
                +_IFidx+':\n'+body+'\nendif'+_IFidx+':'
            })
        }
        __IF('\\=\\=\\=','je','jne')
        __IF('\\=\\=','je','jne')
        __IF('\\<','jl','jnl')
        __IF('\\!\\=','jne','je')
        __IF('\\>','jg','jng')


        var first = match.split('{')[0]
        var rest = match.split('{')
        rest[0]=first
        rest[1]='\n'+LOCAL+'\n'+rest[1]

        return rest.join('{')

    })


    r(/([a-zA-Z0-9]+)\+\+/gm,'inc $1')
    r(/([a-zA-Z0-9]+)\-\-/gm,'dec $1')
    r(/([a-zA-Z0-9]+) (\+|\-|\\|\*)\= ([a-zA-Z0-9]+)/gm,'$1=$1$2$3')




    r(/async\ function([\s\S]+?)\}/gm,match=>{
        var name = match.split('function')[1].split(')')[0].replace('(','').trim()
        THREADS.push(name)
        match=match.replace(new RegExp('async\\ function\\ ('+name+')\\((.*)\\)',''),'$1 PROC $2')
        match=match.replace('}','\nret\n'+name+' ENDP')
        match=match.replace(/PROC(.*)$/gm,'PROC')
        return '\n.data\n'+name+'ID dq ?\n.code\n'+match+'\n.data\n'
    })
    //console.log('THREADS',THREADS)
    THREADS.map(THREAD=>{
        r(new RegExp('^(.*)'+THREAD+'\\(\\)','gm'),mmm=>{
            if(mmm.indexOf('await')>-1){
                return 'mov rax, rvcall('+mmm.replace('await','').replace(/\(|\)/gm,'')+')'
            }
            return `CreateThread(0,0,ADDR `+THREAD+`,ADDR `+THREAD+`ID,0,0)\n;mov `+THREAD+`HANDLE, rax`
            //`mov `+THREAD+`HANDLE, rv(CreateThread,0,0,ADDR `+THREAD+`,ADDR `+THREAD+`ID,0,0)`
        })
    })




    r(/var (.*) = (.*)/gm,match=>{
        //console.log('TYPE',match)
        var name=match.split('=')[0].replace('var','').trim()
        var val=match.split('=')[1].trim()
        if(val.indexOf('.')>0){
            //console.log('float')
            TYPES[name] = 'float'
        }else{
            //console.log('int')
            TYPES[name] = 'int'
        }
        return match
    })

    
    
    var index = 0
    var parseMaths=(line,op,name)=>{
        line=line.replace( new RegExp('(.*)\\b([a-zA-Z\\_0-9\\[\\]]+)[\ ]+'+op+'[\ ]+([a-zA-Z\\_0-9\\[\\]]+)','gm'), 
            match=>{
                var matched = /(.*)\b([a-zA-Z\_0-9\\[\]]+)[\ ]+([\+\-\*\/])[\ ]+([a-zA-Z\_0-9\[\]]+)/gm.exec(match)
                index++
                if((TYPES[matched[2]]==undefined)||((TYPES[matched[2]]=='float')||(matched[2].indexOf('mth')==0))){
                    return 'Macro_Math_'+name+'('+matched[2]+','+matched[4]+',mth'+index+')\n'+matched[1]+'mth'+index+''
                }else{
                    return 'Macro_iMath_'+name+'('+matched[2]+','+matched[4]+',mth'+index+')\n'+matched[1]+'mth'+index+''
                }
        })
        return line

    }
    var lines=source.split('\n')
    lines=lines.map(line=>{
        index = 0
        while(index<16){
            line=parseMaths(line,'\\*','pomnoz')
            line=parseMaths(line,'\\/','podziel')
            line=parseMaths(line,'\\+','dodaj')
            line=parseMaths(line,'\\-','odejmnij')
            index++
        }
        return line
    })
    source=lines.join('\n')
    //fs.writeFileSync('./cache/maths.js',source)


    var lines = source.split('\n')
    lines=lines.map(line=>{
        var pref = ''
        var index=0
        line = line.replace(/\*[a-zA-Z0-9\_\.]+/gm,match=>{
            var name = match.substring(1)
            var reg = REGISTERS[index]
            index++
            pref += `lea ${reg}, ${name}\n`
            return `${reg}`
        })
        return pref+'\n'+line
    })
    source = lines.join('\n')




    source = source.replace(/var ([a-zA-Z0-9\_]+) = \[.*\]$/gm,match=>{
        match=match.replace('var','')
        var name = /([a-zA-Z0-9\_]+)/gm.exec(match)[1]
        var data = /([0-9\.\,\-]+)/gm.exec(match)[1]
        DATA.push(name)
        return `.data
${name} dq ${data}
.code`
    })



    for(const func of ignoredFunctions){
        r(new RegExp('([a-zA-Z0-9\\_\\.]+)\\ \\=\\ ('+func+'\\(.*)','gm'),'mov $1, $2')
    }
    //fs.writeFileSync('./cache/dump11.js',source)
    r(/([a-zA-Z0-9\_\.]+)\ \=\ ([a-zA-Z0-9\_\.]+\(.*\))$/gm,'$2\nmov $1, rax')

    r(/(this\.[a-zA-Z0-9]+)\ \=\ ([a-zA-Z0-9\_\.]+\(.*)/gm,'$2\nmov $1, rax')



    source = source.replace(/import(.*)/gm,match=>{
        match=match.replace(/\'/gm,'')
        if(match.indexOf('.inc')>-1){
            match=match.replace('import','include')
        }
        if(match.indexOf('.lib')>-1){
            match=match.replace('import','includelib')
        }
        if(match.indexOf('.js')>-1){
            const name=match.replace('import ','')
            const data = fs.readFileSync('./source/'+name).toString()
            //return parseSource(data)
            fs.writeFileSync('./cache/'+name.replace('.js','.asm'),parseSource(data))
            match=match.replace('.js','.asm')
        }
        match=match.replace('import','include')
        return match
    })
















    source = source.replace(/^class([\s\S]+?)(?<num>\:[0-9]+)\{([\s\S]+?)(\k<num>)\}/gm,match=>{
        var name = match.split(' ')[1].replace('{','').trim().split(':')[0]
        console.log('name:::',name)
        const fields=[]
        const fields2=[]
        const funcs={}
        match=match.replace(/constructor\(\)(?<num>\:[0-9]+)\{([\s\S]+?)(\k<num>)\}/gm,mmm=>{
            mmm.replace(/this\.(.*)/gm,m=>{
                var field=m.replace('this.','')
                field=field.split('=')[0]+'QWORD ?'
                var field2=m.replace('this.','')
                fields2.push(field2.replace('=','dq').replace('[','').replace(']',''))
                fields.push(field)
                console.log('FLD ',fields,fields2)
            })
            var bdy=fields2.map(field=>{
                return 'this.'+field.replace('dq','=')
            }).join('\n')
            funcs['constructor'] = {data:bdy,params:[]}
            return ''
        })
        match=match.replace(/[a-zA-Z0-9]+\(.*(?<num>\:[0-9]+)\{([\s\S]+?)(\k<num>)\}/gm,mmm=>{
            var fname=mmm.split('(')[0].trim().substring(-5)
            var params=mmm.split('(')[1].split(')')[0].trim()
            var data=mmm.split('{')[1]
            //try{
            data=data.substring(0,data.length-6)
            //}catch(e){}
            console.log('DATA:::',fname,data)
            funcs[fname] = {data:data,params}
            return ''
        })

        console.log('funcs:::',funcs)

        OBJECTS[name]={name,fields:fields2,funcs,params:[]}

        var functions = []
        for(const func of Object.keys(funcs)){
            var FUNC = funcs[func]
            var data = FUNC.data
            var params = FUNC.params
            params=params.length?(','+params):''
            //var index = 0
            try{
            data = data.replace(/this\.([a-zA-Z0-9\_]+)\(/gm,name+'_$1(self,')
        }catch(e){}
            console.log(data)
            functions.push('function '+name+'_'+func+'(this'+params+'){\n'+data+'\n}\n')
        }
        console.log(functions)

        return `.code
        ${name} STRUCT
            ${fields.join('\n')}
        ${name} ENDS
        ${functions.join('\n')}`
    })
    //fs.writeFileSync('./cache/objected.js',source)
    console.log('OBJECTS',OBJECTS)
    source = source.replace(/var [a-zA-Z0-9]+ = new [a-zA-Z0-9]+\(\)/gm,match=>{
        var params = match.split(' ')
        var OBJ=OBJECTS[params[4].replace('()','')]
        console.log('params',params)
        OBJ.params.push(params[1])
        return `.data?\n    ${params[1]} label ${params[4].replace('()','')}`
    })
    for(const key of Object.keys(OBJECTS)){
        var OBJ = OBJECTS[key]
        for(const param of OBJ.params){
            //var FUNC = OBJ.funcs[func]
            source = source.replace(new RegExp(param+'\\.[a-zA-Z0-9\_]+\\(','gm'),match=>{
                var obj = match.split('.')[0]
                var func = match.split('.')[1].split('(')[0]
                return `${key}_${func}(${obj},`
            })
        }
    }
    r(/this/gm,'self')











    
    source = source.replace(/([a-zA-Z0-9\_]+\.[a-zA-Z0-9\_]+) = (.*)/gm,'mov rax, $2\nmov $1,rax')



  

    function replaceFunctionZ(regex,param){
        source = source.replace(regex,match=>{
            var name = /([a-zA-Z0-9\_]+)\(/gm.exec(match.replace('function Macro','Macro'))[1]
            MACROS.push(name)
            var params = param?/\(([\s\S]+?)\)/gm.exec(match)[1]:''
            var body = /\{([\s\S]+?)\}/gm.exec(match)[1]
            FUNCTIONS.push(name)
            var locals = []
            body=body.replace(/([a-zA-Z0-9\_]+)\ (dq|dd|db)/gm,mmm=>{
                var nm = mmm.split(' ')[0]
                locals.push(nm)
                return mmm
            })
            //console.log('LOCALS',locals)
            for(const local of locals){
                body=body.replace(new RegExp('('+local+')','gm'),name+'_$1')
            }

            if(['SystemInit','SystemDestroy','SystemRender'].includes(name)){
                return `.code
    ${name} proc ${params}
    ${body}
    ret
    ${name} endp`
            }
            return `.code
    ${name} macro ${params}
    ${body}
    endm`
        })
    }
    replaceFunctionZ(/function\ ([a-zA-Z0-9\_]+)\(\)(?<num>\:[0-9]+)\{([\s\S]+?)(\k<num>)\}/gm)
    replaceFunctionZ(/function\ ([a-zA-Z0-9\_]+)\(([\s\S]+?)\)(?<num>\:[0-9]+)\{([\s\S]+?)(\k<num>)\}/gm, true)
    replaceFunctionZ(/function\ ([a-zA-Z0-9\_]+)\(\)\{([\s\S]+?)\}/gm)
    replaceFunctionZ(/function\ ([a-zA-Z0-9\_]+)\(([\s\S]+?)\)\{([\s\S]+?)\}/gm, true)




    //source = source.replace(/([a-zA-Z0-9]+)\.([a-zA-Z]+)/gm,'$1_$2')

    source = source.replace(/var ([a-zA-Z0-9\_]+) \= new Array\(([0-9]+)\)/gm,match=>{
        match=match.replace('var','')
        var name = /([a-zA-Z0-9\_]+)/gm.exec(match)[1]
        var count = /\(([0-9]+)\)/gm.exec(match)[1]
        count = count.substring(1,count.length-1)
        ARRAYS[name] = count
        return `.data
${name} dq ?
.code
`
    })

    source = source.replace(/([a-zA-Z0-9\[\]]+) \= ([a-zA-Z0-9]+)\(([\s\S]+?)\)$/gm,match=>{
        var name = /([a-zA-Z0-9\[\]]+)/gm.exec(match)[1]
        var call = /([a-zA-Z0-9]+\([\s\S]+?\))$/gm.exec(match)[1]
        if(ignoreName(call.split('(')[0])){
            return match
        }
        return `${call}
mov qword ptr ${name}, rax
`
    })


    r(/var (.*) \= \?/gm,'.data?\n$1 dq ?')


    source = source.replace(/var ([a-zA-Z0-9\_]+) = \[?(\-?[0-9\.\,]+)\]?$/gm,match=>{
        match=match.replace('var','')
        var name = /([a-zA-Z0-9\_]+)/gm.exec(match)[1]
        var data = /\= (\-?[0-9\.\,]+)/gm.exec(match)[1]
        DATA.push(name)
        return `.data
${name} dq ${data}
.code`
    })

    source = source.replace(/var ([a-zA-Z0-9]+) = (\'[\s\S]+?\')/gm,match=>{
        match=match.replace('var','')
        var name = /([a-zA-Z0-9]+)/gm.exec(match)[1]
        var data = /(\'[\s\S]+?\')/gm.exec(match)[1]
        STR.push(name)
        return `.data
${name} db ${data},0
.code`
    })






    source = source.replace(/([a-zA-Z0-9\_]+?)\(\)/gm,match=>{
        var name = match.split('(')[0]
        if(ignoreName(name)){
            return `${name}()`
        }else if((name.indexOf('Macro_')>-1)){
            return `${name}`
        }else if(FUNCTIONS.includes(name)){
            return `${name}`
        }else{
            return `invoke ${name}`
        }
    })
    source = source.replace(/([a-zA-Z0-9\_\.]+?)\(([\s\S]+?)\)/gm,match=>{
        var name = /([\s\S]+?)\(/gm.exec(match)[1]
        var params = /\(([\s\S]+?)\)/gm.exec(match)[1]
        //params=params.substring(0,params.length-1)
        if(ignoreName(name)){
            return `${name}(${params})`
        }else if((name.indexOf('Macro_')>-1)){
            return `${name} ${params}`
        }else if(FUNCTIONS.includes(name)){
            return `${name} ${params}`
        }else{
            return `invoke ${name}, ${params}`
        }
    })



    source = source.replace(/(.*) \= (.*)/gm,match=>{
        var params = match.split('=').map(v=>v.trim())
        return `mov rax, ${params[1]}
mov ${params[0]}, rax`
    })


    source = source.replace(/return ([a-zA-Z0-9\_]+)\[([a-zA-Z\_]+)\]/gm,`mov rbx,$1
mov rcx,$2
mov rax,[rbx+rcx]
`)

    source = source.replace(/return/gm,'mov rax,')










    source = source.replace(/([a-zA-Z0-9\_]+)\[([a-zA-Z\_]+)\]/gm,match=>{
        var params1 = /([a-zA-Z0-9\_]+)/gm.exec(match)[1]
        var params2 = /([a-zA-Z\_]+)/gm.exec(match)[1]
        return `rbx,${params1}
        mov rcx,${params2}
mov [rcx+rbx]
`
    })


    //arrays
    source = source.replace(/([a-zA-Z0-9\_\.]+)\[([0-9]+)\]/gm,match=>{
        var param = match.split('[')[0]
        var index = match.split('[')[1].split(']')[0]
        return `qword ptr ${param} + ${index*8}`
    })

    source = source.replace(/\n, rax/gm,', rax')

    source = source.replace(/_asm/gm,'.asm')

    source = source.replace(/\\\+/gm,'+')

    source = source.replace(/\$([a-zA-Z0-9\.\_]+)/gm,'$1: ptr qword')
    source = source.replace(/\,$/gm,'')

    source = source.replace(/qword ptr self \+qword ptr [0-9]+ \+ [0-9]+/gm,match=>{
        var param = match.split('+')[1].replace('qword ptr','').trim()
        var elem = match.split('+')[2].trim()
        var val = parseInt(param)*8+parseInt(elem)*8
        return `qword ptr self + ${val}`
    })


    source = source.replace(/\:[0-9]+$/gm,'')

    source = source.replace(/\'/gm,'"')

    source = source.replace(/rcall\ Macro\_([a-zA-Z0-9\_]+)\,/gm,'Macro_$1')

    source = source.replace(/rcall Macro([a-zA-Z0-9\_]+)\,(.*)/gm,'Macro$1 $2')

    source = source.replace(/\&/gm,'addr ')

    r(/\:ptr\ qword/gm,'')
    
    //qword ptr self +qword ptr 1 + 0

    //, rax

    //mrm QWORD PTR [r10+24], a3

    //r(/mov rax, invoke/gm,'invoke')
    
    
    return source
}

var code = parseSource(sourceOrigin)


var entry_point = `    entry_point proc 

    start

    invoke ExitProcess, 0

    ret
    entry_point endp`
if(code.indexOf('window.asm')>-1){
    entry_point=''
}

var sourceToS = `include \\masm64\\include64\\masm64rt.inc
include \\masm64\\include64\\opengl32.inc
include \\masm64\\include64\\glu32.inc

include \\DangerJS\\include\\opengl.inc
include \\DangerJS\\include\\requires.inc

includelib \\masm64\\lib64\\opengl32.lib
includelib \\masm64\\lib64\\glu32.lib

include \\DangerJS\\include\\extern.inc

include \\DangerJS\\include\\math.asm

.data?

prm1 dq ?
prm2 dq ?
prm3 dq ?
prm4 dq ?

.code


`+code+`


    ${entry_point}



    end
`

fs.writeFileSync('./cache/'+fileName+'.asm', sourceToS)