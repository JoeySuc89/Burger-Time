$(function() {
  $("body").on("click", ".burger-eaten", function(event) {
    // console.log($(this).attr("data-id"));
    // console.log($(this).attr("data-justEaten"));
    var id = $(this).data("id");
    var justEaten = $(this).attr("data-justEaten");
    console.log(id);
    console.log(justEaten);
    var consumedState = {
      devoured: '1'
    };

    $.ajax("/api/burgers/"+id, {
      type: "PUT",
      data: consumedState
    }).then(
      function() {
        console.log("the burger is now devoured", justEaten);
        location.reload();
      }
    );
  });

  $(".create-form").on("submit", function(event) {
    event.preventDefault();

    var newBurger = {
      burger_name: $("#bg").val().trim(),
      devoured: $("[name=devoured]:checked").val()
    };

  $.ajax("api/burgers", {
    type: "POST",
    data: newBurger
  }).then(
    function() {
      console.log("made a new burger");
      location.reload()
    }
   );
  });
});
