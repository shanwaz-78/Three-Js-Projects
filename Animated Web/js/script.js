const main = document.querySelector("#main");
const page1_img = document.querySelector("#page1 > img");

main.addEventListener("mousemove", (event) => {
  page1_img.style.top =  1 - event.clientY * 0.04 + "px";
  page1_img.style.left = 1 -  event.clientX * 0.04 + "px";
});