var PagerButton = React.createClass({
  render: function() {
    if(this.props.shouldBeDisabled) {
      return <button type="button" disabled dangerouslySetInnerHTML={{ __html: this.props.buttonText}} className={this.props.isCurrentPage ? 'active' : ''}></button>
    }

    return <button type="button" onClick={this.props.onClick} dangerouslySetInnerHTML={{ __html: this.props.buttonText}}></button>
  }
});
