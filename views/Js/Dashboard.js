1/* this for sort by dropdown */

$(document).ready(function () {
    $("#content-left-nav-menu").on("click", function () {
        $(".content-left ul li").toggle(function () {

            $(".content-left ul li").css("display", "block");
        });
    });


    /* this for item effect */

    $(".todo-item-bton").hide();
    $(".todo-item").on("click", function () {
        $(".todo-item-bton").toggle(function () {
            $(".todo-item-bton").show();
        });
    });

    /*     see less and see more effect
     */
    $("#xtl1").on("click", function () {
        let text = $("#xtl1").text();

        if (text == "see more") {
            $("#xtl1").text("see less");
            $("#xtl1").css("height", "auto");
        } else {
            $("#xtl1").text("see more");
            $("#xtl1").css("height", "9rem");
        }
    });

    /* validate for form add new */

    /*  $.validator.addMethod("checkdate", function () {
         let d = new Date();
         let date = new Date($("#dateEnd").val());
         return date >= d.getDate();
     }); */

    $("#addNewJob").on("click", function () {
        $("#addNewJob").validate({
            rules: {
                title: {
                    required: true,
                    minlength: 5,
                    maxlength: 25
                },
                content: {
                    required: true,
                    minlength: 5
                },
                dateEnd: {
                    required: true,
                    date: true,
                    //checkdate: true
                }
            },
            messages: {
                title: {
                    required: "this can't be null",
                    minlength: "not too short",
                    maxlength: "not too long"
                },
                content: {
                    required: "this can't be null",
                    minlength: "not too short",
                },
                dateEnd: {
                    required: "this can't be null",
                    date: "incorrect type!",
                    //checkdate: "must equal or great than this!"
                }
            },
            formSubmitHandle: function (form) {
                form.submit();
            }
        })
    });


    /*     show and hide left nav in response  */
    let check = true;

    $("#tooggleNavlef").on("click", function () {
        if (check) {

            $(".content-left-nav").removeClass("d-none");
            $("#tooggleNavlef>i").addClass("bi-arrow-up-circle-fill").removeClass("bi-arrow-down-circle-fill");
            check = false;
        }
        else {
            $(".content-left-nav").addClass("d-none");
            $("#tooggleNavlef>i").addClass("bi-arrow-down-circle-fill").removeClass("bi-arrow-up-circle-fill");
            check = true;
        }
    });


    /*     modal effect for share */
    $("#shareForm button#shareSubmit").on("click", function () {
        let shareName = $("#shareForm input").val();
        if (shareName != "") {
            let content = `<span class="span-share">${shareName}</span>`
            $("#listShare").append(content);
            $("#shareForm input").val("");
        }
    });



    /* validate for edit modal */
    $("#editModalForm").on("click", function () {
        $("#editModalForm").validate({
            rules: {
                title: {
                    required: true,
                    minlength: 2
                },
                content: {
                    required: true,
                    minlength: 2
                }
            },
            messages: {
                title: {
                    required: "this can't be null",
                    minlength: "too short!"
                },
                content: {
                    required: "this can't be null",
                    minlength: "too short!"
                }
            },
            handleSubmit: function (form) {
                attention("success");
                form.submit();
            }
        });
    });

    /*     appear alert effect*/
    $("#attention").hide();
    let attention = (type, content) => {
        if (type == "success") {
            $("#attention").addClass("alert-success").show(2000, function () {
                $("#attention").removeClass("alert-success").hide({}, 1000);
            });
        } else {
            $("#attention").addClass("alert-danger").show(2000, function () {
                $("#attention").hide(1000).removeClass("alert-danger");
            });
        }
    }

    $(".choose-yes").on("click", function () {
        attention("success");
        //console.log("test!");
    });
});
