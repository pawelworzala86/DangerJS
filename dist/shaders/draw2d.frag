#version 440 core



uniform sampler2D diffuseTexture;






in vec2 vCoord;




float rand(vec2 co){
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}







out vec4 outColor;

void main(){

    vec3 diffuse = vec3(texture(diffuseTexture, vCoord).rgb);

    vec3 gray = vec3(length(diffuse));

    //outColor = vec4(0.2*gray+0.6*diffuse*diffuse+diffuse*0.4-((vec3(1.0)-diffuse)*0.06), 1.0);

    outColor = vec4(diffuse, 1.0);

}