$(document).ready(function () {
    $('#myModal')
        .bootstrapValidator({
        excluded: ':disabled',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            name: {
                validators: {
                    notEmpty: {
                        message: 'please enter your name/company'
                    }
                }
            },
            email: {
                validators: {
                    emailAddress: {
                        message: 'please enter a valid email address'
                    },
                    notEmpty: {
                        message: 'please enter your contact information'
                    }
                }
            },
            requirements: {
                validators: {
                    notEmpty: {
                        message: 'please enter your requirements'
                    }
                }
            }
        }
    })
        .on('success.form.bv', function (e) {
          $('#success-message').slideDown({ opacity: "show" }, "slow") // Do something ...
        // Prevent form submission
        e.preventDefault();

        // Get the form instance
            var $form = $(e.target);
 
            // Get the BootstrapValidator instance
            var bv = $form.data('bootstrapValidator');
 
            // Use Ajax to submit form data
            $.post($form.attr('action'), $form.serialize(), function(result) {
                console.log(result);
            }, 'json');

        setTimeout (function() {
          $('#myModal').modal('hide');
        }, 2000);
    });

    $('#myModal')
       .on('shown.bs.modal', function () {
           $('#myModal').find('[name="name"]').focus();
        })
        .on('hidden.bs.modal', function () {
            $('#myModal').bootstrapValidator('resetForm', true);
            $('#success-message').hide()
            $('#budget').prop('selectedIndex', 0);
        });
});
