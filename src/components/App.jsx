import { useState, useEffect} from 'react';
import { ReactComponent as SearchIcon } from '../icons/search.svg';
import { Searchbar } from './Searchbar/Searchbar';
import SearchBarButton from "./SearchBarButton";
import { Modal } from './Modal/Modal';
import ImageGallery from "components/ImageGallery";
import ImageGalleryItem from "components/ImageGalleryItem";
import Loader from "components/Loader";
import Error from "components/Error";
import Empty from "components/Empty";
import Api from '../services/API';
import Button from "components/Button";
import { ToastContainer } from 'react-toastify';
import { ToastError, ToastSuccess } from './Toasts/Toasts';



export const App = () => {
  const [openModal, setOpenModal] = useState(false);
  const [imgName, setImgName] = useState('');
  const [imgList, setImgList] = useState([]);
  const [imgModal, setImgModal] = useState({});
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showBtnLoadMore, setBtnLoadMore] = useState(false);

 
  
  useEffect(() => {
    // если пустая строка, то не выполнять fetch
    if (imgName === '') {
      return;
    }
    const getImgObj = async () => {
      try {
        const imgObj = await Api.fetchImg(imgName, page);
        const totalPage = Math.ceil(imgObj.totalHits / 12);
        setImgList(i => [...i, ...imgObj.hits]);
        setStatus('resolved');
        setIsLoading(false);

        if (imgObj.totalHits === 0) {
          setStatus('idle');
          setIsLoading(false);
          setImgList([]);
          setBtnLoadMore(false);
          setPage(1)
          ToastError();
          return;
        }
        if (imgObj.totalHits >= 1 && imgList.length < 12) {
          ToastSuccess(imgObj.totalHits, imgName)
        }
        if (imgObj.totalHits > 12) {
          setBtnLoadMore(true)
        }
        if (page === totalPage) {
          setBtnLoadMore(false)
        }

      } catch (error) {
        setError(error);
        setStatus('rejected')

      } finally {
        setIsLoading(false);
      }
    
    }
    getImgObj();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgName, page]);

  useEffect(() => {
    if (imgList.length <= 12) {
      return
    }
    window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
  },[imgList])
   
  const toggleModal = () => {
    setOpenModal(prevState => !prevState)
  };

  const getImgModal = ({ target }) => {
    setImgModal(
      { alt: target.alt, src: target.dataset.src });
    toggleModal();
  };

  const handleButtonMore = () => {
    setPage(prevState => prevState + 1);    
  }



  const handleFormSubmit = name => {
    
    if (name.trim() === '') {
      ToastError();
      setImgList([]);
      setStatus('idle');
      setBtnLoadMore(false);
      setIsLoading(false);
      setPage(1);
 
    };
    if (name !== imgName) {
      setImgName(name);
      setImgList([]);
      setPage(1);
      setBtnLoadMore(false);

    } else {
      setImgName(name);
    }
    

  }

  return (
      <>
        <ToastContainer autoClose={1000} />
      <Searchbar
        onSubmit={handleFormSubmit}
      >
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
              imageList={imgList}
              onClick={getImgModal}/>
            </ImageGallery>
          
        )}
        {showBtnLoadMore && (<Button
          onClick={handleButtonMore} />)}
      
        {openModal && <Modal
          onClose={toggleModal}
          imageModal={imgModal}
        />}
      </>
    );
}

// const isFirstRender = useRef(true)
    // пропуск первого рендера v2
    // if (isFirstRender.current) {
    //   isFirstRender.current = false
    // }
    //===



// export default class App extends Component {
//   state = {
//     openModal: false,
//     imgName: '',
//     imageList: [],
//     imageModal: {},
//     error: null,
//     status: 'idle',
//     page: 1,
//     totalImg: 0,
//     isLoading: false,
//     toast: false,
//     button: false
//   }

//   async componentDidUpdate(prevProps, prevState) {
//     const {imgName, page, isLoading} = this.state
//     const prevName = prevState.imgName;
//     const prevPage = prevState.page;
//     const prevLoading = prevState.isLoading;

//     if (imgName === '') {
//       toast.error(`Hey, enter something normal`, {
//           theme: "colored"
//       })

//       return
//     }
      
//     if (prevName !== imgName || prevPage !== page) {
//       this.setState({
//         // status: 'pending',// плохо работает, перезагружает страницу, использую isLoading
//         isLoading: true,
//       });
//       this.getImgObj();
//     }
//       if (prevLoading === true && !isLoading) {
//       window.scrollTo({
//         top: document.documentElement.scrollHeight,
//         behavior: 'smooth',
//       });
//       }
    
//   };

//   getImgObj = async () => {
//     const { imgName, page, imageList} = this.state;

//     try {
//       const imgObj = await Api.fetchImg(imgName, page);
//       const totalPage = Math.ceil(imgObj.totalHits / 12);

//       this.setState({
//           imageList: [...imageList, ...imgObj.hits],
//           status: 'resolved',
//           totalImg: imgObj.totalHits,
//           isLoading: false,
//       });
      
//         if (imgObj.totalHits >= 1 && imageList.length < 12 ) {
//           toast.success(`We find ${imgObj.totalHits} images `, {
//           theme: "colored"
//         })
//       }

//         if (imgObj.totalHits === 0) {
//           toast.error(`Hey, enter something normal`, {
//             theme: "colored"
//           })
//           this.setState({
//             status: 'idle'
//           })
//           return
//       }
//         if (imgObj.totalHits > 12) {
        
//         this.setState({
//           button: true
//         })
//       }

//       if (page === totalPage ) {
//         this.setState({
//             button: false
//           })
//         }
      
//       } catch (error) {
//           this.setState({ error, status: 'rejected' });
//       } finally {
//           this.setState({ isLoading: false });
//       }
//   }

//   toggleModal = () => {
//     this.setState(state => ({
//       openModal: !state.openModal
//     }))
//   };

//   getImgModal = ({ target }) => {

//     this.setState({
//       imageModal: {
//         alt: target.alt,
//         src: target.dataset.src
//       },
//       openModal: true,

//     });
//   };

//   handleFormSubmit = name => {
//     const { imgName } = this.state
//     this.setState({ imgName: name });
//     if (name !== imgName) {
//       this.setState({
//         imgName: name,
//         imageList: [],
//         page: 1
//       })
//     }
//     if (name.trim() === '') {
//       this.setState({
//         imgName: '',
//         imageList: [],
//         status: 'idle',
//         page: 1,
//         button: false,
//       })
     
//     }
//   }

  
//   handleButtonMore = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1
//     }))
//   }

