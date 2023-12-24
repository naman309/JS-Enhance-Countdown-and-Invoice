//invoice.js

"use strict";

const calculateDiscount = (customer, subtotal) => {
    if (customer == "reg") {
        if (subtotal >= 100 && subtotal < 250) {
            return 0.1;
        } else if (subtotal >= 250 && subtotal < 500) {
            return 0.25;
        } else if (subtotal >= 500) {
            return 0.3;
        } else {
            return 0;
        }
    } else if (customer == "loyal") {
        return 0.3;
    } else if (customer == "honored") {
        if (subtotal < 500) {
            return 0.4;
        } else {
            return 0.5;
        }
    }
};

$(document).ready(() => {
    $("#calculate").click(() => {
        const customerType = $("#type").val();

        let subtotal = $("#subtotal").val();

        subtotal = parseFloat(subtotal);

        if (isNaN(subtotal) || subtotal <= 0) {
            alert("Subtotal must be a number greater than zero.");

            $("#clear").click();

            $("#subtotal").focus();

            return;
        }

        const discountPercent = calculateDiscount(customerType, subtotal);

        const discountAmount = subtotal * discountPercent;

        const invoiceTotal = subtotal - discountAmount;

        $("#subtotal").val(subtotal.toFixed(2));

        $("#percent").val((discountPercent * 100).toFixed(2));

        $("#discount").val(discountAmount.toFixed(2));

        $("#total").val(invoiceTotal.toFixed(2));

        /* This is the required code asked in question 1-9*/

        //validating the date
        function isValidDate(strDate) {
            if (!isNaN(strDate.getMonth())) {
                return true;
            }
            return false;
        }

        //format and check date
        function getDates() {
            var getd = $("#invoice_date").val();
            var day;
            var month;
            var year;

            //if invoice date is empty then currebt date is taken
            //else the entered date is validate and formated according to the question

            if (getd == "") {
                var date = new Date();

                day = date.getDate();
                month = date.getMonth() + 1;
                year = date.getFullYear();

                var d = month + "/" + day + "/" + year;

                return d;
            } else {
                var date = new Date(getd);

                console.log(isValidDate(date));

                if (isValidDate(date) == false) {
                    alert("Enter a valid date");

                    $("#clear").click();

                    $("#invoice_date").focus();

                    return;
                } else {
                    day = date.getDate();
                    month = date.getMonth() + 1;
                    year = date.getFullYear();

                    var d = month + "/" + day + "/" + year;

                    return d;
                }
            }
        }

        //printing invoice date
        $("#invoice_date").val(getDates());

        var due = new Date(getDates());

        due.setDate(due.getDate() + 30);

        var due_day = due.getDate();
        var due_m = due.getMonth() + 1;
        var due_y = due.getFullYear();

        //printing due date
        $("#due_date").val(due_m + "/" + due_day + "/" + due_y);

        /* End of code which is modified */

        // set focus on drop-down

        $("#type").focus();
    });

    $("#clear").click(() => {
        $("#type").val("reg");

        $("#subtotal").val("");

        $("#invoice_date").val("");

        $("#percent").val("");

        $("#discount").val("");

        $("#total").val("");

        $("#due_date").val("");

        // set focus on drop-down

        $("#type").focus();
    });

    $("#type").focus();
});