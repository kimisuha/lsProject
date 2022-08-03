$(document).ready(function () {
    $("#signin-form-submit").on("click", function () {
        $("#sign-in-form").validate({
            rules: {
                username: {
                    required: true,
                    minlength: 2
                },
                email: {
                    required: true,
                    minlength: 5,
                    email: true
                },
                password: {
                    required: true,
                    minlength: 2
                }
            },
            messages: {
                username: {
                    required: "please provide username",
                    minlength: "your username at least 2 character"
                },
                email: {
                    required: "please enter provide email",
                    minlength: "please enter valid email",
                    email: "please enter valid email"
                },
                password: {
                    required: "please provide password",
                    minlength: "please enter valid password"
                }
            },
            submitHandle: function (form) {
                form.submit();
            }
        });
    });
});