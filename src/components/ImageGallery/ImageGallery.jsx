import { toast } from 'react-toastify';
import { pixabay } from 'services';
import { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';

export class ImageGallery extends Component {
  state = {
    images: [],
    loading: false,
    page: 1,
    showModal: false,
    selectedImage: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.inputValue !== this.props.inputValue ||
      prevState.page !== this.state.page
    ) {
      this.setState({ loading: true });

      if (prevProps.inputValue !== this.props.inputValue) {
        this.setState({ page: 1 });
      }

      try {
        const response = await pixabay(this.props.inputValue, this.state.page);
        this.setState({ images: [...this.state.images, ...response.hits] });
      } catch (error) {
        toast.error(error.message);
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  handleLoad = () => {
    this.setState({ loading: true });
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  toggleModal = image => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
    this.setState({ selectedImage: image });
  };

  render() {
    const { images, loading, showModal, selectedImage } = this.state;
    return (
      <div>
        {loading && <Loader />}
        {images && (
          <ul className="ImageGallery">
            {images.map(({ id, webformatURL, largeImageURL }) => (
              <li
                key={id}
                className="ImageGalleryItem"
                onClick={() => this.toggleModal(largeImageURL)}
              >
                <ImageGalleryItem
                  url={webformatURL}
                  title={this.props.inputValue}
                />
              </li>
            ))}
          </ul>
        )}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={selectedImage} alt="" />
          </Modal>
        )}
        {images.length > 0 && <Button onLoad={this.handleLoad} />}
      </div>
    );
  }
}
