import React, {Component} from "react";
import Searchbar from './Searchbar';
import SearchBarButton from "./SearchBarButton";
import Modal from "./Modal";
import ImageGallery from "components/ImageGallery";
import ImageGalleryItem from "components/ImageGalleryItem";
import Loader from "components/Loader";
import Error from "components/Error";
import Empty from "components/Empty";
import Api from '../services/API';
import Button from "components/Button";
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import { ReactComponent as SearchIcon } from '../icons/search.svg';

// импорт иконки как компонента

export default class App extends Component {
  state = {
    openModal: false,
    imgName: '',
    imageList: [],
    imageModal: {},
    error: null,
    status: 'idle',
    page: 1,
    totalImg: 0,
    isLoading: false,
    toast: false,
    button: false
  }

  async componentDidUpdate(prevProps, prevState) {
    const {imgName, page, isLoading} = this.state
    const prevName = prevState.imgName;
    const prevPage = prevState.page;
    const prevLoading = prevState.isLoading;

    if (imgName === '') {
      toast.error(`Hey, enter something normal`, {
          theme: "colored"
      })

      return
    }
      
    if (prevName !== imgName || prevPage !== page) {
      this.setState({
        // status: 'pending',// плохо работает, перезагружает страницу, использую isLoading
        isLoading: true,
      });
      this.getImgObj();
    }
      if (prevLoading === true && !isLoading) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
      }
    
  };

  getImgObj = async () => {
    const { imgName, page, imageList} = this.state;

    try {
      const imgObj = await Api.fetchImg(imgName, page);
      const totalPage = Math.ceil(imgObj.totalHits / 12);

      this.setState({
          imageList: [...imageList, ...imgObj.hits],
          status: 'resolved',
          totalImg: imgObj.totalHits,
          isLoading: false,
      });
      
        if (imgObj.totalHits >= 1 && imageList.length < 12 ) {
          toast.success(`We find ${imgObj.totalHits} images `, {
          theme: "colored"
        })
      }

        if (imgObj.totalHits === 0) {
          toast.error(`Hey, enter something normal`, {
            theme: "colored"
          })
          this.setState({
            status: 'idle'
          })
          return
      }
        if (imgObj.totalHits > 12) {
        
        this.setState({
          button: true
        })
      }

      if (page === totalPage ) {
        this.setState({
            button: false
          })
        }
      
      } catch (error) {
          this.setState({ error, status: 'rejected' });
      } finally {
          this.setState({ isLoading: false });
      }
  }

  toggleModal = () => {
    this.setState(state => ({
      openModal: !state.openModal
    }))
  };

  getImgModal = ({ target }) => {

    this.setState({
      imageModal: {
        alt: target.alt,
        src: target.dataset.src
      },
      openModal: true,

    });
  };

  handleFormSubmit = name => {
    const { imgName } = this.state
    this.setState({ imgName: name });
    if (name !== imgName) {
      this.setState({
        imgName: name,
        imageList: [],
        page: 1
      })
    }
    if (name.trim() === '') {
      this.setState({
        imgName: '',
        imageList: [],
        status: 'idle',
        page: 1,
        button: false,
      })
     
    }
  }

  
  handleButtonMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1
    }))
  }

  render() {
    const { openModal, imageList, error, status, imageModal, isLoading, button } = this.state;
     
    return (
      <>
        <ToastContainer autoClose={1000} />
        <Searchbar onSubmit={this.handleFormSubmit}>
          <SearchBarButton aria-label={'search button'}>
            <SearchIcon />
          </SearchBarButton>
        </Searchbar>
        
        
        {status === 'idle' && (
          <Empty />
        )}
        {isLoading && (
          <div style={{
            position: 'absolute',
            right: '50%',
            bottom: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
          }}
          >
             <Loader/>
          </div>
        )}
    
        {status === 'rejected' && (
          <Error error={error.message} />
        )}
        {status === 'resolved' && (
          <ImageGallery>
            <ImageGalleryItem
              imageList={imageList}
              onClick={this.getImgModal}/>
            </ImageGallery>
          
        )}
        {button && (<Button
          onClick={this.handleButtonMore} />)}
      
        {openModal && <Modal
          onClose={this.toggleModal}
          imageModal={imageModal}
        />}
      </>
    );
  };
}





      // {status === 'pending' && (
      //     <div style={{
      //       position: 'absolute',
      //       display: 'block',
      //       right: '50%',
      //       bottom: '50%',
      //       marginTop: '20px',
      //       textAlign: 'center',
      //     }}
      //     >
      //        <Loader/>
      //     </div>
      //   )}
