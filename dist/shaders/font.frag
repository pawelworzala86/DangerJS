#version 440 core



uniform sampler2D diffuseTexture;


//uniform float fontWidth;
uniform int fontIndex;


in vec2 vCoord;




float rand(vec2 co){
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}







out vec4 outColor;

void main(){

    //int character = fontIndex;


    float distance = 1.0/16.0;
    float X = 0.0;
    float Y = 0.0;

    int index = 0;
    for(int y=1;y<=16;y++){
        for(int x=1;x<=16;x++){
            index+=1;
            if(index==fontIndex){
                X = float(x)*distance;
                Y = float(y)*distance;
            }
        }
    }


    vec2 coord = vCoord/16.0;

    //coord.x *= float(44.0)/64.0;

    coord += vec2(X,1.0025-Y);


    vec3 diffuse = texture(diffuseTexture, coord).rgb;


   // float alpha = 1.0;

    //if(diffuse.r>0.45){
    //    alpha = alpha*(1.0-diffuse.r);
    //}



    outColor = vec4(diffuse,1.0-0.958*length(diffuse));

}