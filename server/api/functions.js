module.exports= {
    getUserFunction: function(req,res,next){
        return this["testFun"];
    },
    testFun: function(){
        console.log()
    }
}