
var matrixOut = ?
//var matrixA = ?

var oneNumberFloat = 1.0
var zeroNumberFloat = 0.0

function mat4Create(){
    mov matrixOut, alloc(16*8)
    return matrixOut
}

function Macro_mat4Create(out){
  mov out, alloc(16*8)
  return out
}

function Macro_mat4_identity(out){
    out[0] = oneNumberFloat
    out[1] = zeroNumberFloat
    out[2] = zeroNumberFloat
    out[3] = zeroNumberFloat
    out[4] = zeroNumberFloat
    out[5] = oneNumberFloat
    out[6] = zeroNumberFloat
    out[7] = zeroNumberFloat
    out[8] = zeroNumberFloat
    out[9] = zeroNumberFloat
    out[10] = oneNumberFloat
    out[11] = zeroNumberFloat
    out[12] = zeroNumberFloat
    out[13] = zeroNumberFloat
    out[14] = zeroNumberFloat
    out[15] = oneNumberFloat
    return qword ptr out;
}

var a00 = 0.0
var a01 = 0.0
var a02 = 0.0
var a03 = 0.0
var a10 = 0.0
var a11 = 0.0
var a12 = 0.0
var a13 = 0.0
var a20 = 0.0
var a21 = 0.0
var a22 = 0.0
var a23 = 0.0
var x = 0.0
var y = 0.0
var z = 0.0

function Macro_mat4_translate(out, a, v){
    x = v[0]
    y = v[1]
    z = v[2]

    printf('%f %s', x, lf)
    printf('%f %s', y, lf)
    printf('%f %s', z, lf)
  
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

    return qword ptr out
  }

  var ff2 = 0.0
  var ff5 = 0.0
  var f = 0.0
  var vnff2 = 0.0
  var nf = 0.0
  var ffnn343 = 0.0

  var onyptr1 = 1.0
    var twoonyptr1 = 2.0
    var mintwoonyptr1 = -2.0
    var mnsonyptr1 = -1.0
    var zzeroo = 0.0
    var minOnPt1 = -1.0

  function Macro_mat4_perspectiveNO(out, vfovy, vaspect, vnear, vfar){




    
    Macro_Math_podziel(vfovy,twoonyptr1,ff5)
    printf('ff5 %f %s',twoonyptr1, lf)
    Macro_Math_tan(ff5, ff2);
    //printf('ff2 %f %s',ff2, EOL)
    
    f = onyptr1 / ff2
    out[0] = f / vaspect;
    out[1] = zeroNumberFloat
    out[2] = zeroNumberFloat
    out[3] = zeroNumberFloat
    out[4] = zeroNumberFloat
    out[5] = f;
    out[6] = zeroNumberFloat
    out[7] = zeroNumberFloat
    out[8] = zeroNumberFloat
    out[9] = zeroNumberFloat
    out[11] = mnsonyptr1
    out[12] = zeroNumberFloat
    out[13] = zeroNumberFloat
    out[15] = zeroNumberFloat
    //if (far != null && far !== Infinity) {
      
      vnff2 = vnear - vfar
      
      nf = onyptr1 / vnff2;
      
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
    return qword ptr out;
  }











function Macro_PrintMat(name,matrix){
    printf('%s %s', name, lf)

    printf('%f ', matrix[0])
    printf('%f ', matrix[1])
    printf('%f ', matrix[2])
    printf('%f ', matrix[3])
    printf('%s', lf)

    printf('%f ', matrix[4])
    printf('%f ', matrix[5])
    printf('%f ', matrix[6])
    printf('%f ', matrix[7])
    printf('%s', lf)

    printf('%f ', matrix[8])
    printf('%f ', matrix[9])
    printf('%f ', matrix[10])
    printf('%f ', matrix[11])
    printf('%s', lf)

    printf('%f ', matrix[12])
    printf('%f ', matrix[13])
    printf('%f ', matrix[14])
    printf('%f ', matrix[15])
    printf('%s', lf)
}




