$(document).ready(function() {
    out = (msg)=> {
        var div = $('<div>').text(msg)
        $('body').append(div)
    }

    function *gear(chars, cnt) {
        while (true) {
            for (var chr of chars){
                for (var i=0;i<cnt;i++){
                    yield chr
                }
            }
        }
    }

    function *keyset(keys){
        var n = keys.reduce((p, v)=>{return p * v.length}, 1)
        var next = (prev, cur)=>{return prev + cur.next().value}

        sets  = keys.map(function(chars, idx){
            var repeat = (n / Math.pow(chars.length, idx + 1))
            return gear(chars, repeat)
        })

        for (var i=0; i<n; i++){
            yield sets.reduce(next,'')
        }
    }

    combinations = keyset(['ABCD','ABCD','ABCD','ABCD'])

    for (var combo of combinations){
        out(combo)
    }

});
