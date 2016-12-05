/* eslint-disable */
/**
 * This code was originally taken from https://github.com/nitinhayaran/Justified.js and has been modified
 * for use in the Pix project to work without jQuery and offline by Jamie Greeff @madjam002.
 *
Original license:

The MIT License (MIT)

Copyright (c) 2014 Nitin Hayaran

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

 */

export default media => {
  const border = 4
  const rowHeight = 200
  const maxRowHeight = 350
  const w = 1250 // TODO breakpoints fixed viewport width

  var ws = [],
      rowNum = 0,
      baseLine = 0,
      limit = media.length,
      photos = media,
      rows = [],
      totalWidth = 0;

  media.forEach((image, index) => {
      var wt = image.width
      var ht = image.height
      if (ht !== rowHeight) {
          wt = Math.floor(wt * (rowHeight / ht));
      }
      totalWidth += wt;
      ws.push(wt);
  })

  var perRowWidth = totalWidth / Math.ceil(totalWidth / w);
  var tw = 0;
  while (baseLine < limit) {
      var row = {
              width: 0,
              photos: []
          },
          c = 0;
      while ((tw + ws[baseLine + c] / 2 <= perRowWidth * (rows.length + 1)) && (baseLine + c < limit)) {
          tw += ws[baseLine + c];
          row.width += ws[baseLine + c];
          row.photos.push({
              width: ws[baseLine + c],
              photo: photos[baseLine + c]
          });
          c++;
      }
      baseLine += c;
      rows.push(row);
  }

  const outputRows = []

  for (var i = 0; i < rows.length; i++) {
      var row = rows[i],
          lastRow = false;
      rowNum = i + 1;
      if (i === rows.length - 1) {
          lastRow = true;
      }
      tw = -1 * border;

      const outputRow = { items: [] }

      let availableRowWidth = w

      // Ratio of actual width of row to total width of images to be used.
      var r = availableRowWidth / row.width, //Math.min(w / row.width, this.options.maxScale),
          c = row.photos.length;

      // new height is not original height * ratio
      var ht = Math.min(Math.floor(rowHeight * r), maxRowHeight);
      r = ht / rowHeight;

      var imagesHtml = '';
      for (var j = 0; j < row.photos.length; j++) {
          var photo = row.photos[j].photo;
          // Calculate new width based on ratio
          var wt = Math.floor(row.photos[j].width * r);
          tw += wt + border;

          outputRow.items.push({
            item: photo,
            width: wt,
            height: ht,
          })
      }

      var k = 0;
      // MOD (@madjam002) only make photos wider to fill space if there is more than one row
      // otherwise you end up with one photo filling the entire page
      // TODO this could be the source of clipping the top and bottom off some images
      // this needs modifying if that is a problem, but we'll see
      if (rows.length > 1) {
        while (tw < availableRowWidth) {
            const item = outputRow.items[k]
            if (!item) break
            item.width += 1

            k = (k + 1) % c;
            tw++;
        }
      }
      // if total width is slightly bigger than
      // actual div width then subtract 1 from each
      // photo width till they match
      k = 0;
      while (tw > availableRowWidth) {
          const item = outputRow.items[k]
          if (!item) break
          item.width -= 1
          k = (k + 1) % c;
          tw--;
      }

      outputRow.items.forEach(item => {
        item.width = item.width / w
        item.height = item.height / w
      })

      outputRows.push(outputRow)
  }

  return outputRows
}
