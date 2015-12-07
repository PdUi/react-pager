var Pager = React.createClass({
  render: function() {
    var settings = this.props.settings;
    function pageToBeginning(){console.log('pageToBeginning');}
    function retreat(){console.log('retreat');}
    function pageTo(pageIndex){
      console.log(JSON.stringify(pageIndex));
      }
    function advance(){console.log('advance');}
    function pageToEnd(){console.log('pageToEnd');}
    var canPageBackward = true;
    var enableFirstLastPageArrows = true;
    var enablePageArrows = true;
    var hasMultiplePages = true;
    var hasMorePagesBackward = true;
    var hasMorePagesForward = true;
    var canPageForward = true;
    var firstPage = 1;
    var totalPages = 100;

    return (
      <div class="pager-container">
        {(function () {
          if(enableFirstLastPageArrows) {
            return <button type="button"  onClick={pageToBeginning} disabled={!canPageBackward} dangerouslySetInnerHTML={{ __html: '|<'}}></button>
          }
        })()}
        {(function () {
          if(enablePageArrows) {
            return <button type="button"  onClick={retreat} disabled={!canPageBackward} dangerouslySetInnerHTML={{ __html: '<'}}></button>
          }
        })()}
        {(function () {
          if(hasMultiplePages) {
            return <button type="button"  onClick={pageToBeginning} disabled={!canPageBackward}>{firstPage}</button>
          }
        })()}
        {(function () {
          if(hasMorePagesBackward) {
            return <button type="button" disabled>...</button>
          }
        })()}
        {(function () {
          if(hasMorePagesForward) {
            return <button type="button" disabled>...</button>
          }
        })()}
        {(function () {
          if(hasMultiplePages) {
            return <button type="button"  onClick={pageToEnd} disabled={!canPageForward}>{totalPages}</button>
          }
        })()}
        {(function () {
          if(enablePageArrows) {
            return <button type="button"  onClick={advance} disabled={!canPageForward} dangerouslySetInnerHTML={{ __html: '>'}}></button>
          }
        })()}
        {(function () {
          if(enableFirstLastPageArrows) {
            return <button type="button"  onClick={pageToEnd} disabled={!canPageForward} dangerouslySetInnerHTML={{ __html: '>|'}}></button>
          }
        })()}
      </div>
    );
  }
});

React.render(
  <Pager />,
  document.getElementById('content')
);
