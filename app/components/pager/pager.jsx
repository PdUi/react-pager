var Pager = React.createClass({
  isUndefined: function(obj) {
    return obj === undefined || obj === null;
  },
  convertToDecimal: function(alternativeNumeralRepresentation) {
    return parseInt(alternativeNumeralRepresentation, 10);
  },
  convertFromDecimal: function(decimalNumeralRepresentation) {
    return decimalNumeralRepresentation;
  },
  pageTo: function(pageIndex) {
    var currentPage = isNaN(pageIndex) ? this.convertToDecimal(pageIndex) : pageIndex;
    this.setState({currentPage: currentPage, pageInput: this.convertFromDecimal(pageIndex), isValidPageInput: true});
  },
  isCurrentPage: function(page) {
    return this.convertToDecimal(this.state.currentPage) === this.convertToDecimal(page);
  },
  updateCurrentPage: function() {
    var pageInput = this.convertToDecimal(this.state.pageInput);

    if (pageInput && !isNaN(pageInput) && pageInput >= 1 && pageInput <= this.convertToDecimal(this.totalPages)) {
      this.pageTo(this.pageInput);
    } else {
      this.setState({isValidPageInput: false});
    }
  },
  getInitialState: function() {
      var settings = this.props.settings || {};
      this.isValidPageInput = true;
      this.firstPage = settings.firstPage || 1;
      this.pageSize = this.convertToDecimal(settings.pageSize) || 10;
      this.totalNumberOfRecords = this.convertToDecimal(settings.totalNumberOfRecords) || 0;
      this.maxExplicitPages = window.Math.max((this.convertToDecimal(settings.maxExplicitPages) || 7), 5);
      var totalPages = this.totalNumberOfRecords > 0 ? window.Math.ceil(this.totalNumberOfRecords / this.pageSize) : 0;
      this.totalPages = this.convertFromDecimal(totalPages);
      var firstPage = this.convertToDecimal(this.firstPage);
      var currentPage = this.convertToDecimal(settings.currentPage) || firstPage;
      this.currentPage = this.convertFromDecimal(currentPage);
      this.enablePageInput = !this.isUndefined(settings.enablePageInput) ? settings.enablePageInput && totalPages > 1 : totalPages > 1;
      this.pageInput = this.currentPage;
      this.enablePageArrows = !this.isUndefined(settings.enablePageArrows) ? settings.enablePageArrows && totalPages > 1 : totalPages > 1;
      this.enableFirstLastPageArrows = !this.isUndefined(settings.enableFirstLastPageArrows) ? this.enablePageArrows && settings.enableFirstLastPageArrows : this.enablePageArrows; // also vm.totalPages > 2?
      this.hasMultiplePages = totalPages > firstPage;
      return this;
  },
  render: function() {
    var totalPages = this.convertToDecimal(this.totalPages);
    var currentPage = this.convertToDecimal(this.state.currentPage);
    var firstPage = this.convertToDecimal(this.firstPage);

    var canPageBackward = currentPage > firstPage;
    var canPageForward = currentPage < totalPages;

    var hasMorePagesBackward = false;
    var hasMorePagesForward = false;

    if (currentPage > firstPage + 2 && totalPages > this.maxExplicitPages) {
      hasMorePagesBackward = true;
    }

    if (currentPage < totalPages - 2 && totalPages > this.maxExplicitPages) {
      hasMorePagesForward = true;
    }

    var rangeStart;
    var rangeEnd;
    if (!hasMorePagesBackward && !hasMorePagesForward) {
      rangeStart = firstPage + 1;
      rangeEnd = totalPages;
    } else if (!hasMorePagesBackward) {
      rangeStart = firstPage + 1;
      rangeEnd = this.maxExplicitPages - 1;
    } else if (!hasMorePagesForward) {
      rangeEnd = totalPages;
      rangeStart = totalPages - this.maxExplicitPages + 3;
    } else {
      var hasOddNumberOfButtons = (this.maxExplicitPages % 2) === 1;
      var x = window.Math.ceil((this.maxExplicitPages - 5) / 2);

      if (currentPage + x === totalPages - 2) {
        hasMorePagesForward = false;
        rangeStart = currentPage - x;
        rangeEnd = totalPages;
      } else {
        if (hasOddNumberOfButtons) {
          rangeStart = currentPage - x;
          rangeEnd = currentPage + x + 1;
        } else {
          rangeStart = currentPage - x + 1;
          rangeEnd = currentPage + x + 1;
        }
      }
    }

    var range = [];
    for (;rangeStart < rangeEnd; rangeStart++) {
      range.push(this.convertFromDecimal(rangeStart));
    }

    return (
      <div className="pager-container">
        {
          (function (settings) {
            if(settings.pager.enableFirstLastPageArrows) {
              return (<PagerButton shouldBeDisabled={!settings.canPageBackward} buttonText={'|<'} onClick={settings.pager.pageTo.bind(settings.pager, settings.pager.firstPage)} />);
            }
          })({pager: this, canPageBackward: canPageBackward})
        }
        {
          (function (settings) {
            if(settings.pager.enablePageArrows) {
              return (<PagerButton shouldBeDisabled={!settings.canPageBackward} buttonText={'<'} onClick={settings.pager.pageTo.bind(settings.pager, currentPage - 1)} />);
            }
          })({pager: this, canPageBackward: canPageBackward, currentPage: currentPage})
        }
        {
          (function (settings) {
            if(settings.pager.hasMultiplePages) {
              return (<PagerButton shouldBeDisabled={!settings.canPageBackward} buttonText={settings.pager.firstPage} onClick={settings.pager.pageTo.bind(settings.pager, settings.pager.firstPage)} isCurrentPage={settings.pager.isCurrentPage(settings.pager.firstPage)} />);
            }
          })({pager: this, canPageBackward: canPageBackward})
        }
        {
          (function (hasMorePagesBackward) {
            if(hasMorePagesBackward) {
              return (<PagerButton shouldBeDisabled={true} buttonText={'...'} />);
            }
          })(hasMorePagesBackward)
        }
        {
          (function (settings) {
            return settings.range.map(function(page) {
              return (<PagerButton shouldBeDisabled={settings.pager.isCurrentPage(page)} buttonText={page} onClick={settings.pager.pageTo.bind(settings.pager, page)} isCurrentPage={settings.pager.isCurrentPage(page)} />);
            })
          })({pager: this, range: range, currentPage: currentPage})
        }
        {
          (function (hasMorePagesForward) {
            if(hasMorePagesForward) {
              return (<PagerButton shouldBeDisabled={true} buttonText={'...'} />);
            }
          })(hasMorePagesForward)
        }
        {
          (function (settings) {
            if(settings.pager.hasMultiplePages) {
              return (<PagerButton shouldBeDisabled={settings.currentPage === settings.pager.totalPages} buttonText={settings.pager.totalPages} onClick={settings.pager.pageTo.bind(settings.pager, settings.pager.totalPages)} isCurrentPage={settings.currentPage === settings.pager.totalPages} />);
            }
          })({pager: this, currentPage: currentPage})
        }
        {
          (function (settings) {
            if(settings.pager.enablePageArrows) {
              return (<PagerButton shouldBeDisabled={!settings.canPageForward} buttonText={'>'} onClick={settings.pager.pageTo.bind(settings.pager, settings.currentPage + 1)} />);
            }
          })({pager: this, canPageForward: canPageForward, currentPage: currentPage})
        }
        {
          (function (settings) {
            if(settings.pager.enableFirstLastPageArrows) {
              return (<PagerButton shouldBeDisabled={!settings.canPageForward} buttonText={'>|'} onClick={settings.pager.pageTo.bind(settings.pager, settings.pager.totalPages)} />);
            }
          })({pager: this, canPageForward: canPageForward})
        }
      </div>
    );
  }
});

React.render(
  <Pager settings={{totalNumberOfRecords: 100}} />,
  document.getElementById('content')
);
