function typeFormat(text) {
  let edited = 'Unknown';
  if(text){
    if (text.length < 4) return text;
    if (text === 'TV_SHORT') edited = 'TV Short';
    else if (text === 'ONE_SHOT') edited = 'One Shot';
    else edited = text.substr(0, 1) + text.substr(1).toLowerCase();
    return edited;
  } else {
    return edited;
  }
}

module.exports = {
  typeFormat,
};
