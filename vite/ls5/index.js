import "./src/svgLoader";

fetch("/api/users", {
  method: "post",
})
  .then((data) => {
    console.log("data", data);
  })
  .catch((error) => {
    console.log("error", error);
  });
