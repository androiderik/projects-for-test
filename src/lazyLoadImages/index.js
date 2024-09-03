import './App.css';
import { useEffect, useRef, useState, createRef } from 'react';

function App() {
  const style = {
    loadedImg: { filter: 'blur(0px)', transition: 'filter 0.5s linear' },
    loading: {
      filter: 'blur(10px)',
      clipPath: 'inset(0)',
    },
    img: {
      padding: '10px',
    },
    container: {
      display: 'grid',
      gridTemplateColumns: '30% 30% 30%',
      textAlign: 'center',
      padding: '50px',
    },
  };
  const Status = Object.freeze({
    NotLoaded: 'Not Loaded',
    Loading: 'Loading',
    Loaded: 'Loaded',
  });
  const refImage = useRef([]);
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState(Status.NotLoaded);

  const handleLoadImage = (e) => {
    setStatus(Status.Loaded);
  };

  const loadImages = (image) => {
    image.src = image.dataset.src;
  };
  const apiEndpoint = 'https://jsonplaceholder.typicode.com/photos?albumId=1';
  useEffect(() => {
    const response = fetch(apiEndpoint);
    response
      .then((response) => response.json())
      .then((json) => setImages(json));
  }, [apiEndpoint]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        console.log(entries, 'entries');

        entries?.forEach((item) => {
          console.log(item, 'is intersecting');
          //setStatus(Status.Loading);

          if (item.isIntersecting) {
            loadImages(item.target);
          }
        });
      },
      {
        root: null, //viewport by default
        rootMargin: '100px', // override treshold by set 100px of target to trigger  intersection
        threshold: 1, // entire target must be loaded to trigger intersection
      }
    );

    refImage.current.forEach((img) => {
      observer.observe(img.current);
      return () => observer.unobserve(img.current);
    });
  });

  // create a set of refs for each image
  refImage.current = images.map((_, i) => refImage.current[i] ?? createRef());

  console.log(status.Loading, 'status');
  return (
    <div style={style.container} className="App">
      {status === Status.Loading && (
        <div style={style.loading}>Loading ...</div>
      )}

      {images.map((item, i) => {
        return (
          <img
            width={'200px'}
            height={'200px'}
            data-src={item.url}
            src=""
            key={item.id}
            ref={refImage.current[i]}
            alt="lazy-load"
            //onLoad={() => setIsLoaded(true)}
            onLoad={handleLoadImage}
            style={style.img}
          />
        );
      })}
    </div>
  );
}

export default App;
