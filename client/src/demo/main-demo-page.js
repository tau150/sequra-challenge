import { setAmount } from "../main";
const regex = /[^\d]/g;

const getAndParsePrice = () => {
  const productPrice = $("#product-price").html();

  return productPrice.replace(regex, "");
};

$(document).ready(function () {
  $(".item-color").on("click", function () {
    $(".item-color").removeClass("ring hover:ring-gray-200").addClass("hover:ring-gray-200");
    $(this).addClass("ring").removeClass("hover:ring-gray-200");
  });

  $(".product-capacity").on("click", function () {
    $(".product-capacity").removeClass("ring");
    $(this).addClass("ring");
    const price = $(this).find("span").attr("data-price");

    $("#product-price").html(price);
    $(".quantity > div > input").val("1");

    const parsedPrice = price.replace(regex, "");

    setAmount(parsedPrice);
  });

  $(".btn-decrement").on("click", function () {
    var now = $(".quantity > div > input").val();
    const parsedPrice = getAndParsePrice();

    if ($.isNumeric(now)) {
      if (parseInt(now) - 1 > 0) {
        now--;
      }
      $(".quantity > div > input").val(now);
      setAmount(parsedPrice * now);
    } else {
      $(".quantity > div > input").val("1");
      setAmount(parsedPrice);
    }
  });

  $(".btn-increment").on("click", function () {
    var now = $(".quantity > div > input").val();

    const parsedPrice = getAndParsePrice();

    if ($.isNumeric(now)) {
      const value = parseInt(now) + 1;

      $(".quantity > div > input").val(value);
      setAmount(parsedPrice * value);
    } else {
      $(".quantity > div > input").val("1");
      setAmount(parsedPrice);
    }
  });
});
