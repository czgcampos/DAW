$(() => {
    $('#ficheiros').load('http://localhost:4008/fich')

    $('#adicionar').click(e=> {
        e.preventDefault()
        var filename = $('#fich').val().split('\\').pop();
        var url = '"/images/'+filename+'"'
        $('#ficheiros').append('<tr><td>'+ '<a href='+url+'>'+filename+'</a>'+'</td>'+'<td>'+$('#desc').val()+'</td></tr>')
        ajaxPost()
        formPost()
    })

    function ajaxPost() {
        $.ajax({
            type:"POST",
            contentType: "application/json",
            url: "http://localhost:4008/fich/guardar",
            data: JSON.stringify({ficheiro: $('#fich').val().split('\\').pop(),desc: $('#desc').val()}),
            success: p => alert('Dados gravados com sucesso! -> '+p),
            error: e => {
                alert('Erro no post: ' + JSON.stringify(e))
                console.log('ERRO: '+e)
            }
        })
    }

    function formPost() {
        var form_data = new FormData($('#myUploadForm')[0]);
        $.ajax({
            type:'POST',
            url:'http://localhost:4008/processa',
            processData: false,
            contentType: false,
            async: true,
            cache: false,
            data : form_data,
            timeout: 6000,
            success: p => alert('Ficheiro gravado com sucesso! -> '+p),
            error: e => {
                alert('Erro no post: ' + JSON.stringify(e))
                console.log('ERRO: '+e)
            }       
        })
        $('#desc').val('')
        $('#fich').val('')
    }
})