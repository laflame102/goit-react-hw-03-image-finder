import { toast } from 'react-toastify';
import { Component } from 'react';

export class Searchbar extends Component {
  state = {
    input: '',
  };

  handleInputChange = evt => {
    this.setState({ input: evt.currentTarget.value });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const { input } = this.state;
    const { onSubmit } = this.props;

    if (this.state.input.trim() === '') {
      toast.error('Enter image name');
      return;
    }
    onSubmit(input);
  };

  render() {
    const { input } = this.state;
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            name="input"
            placeholder="Search images and photos"
            value={input}
            onChange={this.handleInputChange}
          />
        </form>
      </header>
    );
  }
}
