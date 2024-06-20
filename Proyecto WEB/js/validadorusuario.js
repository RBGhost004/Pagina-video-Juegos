$(document).ready(function() {
    // Agregar método de validación para RUT chileno
  $.validator.addMethod("rutChileno", function(value, element) {

    // Validar que el RUT tenga el formato correcto (8 o 9 dígitos + guión + dígito verificador)
    var rutPattern = /^\d{7,8}-[\dK]$/;
    if (!rutPattern.test(value)) {
        return false;
    }

    // Validar el dígito verificador
    var rutSinGuion = value.replace("-", "");
    var rut = rutSinGuion.slice(0, -1);
    var dv = rutSinGuion.slice(-1);
    var factor = 2;
    var sum = 0;
    for (var i = rut.length - 1; i >= 0; i--) {
        sum += parseInt(rut.charAt(i)) * factor;
        factor = factor === 7 ? 2 : factor + 1;
    }
    var dvCalculado = 11 - (sum % 11);
    dvCalculado = dvCalculado === 11 ? "0" : dvCalculado === 10 ? "K" : dvCalculado.toString();

    return dv === dvCalculado;
  }, "El RUT no es válido (escriba sin puntos y con guión)");

  // Agregar método de validación para correo
  $.validator.addMethod("emailCompleto", function(value, element) {

    // Expresión regular para validar correo electrónico
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z\-0-9]{2,}))$/;

    // Validar correo electrónico con la expresión regular
    return regex.test(value);

  }, 'El formato del correo no es válido');
  
  // Agregar método de validación para que un campo sólo acepte 
  // letras y espacios en blanco, pero no números ni símbolos,
  // ideal para campos como nombres y apellidos
  $.validator.addMethod("soloLetras", function(value, element) {

    return this.optional(element) || /^[a-zA-Z\s]*$/.test(value);

  }, "Sólo se permiten letras y espacios en blanco.");


  // El siguiente Javascript obliga a que la caja de texto del rut, siempre escriba la letra "K" en mayúscula
  document.getElementById('rut').addEventListener('keyup', function(e) {
    e.target.value = e.target.value.toUpperCase();
  });

    $('#formulario-registro').validate({
        rules: {
            tipo_usuario: {
                required: true,
            },
            rut: {
                required: true,
                rutChileno: true
            },
            nombre: {
                required: true,
                soloLetras: true
            },
              apellido: {
                required: true,
                soloLetras: true
            },
            correo: {
                required: true,
                email: true
            },
            direccion: {
                required: true
            },
        },
        messages: {
            tipo_usuario: {
                required: 'Debe seleccionar un tipo de usuario.'
            },
            rut: {
                required: 'Este campo es obligatorio.',
                rutChileno: "El RUT no es válido (escriba sin puntos y con guión)"
            },
            nombre: {
                required: 'Este campo es obligatorio.',
                soloLetras: "El nombre sólo puede contener letras y espacios en blanco"
            },
            apellido: {
                required: 'Este campo es obligatorio.',
                soloLetras: "El nombre sólo puede contener letras y espacios en blanco"
            },
            correo: {
                required: 'Este campo es obligatorio.',
                email: 'Por favor, ingrese un correo electrónico válido.'
            },
            direccion: {
                required: 'Este campo es obligatorio.'
            },
        },
        errorElement: 'div',
        errorPlacement: function(error, element) {
            if (element.attr('type') === 'checkbox') {
                error.insertAfter(element.parent().parent());
            } else {
                error.insertAfter(element);
            }
        }
    });

    // Validación personalizada para tipo_usuario (solo seleccionar uno)
    $('#formulario-registro').submit(function() {
        if ($('input[name="tipo_usuario"]:checked').length !== 1) {
            $('.form-group.tipo-usuario .invalid-feedback').show();
            return false;
        } else {
            $('.form-group.tipo-usuario .invalid-feedback').hide();
            return true;
        }
    });
});
