$(document).ready(function(){

    $.get('http://fakestoreapi.com/products', function(data){

        // Variable para almacenar la altura máxima encontrada
        var maxHeight = 0;

        $.each(data, function(i, item){
            // Acortar la descripción si es necesario
            var truncatedDescription = item.description.length > 100 ? item.description.substring(0, 200) + "..." : item.description;

            // Crear una tarjeta para el producto con la descripción truncada
            var html = `
                <div class="col-sm12 col-md-6 col-lg-4 col-xl-2">
                    <div class="card" style="width: 15rem;">
                        <img src="${item.image}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${item.title}</h5>
                            <h6 class="card-title">${item.category}</h6>
                            <p class="card-text">${truncatedDescription}</p>
                            <a href="#" class="btn btn-warning">¡Lo quiero!</a>
                        </div>
                    </div>
                </div>
            `;

            // Agregar la tarjeta al contenedor
            $('#cuadro-ropa').append(html);

            // Obtener la altura de la tarjeta recién agregada
            var cardHeight = $('.card').last().outerHeight();

            // Actualizar la altura máxima
            if (cardHeight > maxHeight) {
                maxHeight = cardHeight;
            }
        });

        // Establecer la altura máxima en todas las tarjetas
        $('.card').css('height', maxHeight + 'px');

    });

});
