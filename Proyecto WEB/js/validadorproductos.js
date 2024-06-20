$(document).ready(function () {
    $('#formulario-productos').validate({
        rules: {
            categoria: {
                required: true
            },
            id: {
                alphanumericUppercase: true,
                required: true
            },
            nombre: {
                alphanumeric: true,
                required: true
            },
            descripcion: {
                required: true
            },
            precio: {
                required: true,
                number: true,
                min: 0
            },
            descuentosuscriptor: {
                required: true,
                digits: true,
                range: [0, 100]  // Rango de 0 a 100
            },
            descuentooferta: {
                required: true,
                digits: true,
                range: [0, 100]  // Rango de 0 a 100
            }
        },
        messages: {
            categoria: {
                required: 'Por favor selecciona una categoría'
            },
            id: {
                alphanumericUppercase: 'Solo se permiten números y letras (convertidas a mayúsculas)',
                required: 'Por favor ingresa el ID'
            },
            nombre: {
                alphanumeric: 'Solo se permiten números y letras',
                required: 'Por favor ingresa el nombre del producto'
            },
            descripcion: {
                required: 'Por favor ingresa la descripción del producto'
            },
            precio: {
                required: 'Por favor ingresa el precio del producto',
                number: 'Ingresa un valor numérico válido',
                min: 'El precio no puede ser negativo'
            },
            descuentosuscriptor: {
                required: 'Por favor ingresa el descuento para suscriptores',
                digits: 'Ingresa solo números',
                range: 'El descuento debe estar entre 0 y 100'
            },
            descuentooferta: {
                required: 'Por favor ingresa el descuento por oferta',
                digits: 'Ingresa solo números',
                range: 'El descuento debe estar entre 0 y 100'
            }
        },
        errorPlacement: function (error, element) {
            if (element.attr('name') === 'categoria') {
                error.insertAfter(element.next('.btn-group'));
            } else {
                error.insertAfter(element);
            }
        }
    });

    // Reglas adicionales de validación personalizadas
    $.validator.addMethod('alphanumericUppercase', function (value, element) {
        return this.optional(element) || /^[0-9A-Z]+$/i.test(value);
    }, 'Solo se permiten números y letras (convertidas a mayúsculas)');

    $.validator.addMethod('alphanumeric', function (value, element) {
        return this.optional(element) || /^[0-9A-Za-z]+$/i.test(value);
    }, 'Solo se permiten números y letras');
});
