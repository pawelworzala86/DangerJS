fs = require('fs')
//sharp = require('sharp')
//sizeOf = require('image-size')

function degToRad(deg) {
    return deg * Math.PI / 180;
}

function glTypedArray(val){
    return {
        '5120': Int8Array,
        '5121': Uint8Array,
        '5122': Int16Array,
        '5123': Uint16Array,
        '5124': Int32Array,
        '5125': Uint32Array,
        '5126': Float32Array
    }[val]
}

function NumSize(val){
    return {
        'SCALAR': 1,
        'VEC2': 2,
        'VEC3': 3,
        'VEC4': 4,
        'MAT2': 4,
        'MAT3': 9,
        'MAT4': 16
    }[val]
}


function loadGLTF(path,gl,shader){

    //this.source.rotation[0]=degToRad(45)

   // const {gl,engine} = this

    //let shader = await new Shader(engine,"default")
    //await shader.load("default")

    //var shader = this.shader??await new Shader(engine,"default")

    const gltf = JSON.parse(fs.readFileSync(path).toString())

    path=path.replace(path.split('/').pop(),'')

    //console.log(gltf)

    for(const key of Object.keys(gltf['buffers'])){
        const url=path+'/'+gltf['buffers'][key]['uri']
        gltf.buffers[key]=fs.readFileSync(url).buffer
    }

    console.log(gltf.buffers)

    gltf['data']=gltf['accessors'].map(accessor=>{
        const bufferView=gltf['bufferViews'][accessor['bufferView']]
        const TypedArray = glTypedArray(accessor['componentType'])
        return new TypedArray(
            gltf.buffers[bufferView['buffer']],
            bufferView['byteOffset'],//+ (accessor.byteOffset || 0),
            accessor['count']* NumSize(accessor['type']))
    })

    if(gltf['images']){
        gltf.images=gltf.images.map(image=>{
            return image['uri']
        })
    }

    if(gltf['textures']){
        gltf.textures=gltf.textures.map(texture=>{
            return gltf.images[texture['source']]
        })
    }

    if(gltf.materials){
        gltf['materials']=gltf.materials.map(material=>{
            const returnMaterial={}
            if(material['pbrMetallicRoughness']){
                const mat = material['pbrMetallicRoughness']
                if(mat['baseColorFactor']){
                    returnMaterial.diffuse = mat['baseColorFactor']
                }
                if(mat['baseColorTexture']){
                    returnMaterial.diffuseTexture = gltf.textures[mat.baseColorTexture['index']]
                }
            }
            if(material.normalTexture){
                returnMaterial.normalTexture = gltf.textures[material['normalTexture']['index']]
            }
            if(material.emissiveTexture){
                returnMaterial.emissiveTexture = gltf.textures[material['emissiveTexture']['index']]
            }
            return returnMaterial
        })
    }

    gltf['__meshes'] = gltf['meshes']

    gltf['meshes']=gltf.meshes.map(mesh=>{
        let buff={geometry:{}}
        const set=(name,param)=>{
            let geom=gltf['data'][mesh['primitives'][0]['attributes'][param]]
            if(geom){
                buff.geometry[name]=geom
            }
        }
        set('tangents','TANGENT')
        set('coords','TEXCOORD_0')
        set('positions','POSITION')
        set('normals','NORMAL')
        buff.geometry['indices']=gltf['data'][mesh['primitives'][0]['indices']]
        //const material = gltf.materials[mesh.primitives[0]['material']]

        if(gltf.materials){
            buff.material = gltf.materials[mesh.primitives[0]['material']]
        }
        return buff
    })

    const skinNodes = []
    const nodes=[]
    for(const node of gltf.nodes){
        //let scene
        if(typeof node['mesh']!='undefined'){
            const mesh=gltf['meshes'][node.mesh]
            
            var scene = {}
            //await scene.load(mesh.geometry)
            scene.uniforms=mesh.material

            if(node.skin!==undefined) {
                skinNodes.push({node, mesh: scene, skinNdx: node.skin})
            }
        }else{
            var scene={}
        }
        //scene.matrix = node.matrix
        Object.assign(scene,node)
        nodes.push(scene)
    }
    gltf._nodes = gltf.nodes
    gltf.nodes = nodes

    if(gltf.skins){
        gltf.skinsA = gltf.skins.map((skin) => {
            //const joints = skin.joints.map(ndx => gltf.nodes[ndx])
            //const {stride, array} = getAccessorTypedArrayAndStride(gl, gltf, skin.inverseBindMatrices)
            //const bufferView=gltf['bufferViews'][skin.inverseBindMatrices]
            return gltf['data'][skin.inverseBindMatrices]
        })
    }

    for (const {node, mesh, skinNdx} of skinNodes) {
        //var scene = mesh//new Mesh(gl,shader)
        //mesh.setSkin(gltf.skins[node.skin].joints, gltf.skinsA[skinNdx])
        //node.drawables.push(new SkinRenderer(mesh, gltf.skins[skinNdx]))
    }


    function childrens(node){

        node.children = (node.children??[]).map(index=>{
            node = gltf.nodes[index]
            childrens(node)
            return node
        })

    }
    gltf.children = []
    gltf._scenes=[]
    gltf.scenes.map(scene=>{
        scene.nodes.map(node=>{
            var root = gltf.nodes[node]
            //gltf.children.push(root)
            childrens(root)
            gltf._scenes.push(root)
        })
    })

    //gltf.children = []
    //childrens(gltf.childrens[])
    //gltf.scenes[0].nodes.map(idx=>gltf.childrens.push(...childrens(gltf.nodes[idx])))

    //console.log('gltf...',gltf)
    //console.log(gltf.nodes)
    //console.log(gltf.scenes)
    //console.log(gltf.children)

    return gltf
}

function addChildren(nodes, node, childIndices) {
    childIndices.forEach((childNdx) => {
        const child = nodes[childNdx];
        //child.setParent(node);
        if(node&&node.parent){
            if(node.parent.indexOf(child)>-1){
                node.parent.children.splice(this.parent.indexOf(child),1)
            }
            node.parent = null
        }
        if (child) {
            child.childrens.push(child)
            child.parent = node
        }
    })
  }

  var data = []

  function addFloat64(arr){
    var array64 = new Float64Array(arr)
    var array8 = new Uint8Array(array64.buffer)
    data.push(...array8)
}
function addInt64(arr){
    var array64 = new BigInt64Array(arr)
    var array8 = new Uint8Array(array64.buffer)
    data.push(...array8)
}

  var gltf

async function loadModel(path, modelName, destiny, nsize=undefined){



    gltf = loadGLTF('./dist/box.gltf')


    for(const mesh of gltf.meshes){

        //coords,positions,indices

        console.log(mesh.geometry.positions)

        addInt64([BigInt(mesh.geometry.indices.length)])

        addInt64([BigInt(mesh.geometry.positions.length*8)])
        addFloat64([...mesh.geometry.positions])
        addInt64([BigInt(mesh.geometry.coords.length*8)])
        addFloat64([...mesh.geometry.coords])
        addInt64([BigInt(mesh.geometry.indices.length*8)])
        addInt64([...mesh.geometry.indices].map(BigInt))

    }

    var array8 = new Uint8Array(data)
    fs.writeFileSync('./dist/box.bina',array8)

}

loadModel()