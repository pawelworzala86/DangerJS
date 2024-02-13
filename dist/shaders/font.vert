#version 440 core

layout (location = 0) in vec3 position;
layout (location = 1) in vec2 coord;

uniform dmat4 projection;
uniform dmat4 camera;
uniform dmat4 model;

//uniform float fontWidth;

out vec2 vCoord;


void main(){

    //vec3 pos = vec3(position);

    //if(pos.x>0.0){
        //pos.x *= float(44.0)/64.0;
    //}

    gl_Position = mat4(projection*camera*model)*vec4(vec3(position),1.0);



    vCoord = coord;

}