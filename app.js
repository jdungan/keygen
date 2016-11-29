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

    SHA1_chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

    SHA1_array = Array.from({length:40}).fill(SHA1_chars)


    $('input#Go').click(function(e){
        var start_num = $('input#start').val()
        combinations = keyset(SHA1_array)

        var i = 1
        for (var combo of combinations){
            if (i>=start_num){
                out(combo)
            }
            if (i>start_num+10){
                break
            }
            i+=1
        }
    })

});
