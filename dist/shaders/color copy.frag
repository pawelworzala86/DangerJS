#version 440 core


uniform sampler2D diffuseTexture;
uniform sampler2D normalTexture;


uniform int frame;


in vec2 vCoord;
in float depth;


in vec3 v_normal;
in vec3 v_tangent;
in vec3 v_surfaceToView;







float rand(vec2 co){
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}








vec3 u_lightDirection = vec3(0.0,2.0,2.0);

float shininess = 250.0;




out vec4 outColor;


void main(){

    vec3 diffuse = vec3(texture(diffuseTexture, vCoord).rgb);


    vec3 normal = normalize(v_normal);
    vec3 tangent = normalize(v_tangent);
    vec3 bitangent = normalize(cross(normal, tangent));
    
    mat3 tbn = mat3(tangent, bitangent, normal);
    normal = vec3(texture(normalTexture, vCoord).rgb * 2. - 1.);
    normal = normalize(tbn * normal);
    
    vec3 surfaceToViewDirection = normalize(v_surfaceToView);
    vec3 halfVector = normalize(u_lightDirection + surfaceToViewDirection);
    
    float fakeLight = dot(u_lightDirection, normal) * .5 + .5;
    float specularLight = clamp(dot(normal, halfVector), 0.0, 1.0);






    vec3 rand3 = vec3(length(vec3(rand(vec2(vCoord.xy)))));
    //rand3.g = 0.0;
    //rand3.b = 0.0;

    vec3 rand32 = vec3(length( 0.29*vec3(round(vCoord.x*100.0)/10.0,round(vCoord.y*100.0)/10.0,0.0)));

    /*vec3 rand323 = vec3(length( 0.04219*vec3(round(vCoord.x*100.0)/20.0,round(vCoord.y*100.0)/20.0,0.0)));
    vec3 rand3232 = vec3(length( 0.071714219*vec3(round(vCoord.x*250.0)/4.0,round(vCoord.y*250.0)/4.0,0.0))*length( 0.07314219*vec3(round(vCoord.x*250.0)/20.0,round(vCoord.y*250.0)/20.0,0.0)));
    //rand32.b = 0.0;

    vec3 pnoise1 = vec3(length( 0.4129*vec3(round(vCoord.x*float(frame)*15.0)/10.0,round(vCoord.y*float(frame)*15.0)/10.0,0.0)));

    vec3 diffuse1 = diffuse+0.1*rand3*diffuse;
    vec3 diffuse2 = diffuse+0.1*rand32*diffuse;

    vec3 color1 = vec3(0.1)+diffuse2*0.0517-pnoise1+diffuse1*0.9;*/

    outColor = vec4(
        vec3(-0.091*rand32) *
        - vec3(0.091*rand3) +
        0.31*diffuse +
        0.61*diffuse*fakeLight +
        0.1614*diffuse*pow(specularLight, shininess)
    , 1.0);

}