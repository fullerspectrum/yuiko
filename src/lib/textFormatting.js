function typeFormat(text){
  let edited = "";
  if(text.length < 4)
    return text;
  else if(text == "TV_SHORT")
    edited = "TV Short";
  else if(text == "ONE_SHOT")
    edited = "One Shot";
  else
    edited = text.substr(0,1) + text.substr(1).toLowerCase();
  return edited;
}

module.exports = {
  typeFormat
}