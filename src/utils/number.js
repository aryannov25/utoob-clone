export function prettifyNumber(views) {
  var thousand = 1000;
  var million = 1000000;
  var billion = 1000000000;
  var trillion = 1000000000000;
  if (views < thousand) {
    return String(views);
  }

  if (views >= thousand && views <= 1000000) {
    return Math.round(views / thousand) + "k";
  }

  if (views >= million && views <= billion) {
    return Math.round(views / million) + "M";
  }

  if (views >= billion && views <= trillion) {
    return Math.round(views / billion) + "B";
  } else {
    return Math.round(views / trillion) + "T";
  }
}
