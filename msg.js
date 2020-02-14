const fs=require('fs');
const path=require('path');
const FILE='data.json';
const pathFile=path.join(__dirname,FILE);


// -------------------------获取数据
const getmsg=function(){
    let rs=fs.readFileSync(pathFile,'utf-8');
    let arr=JSON.parse(rs)
   return arr; 
}
// -----------------------------添加数据
const addmsg=function(name,content){
    let arr=getmsg();
    var id=1;
    if(arr.length){
        id=arr[arr.length-1].id+1;
    }

    let obj={
        id,
        name,
        content,
        dt:Date.now()
    }
    arr.push(obj);
    fs.writeFileSync(pathFile,JSON.stringify(arr));
    return arr;
}
// ------------------------------删除数据
const delmsg=function(id){
    let arr=getmsg();
    let idx=arr.findIndex(function(item){
        return item.id==id;
    })
    arr.splice(idx,1);
    fs.writeFileSync(pathFile,JSON.stringify(arr));
    return arr;
}
module.exports={
    getmsg,
    addmsg,
    delmsg
}