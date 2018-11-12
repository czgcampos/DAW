$(()=>{
    $('#paras').load('http://localhost:4008/para')

    $('#adicionar').click(e => {
        e.preventDefault()
        $('#paras').append('<li>' + $('#texto').val() + '</li>')
        ajaxPost()
    })

    function ajaxPost(){
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "http://localhost:4008/para/guardar",
            data: JSON.stringify({para: $('#texto').val()}),
            dataType: 'json',
            success: p => alert(JSON.stringify(p)),
            error: e => {
                alert('Erro no post: ' + e)
                console.log("Erro no post: " + e)
            }
        })
        $('#texto').val('')
    }
})