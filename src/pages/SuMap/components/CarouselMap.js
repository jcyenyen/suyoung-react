// import { Carousel } from 'react-carousel-minimal';
import ImageGallery from 'react-image-gallery';
import React from 'react';
// import { FaBullseye } from 'react-icons/fa';
import data from './MapPicture.json'

const CarouselMap = (props) => {
      return <ImageGallery 
      items={data[props.step]}
      autoPlay={true}

      />;
      // 要則帶入參數？是不是class就沒辦法處理
      // https://github.com/xiaolin/react-image-gallery
    }


export default CarouselMap;

// const captionStyle = {
//   fontSize: '2em',
//   fontWeight: 'bold',
// }
// const slideNumberStyle = {
//   fontSize: '20px',
//   fontWeight: 'bold',
// }
// return (
//   <div className="App">
//     <div style={{ textAlign: "center" }}>
//       <div style={{
//         padding: "0 20px"
//       }}>
//         <Carousel
//           data={data[props.step]}
//           time={1500}
//           width="650px"
//           height="350px"
//           opacity="1"
//           captionStyle={captionStyle}
//           radius="10px"
//           slideNumber={true}
//           slideNumberStyle={slideNumberStyle}
//           captionPosition="bottom"
//           automatic={true}
//           dots={true}
//           pauseIconColor="white"
//           pauseIconSize="40px"
//           slideBackgroundColor="white"
//           slideImageFit="cover"
//           thumbnails={true}
//           thumbnailWidth="100px"
//           style={{
//             textAlign: "center",
//             maxWidth: "850px",
//             maxHeight: "500px",
//             margin: "40px auto",
//           }}
//         />
//       </div>
//     </div>
//   </div>
// );   

// function App() {
//  const data = [
//     {
//       image: "http://localhost:3000/images/roomB4.jpeg",
//     // TODO:路徑問題，圖片一定要放在public底下，為http的開頭
//     },
//     {
//       image: "http://localhost:3000/images/roomB5.jpeg",
//     },
//     {
//       image: "http://localhost:3000/images/roomC1.webp",
//     },
//     {
//       image: "http://localhost:3000/images/roomC6.webp",
//     },
//     {
//       image: "http://localhost:3000/images/roomF1.jpeg",
//     },
//     {
//       image: "http://localhost:3000/images/roomG1.jpeg",
//     },

//   ];

//   const captionStyle = {
//     fontSize: '2em',
//     fontWeight: 'bold',
//   }
//   const slideNumberStyle = {
//     fontSize: '20px',
//     fontWeight: 'bold',
//   }
//   return (
//     <div className="App">
//       <div style={{ textAlign: "center" }}>
//         <div style={{
//           padding: "0 20px"
//         }}>
//           <Carousel
//             data={data}
//             time={3000}
//             width="650px"
//             height="350px"
//             opacity="1"
//             captionStyle={captionStyle}
//             radius="10px"
//             slideNumber={true}
//             slideNumberStyle={slideNumberStyle}
//             captionPosition="bottom"
//             automatic={true}
//             dots={true}
//             pauseIconColor="white"
//             pauseIconSize="40px"
//             slideBackgroundColor="darkgrey"
//             slideImageFit="cover"
//             thumbnails={true}
//             thumbnailWidth="100px"
//             style={{
//               textAlign: "center",
//               maxWidth: "850px",
//               maxHeight: "500px",
//               margin: "40px auto",
//             }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;
