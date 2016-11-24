$(document).ready(function() {
    out = (msg)=> {
        var div = $('<div>').text(msg)
        $('body').append(div)
    }


    function *gear(chars) {
        var pos = 0
        var len = chars.length-1
        while(true){
            yield chars[pos]
            if (pos===len){
                pos = 0
            } else {
                pos +=1
            }
        }
    }

    var abc = ['ABC','XYZ','123']


    var possibles = function(keys){
        var lengths = keys.map((v)=>{return v.length})
        return lengths.reduce((p,v)=>{return p*v})-1
    }

    var keyset = abc.map(function(chars){
        return gear(chars)
    })

    turn = function(){
        return keyset.reduce(
            function(prev,cur){
                return prev+cur.next().value
            },'')
    }


    for (var i=0; i<=possibles(abc); i++){
        out(turn())
    }

});
