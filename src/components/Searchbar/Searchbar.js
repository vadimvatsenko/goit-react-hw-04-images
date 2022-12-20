import style from '../Searchbar/Searchbar.module.scss';
import React, { Component } from "react";
import "react-toastify/dist/ReactToastify.css";

export default class Searchbar extends Component {
    state = {
        imgName: ''
    }

    handleChangeName = e => {
        this.setState({ imgName: e.currentTarget.value.toLowerCase() })
    };
    handleSubmit = e => {
        e.preventDefault();
        this.props.onSubmit(this.state.imgName);
        //проп с APP в него передаем значение submit
        this.setState({ imgName: '' })
        //очистка после submit      
        
    };


    render() { 
        return (
            <header className={style.searchbar}>
                <form
                    className={style.searchForm}
                    onSubmit={this.handleSubmit}>

                    {this.props.children}

                    <input
                        className={style.searchFormInput}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        onChange={this.handleChangeName}
                        value={this.state.imgName}
                    />
                </form>
            </header>
        );
    }
        
}


// import style from '../Searchbar/Searchbar.module.scss';
// import React, { Component } from "react";
// import { toast } from 'react-toastify';
// import "react-toastify/dist/ReactToastify.css";

// export default class Searchbar extends Component {
//     state = {
//         imgName: ''
//     }

//     handleChangeName = e => {
//         this.setState({ imgName: e.currentTarget.value.toLowerCase() })
//     };
//     handleSubmit = e => {
//         e.preventDefault();
//         if (this.state.imgName.trim() === '') {

//             toast.error('Empty search', {
//                 autoClose: 1000
//             });
//             this.props.onSubmit(' ')
            
//         }
//         this.props.onSubmit(this.state.imgName);
//         //проп с APP в него передаем значение submit
//         this.setState({ imgName: '' })
//         //очистка после submit
//     };

//     render() { 
//         return (
//             <header className={style.searchbar}>
//                 <form
//                     className={style.searchForm}
//                     onSubmit={this.handleSubmit}>

//                     {this.props.children}

//                     <input
//                         className={style.searchFormInput}
//                         type="text"
//                         autoComplete="off"
//                         autoFocus
//                         placeholder="Search images and photos"
//                         onChange={this.handleChangeName}
//                         value={this.state.imgName}
//                     />
//                 </form>
//             </header>
//         );
//     }
        
// }