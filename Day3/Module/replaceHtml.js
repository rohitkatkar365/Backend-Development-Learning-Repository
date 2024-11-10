module.exports = function(template,cur){
    let op = template.replace("{{%IMAGE%}}", cur.productImage);
  op = op.replace("{{%NAME%}}", cur.name);
  op = op.replace("{{%MODELNAME%}}", cur.modelName);
  op = op.replace("{{%MODELNO%}}", cur.modelNumber);
  op = op.replace("{{%SIZE%}}", cur.size);
  op = op.replace("{{%CAMERA%}}", cur.camera);
  op = op.replace("{{%PRICE%}}", cur.price);
  op = op.replace("{{%COLOR%}}", cur.color);
  op = op.replace("{{%DESC%}}", cur.Description);
  op = op.replace("{{%ROM%}}", cur.ROM);
  op = op.replace("{{%ID%}}", cur.id);
  return op;
}