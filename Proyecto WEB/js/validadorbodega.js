$(document).ready(function () {
    $('#bodegaForm').validate({
        rules: {
            categoriaSelect: {
                required: true
            },
            nombreInput: {
                required: true,
                alphanumeric: true
            },
            cantidadInput: {
                required: true,
                digits: true,
                min: 1
            }
        },
        messages: {
            categoriaSelect: {
                required: 'Por favor selecciona una categoría.'
            },
            nombreInput: {
                required: 'Por favor ingresa el nombre del producto.',
                alphanumeric: 'Solo se permiten números y letras.'
            },
            cantidadInput: {
                required: 'Por favor ingresa la cantidad.',
                digits: 'Ingresa solo números.',
                number: 'Ingresa un valor numérico válido',
                min: 'La cantidad mínima es 1.'
            }
        },
        errorPlacement: function (error, element) {
            if (element.attr('id') === 'categoriaSelect') {
                error.insertAfter(element.next('.btn-group'));
            } else {
                error.insertAfter(element);
            }
        }
    });

    // Regla adicional de validación personalizada para letras y números
    $.validator.addMethod('alphanumeric', function (value, element) {
        return this.optional(element) || /^[0-9A-Za-z]+$/i.test(value);
    }, 'Solo se permiten números y letras.');
});
