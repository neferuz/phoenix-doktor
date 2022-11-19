import Vue from "vue";

Vue.filter("highlight", (text, value) => {
  let regex = new RegExp(value, "gi");

  return text.replace(regex, function (matchedText) {
    return "<span>" + matchedText + "</span>";
  });
});

Vue.filter("formatPhone", (phone) => {
  let regex = /^(\+)(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})$/;

  let arr = phone.match(regex);
  if (!arr) return phone;

  if (arr.length == 6) {
    return `${arr[1]} (${arr[2]}) ${arr[3]}-${arr[4] - arr[5]}`;
  }
  return `${arr[1]}${arr[2]} (${arr[3]}) ${arr[4]}-${arr[5]}-${arr[6]}`;
});
