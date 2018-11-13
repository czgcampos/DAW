$(()=>{

    $("#q1").click(e => {
        e.preventDefault()
        $.ajax({
            type: "GET",
            contentType: "application/json",
            url: "http://localhost:4009/obras/contar",
            success: resultado => $("#resultados").prepend('<li>Q1: <p>' + resultado + '</p></li>'),
            error: e => $("#resultados").prepend('<li>Q1: <p>' + JSON.stringify(e) + '</p></li>')
        })
    })

    $("#q2").click(e => {
        e.preventDefault()
        $.ajax({
            type: "GET",
            contentType: "application/json",
            url: "http://localhost:4009/obras",
            success: resultado => $("#resultados").prepend('<li>Q2: <p>' + JSON.stringify(resultado) + '</p></li>'),
            error: e => $("#resultados").prepend('<li>Q2: <p>' + JSON.stringify(e) + '</p></li>')
        })
    })

    $("#q3").change(e => {
        var oid = $("#q3").val()
        $("#q3").val('')
        e.preventDefault()
        $.ajax({
            type: "GET",
            contentType: "application/json",
            url: "http://localhost:4009/obras/" + oid,
            success: resultado => $("#resultados").prepend('<li>Q3: <p>' + JSON.stringify(resultado) + '</p></li>'),
            error: e => $("#resultados").prepend('<li>Q3: <p>' + JSON.stringify(e) + '</p></li>')
        })
    })
})