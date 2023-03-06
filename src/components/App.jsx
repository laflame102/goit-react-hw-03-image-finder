import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { ImageGallery } from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    input: '',
  };

  handleFormSubmit = inputValue => {
    this.setState({ input: inputValue });
  };

  render() {
    const { input } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery inputValue={input} />
        <ToastContainer />
      </div>
    );
  }
}
