class StringUtils {
  static getInnerText(searchString, startMarker, endMarker) {
    let resultString = '';

    if (searchString.length > 0 && startMarker.length > 0 && endMarker.length > 0) {
      const startMarkerPosition = searchString.indexOf(startMarker);

      if (startMarkerPosition > 0) {
        const startPosition = startMarkerPosition + startMarker.length;
        const endMarkerPosition = searchString.indexOf(endMarker, startPosition);

        if (endMarkerPosition > 0 && endMarkerPosition > startMarkerPosition) {
          resultString = searchString.substr(startPosition, (endMarkerPosition - startPosition));
        }
      }
    }

    return resultString;
  }
}

module.exports = StringUtils;
