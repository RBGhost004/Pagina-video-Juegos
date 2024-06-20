$(document).ready(function() {
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
    
    // Validar formulario con JQuery
    $("#formulario-ingresar").validate({
      rules: {
        correo: {
          required: true,
          emailCompleto: true,
        },
        password: {
          required: true,
          minlength: 5,
          maxlength: 15,
        },
      }, // --> Fin de reglas
      messages: {
        correo: {
          required: "El correo es un campo requerido",
          email: "El formato del correo no es válido",
        },
        password: {
          required: "La contraseña es un campo requerido",
          minlength: "La contraseña debe tener un mínimo de 5 caracteres",
          maxlength: "La contraseña debe tener un máximo de 15 caracteres",
        },
      }, // --> Fin de mensajes
    }); 
  });