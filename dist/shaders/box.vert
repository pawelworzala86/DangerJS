#version 440 core

layout (location = 0) in vec3 position;
//layout (location = 1) in vec2 coord;

/*uniform dmat4 projection;
mat4 projection = mat4(projection);

uniform dmat4 camera;
mat4 camera = mat4(camera);

uniform dmat4 model;
mat4 model = mat4(model);*/

uniform dmat4 projection;
uniform dmat4 camera;
uniform dmat4 model;

//mat4 projection = mat4(1.3737387097273113,0.0,0.0,0.0,0.0,1.3737387097273113,0.0,0.0,0.0,0.0,-1.02020202020202,-1.0,0.0,0.0,-2.0202020202020203,0.0);
//mat4 camera = mat4(1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,-1.100090086,1.0);
//mat4 model = mat4(1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0);



out vec2 vCoord;


void main(){

    gl_Position = mat4(projection)*mat4(camera)*mat4(model)*vec4(vec3(position),1.0);

    vCoord = vec2(0.0);//coord;

}