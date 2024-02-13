
    //::app:cmd
    /*
    ::config={
        proc: true,
        bbs: true,
        pointers: true,
    }
    */

    import 'utils/utils.js'
    import 'utils/math.js'


    //::EXP

.data?
    var oout
.data
    var zeroptr11 = 0.0
    var zeroneptr11 = 1.0



export function mat4_create() {
    mov oout, alloc(16*8)
    //mov oout, rax
    /*oout[0] = zeroneptr11
    oout[1] = zeroptr11
    oout[2] = zeroptr11
    oout[3] = zeroptr11
    oout[4] = zeroptr11
    oout[5] = zeroneptr11
    oout[6] = zeroptr11
    oout[7] = zeroptr11
    oout[8] = zeroptr11
    oout[9] = zeroptr11
    oout[10] = zeroneptr11
    oout[11] = zeroptr11
    oout[12] = zeroptr11
    oout[13] = zeroptr11
    oout[14] = zeroptr11
    oout[15] = zeroneptr11*/
    //oout[16] = zeroneptr11
    return oout
  }

  export function mat4_identity(out) {
    out[0] = zeroneptr11
    out[1] = zeroptr11
    out[2] = zeroptr11
    out[3] = zeroptr11
    out[4] = zeroptr11
    out[5] = zeroneptr11
    out[6] = zeroptr11
    out[7] = zeroptr11
    out[8] = zeroptr11
    out[9] = zeroptr11
    out[10] = zeroneptr11
    out[11] = zeroptr11
    out[12] = zeroptr11
    out[13] = zeroptr11
    out[14] = zeroptr11
    out[15] = zeroneptr11
    return out;
  }


  export function mat4_translate(out, a, v) {
    let x = v[0]
    let y = v[1]
    let z = v[2]

    let a00
    let a01
    let a02
    let a03
    let a10
    let a11
    let a12
    let a13
    let a20
    let a21
    let a22
    let a23
  
      a00 = a[0];
      a01 = a[1];
      a02 = a[2];
      a03 = a[3];
      a10 = a[4];
      a11 = a[5];
      a12 = a[6];
      a13 = a[7];
      a20 = a[8];
      a21 = a[9];
      a22 = a[10];
      a23 = a[11];
  
      out[0] = a00;
      out[1] = a01;
      out[2] = a02;
      out[3] = a03;
      out[4] = a10;
      out[5] = a11;
      out[6] = a12;
      out[7] = a13;
      out[8] = a20;
      out[9] = a21;
      out[10] = a22;
      out[11] = a23;
  
      out[12] = a00 * x + a10 * y + a20 * z + a[12];
      out[13] = a01 * x + a11 * y + a21 * z + a[13];
      out[14] = a02 * x + a12 * y + a22 * z + a[14];
      out[15] = a03 * x + a13 * y + a23 * z + a[15];

    return out
  }


  export function mat4_scale(out, a, v) {
    //let x = v[0]
    //let y = v[1]
    //let z = v[2]

    //printf('z %f %s', qword ptr z, EOL)
  
    out[0] = a[0] * v[0]
    out[1] = a[1] * v[0]
    out[2] = a[2] * v[0]
    out[3] = a[3] * v[0]
    out[4] = a[4] * v[1]
    out[5] = a[5] * v[1]
    out[6] = a[6] * v[1]
    out[7] = a[7] * v[1]
    out[8] = a[8] * v[2]
    out[9] = a[9] * v[2]
    out[10] = a[10] * v[2]
    out[11] = a[11] * v[2]
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
  }



  export function mat4_rotate(out, a, rad, axis) {
    let x = axis[0]
    let y = axis[1]
    let z = axis[2]
    let len11
    let sqr11
    sqr11 = x * x + y * y + z * z
    Math.sqrt(sqr11,len11)
    let s
    let c
    let t
    let a00
    let a01
    let a02
    let a03
    let a10
    let a11
    let a12
    let a13
    let a20
    let a21
    let a22
    let a23
    let b00
    let b01
    let b02
    let b10
    let b11
    let b12
    let b20
    let b21
    let b22
  
    //if (len < glMatrix.EPSILON) {
    //  return null;
    //}
    
  var nnonepttr222 = 1.0

    len11 = nnonepttr222 / len11;
    x = x * len11
    y = y * len11
    z = z * len11
  
    Math.sin(rad,s);
    Math.cos(rad,c);
    t = nnonepttr222 - c;
  
    a00 = a[0];
    a01 = a[1];
    a02 = a[2];
    a03 = a[3];
    a10 = a[4];
    a11 = a[5];
    a12 = a[6];
    a13 = a[7];
    a20 = a[8];
    a21 = a[9];
    a22 = a[10];
    a23 = a[11];
  
    // Construct the elements of the rotation matrix
    b00 = x * x * t + c;
    b01 = y * x * t + z * s;
    b02 = z * x * t - y * s;
    b10 = x * y * t - z * s;
    b11 = y * y * t + c;
    b12 = z * y * t + x * s;
    b20 = x * z * t + y * s;
    b21 = y * z * t - x * s;
    b22 = z * z * t + c;
  
    // Perform rotation-specific matrix multiplication
    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
    out[11] = a03 * b20 + a13 * b21 + a23 * b22;
  
    //if (a !== out) {
      // If the source and destination differ, copy the unchanged last row
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
    //}
    return out;
  }


/**
 * Rotates a matrix by the given angle around the X axis
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
export function mat4_rotateX(out, a, rad) {
  let s
  Math.sin(rad,s);
  let c
  Math.cos(rad,c);
  let a10 = a[4];
  let a11 = a[5];
  let a12 = a[6];
  let a13 = a[7];
  let a20 = a[8];
  let a21 = a[9];
  let a22 = a[10];
  let a23 = a[11];

  //if (a !== out) {
    // If the source and destination differ, copy the unchanged rows
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
 // }

  // Perform axis-specific matrix multiplication
  out[4] = a10 * c + a20 * s;
  out[5] = a11 * c + a21 * s;
  out[6] = a12 * c + a22 * s;
  out[7] = a13 * c + a23 * s;
  out[8] = a20 * c - a10 * s;
  out[9] = a21 * c - a11 * s;
  out[10] = a22 * c - a12 * s;
  out[11] = a23 * c - a13 * s;
  return out;
}

/**
 * Rotates a matrix by the given angle around the Y axis
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
export function mat4_rotateY(out, a, rad) {
  let s
  Math.sin(rad,s);
  let c
  Math.cos(rad,c);
  let a00 = a[0];
  let a01 = a[1];
  let a02 = a[2];
  let a03 = a[3];
  let a20 = a[8];
  let a21 = a[9];
  let a22 = a[10];
  let a23 = a[11];

  //if (a !== out) {
    // If the source and destination differ, copy the unchanged rows
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  //}

  // Perform axis-specific matrix multiplication
  out[0] = a00 * c - a20 * s;
  out[1] = a01 * c - a21 * s;
  out[2] = a02 * c - a22 * s;
  out[3] = a03 * c - a23 * s;
  out[8] = a00 * s + a20 * c;
  out[9] = a01 * s + a21 * c;
  out[10] = a02 * s + a22 * c;
  out[11] = a03 * s + a23 * c;
  return out;
}

/**
 * Rotates a matrix by the given angle around the Z axis
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
export function mat4_rotateZ(out, a, rad) {
  let s
  Math.sin(rad,s);
  let c
  Math.cos(rad,c);
  let a00 = a[0];
  let a01 = a[1];
  let a02 = a[2];
  let a03 = a[3];
  let a10 = a[4];
  let a11 = a[5];
  let a12 = a[6];
  let a13 = a[7];

  //if (a !== out) {
    // If the source and destination differ, copy the unchanged last row
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  //}

  // Perform axis-specific matrix multiplication
  out[0] = a00 * c + a10 * s;
  out[1] = a01 * c + a11 * s;
  out[2] = a02 * c + a12 * s;
  out[3] = a03 * c + a13 * s;
  out[4] = a10 * c - a00 * s;
  out[5] = a11 * c - a01 * s;
  out[6] = a12 * c - a02 * s;
  out[7] = a13 * c - a03 * s;
  return out;
}


var onyptr1 = 1.0
var twoonyptr1 = 2.0
var mintwoonyptr1 = \\-2\\.0
var mnsonyptr1 = \\-1\\.0
var zzeroo = 0.0



export function mat4_perspectiveNO(out, vfovy, vaspect, vnear, vfar) {




  var ff2
  var ff5
 Math.podziel(vfovy,twoonyptr1,ff5)
  //printf('twoonyptr1 %f %s',twoonyptr1, EOL)
  Math.tan(ff5, ff2);
  //printf('ff2 %f %s',ff2, EOL)
  var f
  f = onyptr1 / ff2
  out[0] = f / vaspect;
  out[1] = zzeroo
  out[2] = zzeroo
  out[3] = zzeroo
  out[4] = zzeroo
  out[5] = f;
  out[6] = zzeroo
  out[7] = zzeroo
  out[8] = zzeroo
  out[9] = zzeroo
  out[11] = mnsonyptr1
  out[12] = zzeroo
  out[13] = zzeroo
  out[15] = zzeroo
  //if (far != null && far !== Infinity) {
    var vnff2
    vnff2 = vnear - vfar
    var nf
    nf = onyptr1 / vnff2;
    var ffnn343
    ffnn343 = vfar + vnear
    out[10] = ffnn343 * nf;
    out[14] = twoonyptr1 * vfar * vnear * nf;
  //} else {
    /*out[10] = mnsonyptr1
    var out14
    Math.pomnoz(mintwoonyptr1,vnear,out14)
    out[14] = out14*/
  //}
  out[11] = minOnPt1
  //out[14] = minusTwo123
  return out;
}

.data
let zeroop11 = 0.0
let mino11ne11 = -1.0
let plnone11 = 1.0
//var minusTwo123 = \\-2\\.020202020
var minOnPt1 = -1.0

export function mat4_lookAt(out, eye, center, up){
  let x0
  let x1
  let x2
  let y0
  let y1
  let y2
  let z0
  let z1
  let z2
  let len21
  let eyex = eye[0];
  let eyey = eye[1];
  let eyez = eye[2];
  let upx = up[0];
  let upy = up[1];
  let upz = up[2];
  let centerx = center[0];
  let centery = center[1];
  let centerz = center[2];
  //printf('look begins %s', EOL)
  /*if (
    Math.abs(eyex - centerx) < glMatrix.EPSILON &&
    Math.abs(eyey - centery) < glMatrix.EPSILON &&
    Math.abs(eyez - centerz) < glMatrix.EPSILON
  ) {
    return identity(out);
  }*/

  z0 = eyex - centerx;
  z1 = eyey - centery;
  z2 = eyez - centerz;

  let rr1
  let rr2
  rr2 = z0 * z0 + z1 * z1 + z2 * z2
  Math.sqrt(rr2, rr1)
  len21 = plnone11 / rr1;
  z0 *= len21;
  z1 *= len21;
  z2 *= len21;

  x0 = upy * z2 - upz * z1;
  x1 = upz * z0 - upx * z2;
  x2 = upx * z1 - upy * z0;
  rr2 = x0 * x0 + x1 * x1 + x2 * x2
  Math.sqrt(rr2,len21);
  
  //printf('look calc1 %s', EOL)
  /*if (!len21) {
    x0 = 0;
    x1 = 0;
    x2 = 0;
  } else {*/
    len21 = plnone11 / len21;
    x0 = x0 * len21;
    x1 = x1 * len21;
    x2 = x2 * len21;
  //}
  //printf('look calc22 %s', EOL)
  y0 = z1 * x2 - z2 * x1;
  y1 = z2 * x0 - z0 * x2;
  y2 = z0 * x1 - z1 * x0;
  //printf('look calc2 %s', EOL)
  let ssqq11
  ssqq11 = y0 * y0 + y1 * y1 + y2 * y2
  Math.sqrt(ssqq11, len21);
  /*if (!len21) {
    y0 = 0;
    y1 = 0;
    y2 = 0;
  } else {*/
    len21 = plnone11 / len21;
    x0 = x0 * len21;
    x1 = x1 * len21;
    x2 = x2 * len21;
  //}
  //printf('look calc3 %s', EOL)

  out[0] = x0;
  out[1] = y0;
  out[2] = z0;
  out[3] = zeroop11
  out[4] = x1;
  out[5] = y1;
  out[6] = z1;
  out[7] = zeroop11
  out[8] = x2;
  out[9] = y2;
  out[10] = z2;
  out[11] = zeroop11
  let tt1
  tt1 = x0 * eyex + x1 * eyey + x2 * eyez
  out[12] = mino11ne11 * tt1
  let tt2
  tt2 = y0 * eyex + y1 * eyey + y2 * eyez
  out[13] = mino11ne11 * tt2
  let tt3
  tt3 = z0 * eyex + z1 * eyey + z2 * eyez
  out[14] = mino11ne11 * tt3
  out[15] = plnone11

  return out;
}







    
    function Main(){
        printf('started %s', EOL)

        matrix1 = mat4.create()
        //printf('create %s', EOL)
        mat4.identity(matrix1)
        //printf('%s', EOL)
        PrintMatrix('mat4.create',matrix1)

        mat4.identity(matrix1)
        matrix2 = mat4.create()
        mat4.identity(matrix2)
        PrintMatrix('mat4.identity',matrix2)

        //matrix2 = mat4.create()
        //mat4.identity(matrix2)
        //setVec3(tarnslate1,zarotwoptr,zeroeightptr,qword ptr minussixptr)
        mat4.translate(matrix1,matrix2,tarnslate1)
        PrintMatrix('mat4.translate',matrix1)

        //matrix1 = mat4.create()
        //matrix2 = mat4.create()
        mat4.identity(matrix1)
        mat4.identity(matrix2)
        //setVec3(scale2,zeroeightptr,zeroeightptr,zeroeightptr)
        mat4.scale(matrix1,matrix2,scale1)
        PrintMatrix('mat4.scale',matrix1)

        mat4.rotate(matrix2,matrix1,rad1112,axisY)
        PrintMatrix('mat4.rotate',matrix2)

        mat4.rotateY(matrix1,matrix2,angleY22)
        PrintMatrix('mat4.rotateY',matrix1)

        mat4.rotateX(matrix2,matrix1,angleY22)
        PrintMatrix('mat4.rotateX',matrix2)


        projection = mat4.create()
        mat4.identity(projection)
        var fovy33 = 45.0
        Math.Deg2Rad(fovy33,radCC111)
        mat4.perspectiveNO(projection, fovy33, aspect11, near11, far11)
        PrintMatrix('mat4.perspectiveNO',projection)


        camera11 = mat4.create()
        mat4.identity(camera11)
        mat4.lookAt(camera11,eye22,center22,up22)
        PrintMatrix('mat4.lookAt',camera11)


        
    
        printf('end %s', EOL)



    }


.data?
    var matrix1
    var matrix2
    var projection
    var camera11

.data
    var fovy11 = 45.0
    var aspect11 = 1.0
    var near11 = 0.1
    var far11 = 100.0


    var tarnslate1 = [0.2,0.8,-6.0]
    var scale1 = [7.2,0.8,1.4]

    //var scale2

    var axisY = [0.0,1.0,0.0]
    var rad1112 = 34.44

    var angleY22 = 34.66
    var radCC111 = 0.0

    var eye22 = [0.50,1.0,-8.0]
    var center22 = [0.10,1.10,-2.0]
    var up22 = [0.0,1.0,0.0]



    function setVec3(oout,x,y,z){
      mov oout, alloc(3*8)
      mov rbx,oout
      mov rcx,rbx
      add rbx,8
      mov rax,x
      mov rbx,rax
      add rbx,8
      mov rax,y
      mov rbx,rax
      add rbx,8
      mov rax,z
      //mov oout,rcx
    }


