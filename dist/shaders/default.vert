#version 440 core

layout (location = 0) in vec3 position;
layout (location = 1) in vec3 normal;
layout (location = 2) in vec3 tangent;
layout (location = 3) in vec2 coord;



uniform dmat4 projection;
uniform dmat4 camera;
uniform dmat4 model;



vec3 cameraPosition = vec3(0.0,-2.310,-1.30);



//uniform vec3 u_viewWorldPosition;
vec3 u_viewWorldPosition = cameraPosition;



out vec2 vCoord;
out float depth;
out vec3 v_surfaceToView;
out vec3 v_normal;
out vec3 v_tangent;



void main(){

    vec4 worldPosition = mat4(model) * vec4(1.62*position,1.0);
    gl_Position = mat4(projection * camera) * worldPosition;
    //vec4 worldPosition = vec4(1.62*position,1.0);
    //gl_Position = worldPosition;

    v_surfaceToView = u_viewWorldPosition - worldPosition.xyz;


    mat3 normalMat = mat3(model);
    v_normal = normalize(normalMat * normal);
    v_tangent = normalize(normalMat * tangent);


    vec3 cameraPosition = vec3(0.0,0.5,-2.0);

    vec3 temp = vec3(1.0,1.0,1.0);
    depth = length(cameraPosition - position)/15.0;


    vCoord = vec2(coord.x, 1.0-coord.y);
    
}