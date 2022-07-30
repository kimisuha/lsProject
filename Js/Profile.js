
$(document).ready(function () {
    /* $("#attention").hide();
    let attention = (type, content) => {
        if (type == "success") {
            $("#attention").addClass("alert-success").show(2000, function () {
                $("#attention").removeClass("alert-success").hide(1000);
            });
        } else {
            $("#attention").addClass("alert-danger").show(2000, function () {
                $("#attention").hide(1000).removeClass("alert-danger");
            });
        }
    } */
    
    $("#infoChange").on("click", function () {
        $("input").removeAttr('disabled');
    });

    $("#save").on("click", function () {
        $("#profileForm").validate({
            rules: {
                email: {
                    required: true,
                    email: true
                },
                username: {
                    required: true,
                    minlength: 2
                },
                birth: {
                    required: true,
                    date: true
                },
                password: {
                    required: true,
                    minlength: 5
                }
            },
            message: {
                email: {
                    required: "can't be null",
                    email: "invalid email"
                },
                username: {
                    required: "can't be null",
                    minlength: "too short!"
                },
                birth: {
                    required: "can't be null",
                    date: "invalid date!"
                },
                password: {
                    required: "can't be null",
                    minlength: "too short!"
                }
            },
            submitHandle: function (form) {
                $("input").attr('disabled', 'disabled');
                //attention("success");
                form.submit();
            }
        });
    });
});