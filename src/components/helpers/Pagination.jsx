import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { searchByNameAction } from '../../actions/paginationAction';

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1
    };
  }

  prevClick = e => {
    e.preventDefault();
    if (this.props.pages.lastPage <= this.state.currentPage) {
      this.setState(prevState => {
        const page = { ...(prevState.currentPage - 1) };
        this.props.searchByNameAction(page);
        this.setState({
          currentPage: page
        });
      });
    }
  };

  nextClick = e => {
    e.preventDefault();
    if (this.props.pages.lastPage > this.state.currentPage) {
      this.setState(prevState => {
        const page = { ...(prevState.currentPage + 1) };
        this.props.searchByNameAction(page);
        this.setState({
          currentPage: page
        });
      });
    }
  };

  handleClick = page => {
    this.props.searchByNameAction(page);
    this.setState({
      currentPage: page
    });
  };

  render() {
    const pages = this.props.pages ? this.props.pages.lastPage : 1;
    const currentPage = this.props.pages ? this.props.pages.currentPage : 1;
    const lastPage = this.props.pages ? this.props.pages.lastPage : 1;
    const paging = [];
    for (let i = 1; i <= pages; i += 1) {
      paging.push(i);
    }
    return (
      <nav aria-label="Page navigation">
        <ul className="pagination">
          <li
            role="menuitem"
            tabIndex="0"
            className={currentPage === 1 ? 'page-item disabled' : 'page-item'}
            onClick={() => {}}
            onKeyPress={this.prevClick}
          >
            <a href="#/" className="page-link" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
            </a>
          </li>
          {paging.map(page => (
            <li key={page} className={page === currentPage ? 'page-item active' : 'page-item'}>
              <a href="#/" className="page-link" onClick={() => this.handleClick(page)}>
                {page}
              </a>
            </li>
          ))}
          <li
            role="menuitem"
            tabIndex="0"
            className={currentPage < lastPage ? 'page-item' : 'page-item disabled'}
            onClick={() => {}}
            onKeyPress={this.nextClick}
          >
            <a href="#/" className="page-link" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only">Next</span>
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}
Pagination.propTypes = {
  searchByNameAction: PropTypes.func.isRequired,
  pages: PropTypes.string.isRequired
};

function mapStateToProps({ PaginationReducer }) {
  return { PaginationReducer };
}

export default connect(
  mapStateToProps,
  { searchByNameAction }
)(Pagination);
