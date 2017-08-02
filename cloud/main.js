// Cloud Code entry point
Parse.Cloud.define("averageStars", function(request, response) {
  const query = new Parse.Query("Review");
  query.equalTo("movie", request.params.movie)
    .find()
    .then((results) => {
      let sum = 0;
      for (let i = 0; i < results.length; ++i) {
        sum += results[i].get("rate");
      }
      response.success(sum / results.length);
    })
    .catch(() =>  {
      response.error("movie lookup failed");
    });
});

Parse.Cloud.beforeSave("Review", function(request, response) {
  if (request.object.get("movie") === '') {
    response.error("You have to specify the movie title.");
  }

  if (request.object.get("comment") === '') {
    response.error("You have to write a comment.");
  }

  if (request.object.get("rate") < 1) {
    response.error("Rates go from 1 to 5");
  } else if (request.object.get("rate") > 5) {
    response.error("Rates go from 1 to 5");
  } else {
    response.success();
  }
});
