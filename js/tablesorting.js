function sortTable(el, num) {
  var grid = document.getElementById(el),
      up = false;
  grid.onclick = function(e) {
    if (e.target.tagName != 'TH') return;

    sortGrid(e.target, e.target.cellIndex, e.target.getAttribute('data-type'));
  };

  function sortGrid(elem, colNum, type) {
    var tbody = grid.getElementsByTagName('tbody')[0];
    var rowsArray = [].slice.call(tbody.rows);
    var compare;

    if (elem.className == 'sort' || up == false) {
      $('#' + el + ' th').removeClass('sort-asc sort-desc')
      elem.className = 'sort sort-asc';
      up = true;
    } else {
      elem.className = 'sort sort-desc';
      up = false;
    }

    switch (type) {
      case 'number':
        compare = function(rowA, rowB) {
          if (rowA.hasChildNodes() || rowB.hasChildNodes()) {
            return rowA.cells[colNum].childNodes[0].innerHTML - rowB.cells[colNum].childNodes[0].innerHTML;
          } else {
            return rowA.cells[colNum].innerHTML - rowB.cells[colNum].innerHTML;
          }
        };
        break;
      case 'string':
        compare = function(rowA, rowB) {
          return rowA.cells[colNum].innerHTML > rowB.cells[colNum].innerHTML ? 1 : -1;
        };
        break;
      case 'date':
        compare = function(rowA, rowB) {
          var dateOne = rowA.cells[colNum].innerHTML.split('/'),
              dateTwo = rowB.cells[colNum].innerHTML.split('/'),
              finalDateOne = dateOne[2] + dateOne[1] + dateOne[0],
              finalDateTwo = dateTwo[2] + dateTwo[1] + dateTwo[0];

          return finalDateOne > finalDateTwo ? 1 : -1;
        };
        break;
    }

    rowsArray.sort(compare);
    if(up) rowsArray.reverse();
    grid.removeChild(tbody);

    for (var i = 0; i < rowsArray.length; i++) {
      tbody.appendChild(rowsArray[i]);
    }

    grid.appendChild(tbody);
  }
}
