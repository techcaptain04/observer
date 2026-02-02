import { useState, useEffect, useRef } from 'react';
import { Galleria } from 'primereact/galleria';
import axios from 'axios';
import moment from 'moment';
// import { PhotoService } from './service/photo-service';
import { useParams } from 'react-router-dom';
import Datepicker from '../../components/date-picker';
import { BlockUI } from 'primereact/blockui';
import { ProgressSpinner } from 'primereact/progressspinner';

interface Image {
  id: number;
  imagePath: string; // Adjust based on your API response
  username: string; // Adjust based on your API response
  ipAddress: string;
  createdAt: string;
}

const Gallery = () => {
  const { username } = useParams();
  const [images, setImages] = useState<Image[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const galleria = useRef<Galleria>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getToday = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getImages = async (date: any) => {
    const params = {
      username,
      startedAt: date
    };
    try {
      const res = await axios.get(
        process.env.REACT_APP_BACKEND_API + '/images/user',
        { params }
      );
      if (res.status === 200) {
        console.log(res.data);
        setImages(res.data);
        setLoading(true);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const today = getToday();
    getImages(today);
  }, []);

  const handleClick = (date: any) => {
    console.log(date);
    setLoading(false);
    if (date) {
      console.log(date);
      const formattedDate = moment.isMoment(date) ? date : moment(date);
      const sendDate = formattedDate.format('YYYY-MM-DD');
      getImages(sendDate);
    } else {
      console.log('No date selected');
    }
  };

  const itemTemplate = (item: any) => {
    return (
      <img
        src={process.env.REACT_APP_BACKEND_API + '/upload/' + item.imagePath}
        alt={item.alt}
        style={{ width: '100%', display: 'block' }}
      />
    );
  };

  const thumbnailTemplate = (item: any) => {
    return (
      <img
        src={process.env.REACT_APP_BACKEND_API + '/upload/' + item.imagePath}
        alt={item.alt}
        style={{ display: 'block' }}
      />
    );
  };

  // const isLoading = () => {
  //   return (
  //     <BlockUI blocked={!loading}>
  //       <div className="text-center">Loading images...</div>
  //     </BlockUI>
  //   );
  // };

  return (
    <div>
      <Datepicker onDateClick={handleClick} />
      <label htmlFor="buttondisplay" className="font-bold block pl-8 pt-6">
        Images
      </label>
      {loading ? (
        <BlockUI blocked={!loading}>
          {/* <div className="text-center mt-8">Loading images...</div> */}
          <div className="card flex justify-content-center mt-8">
            <ProgressSpinner />
          </div>
        </BlockUI>
      ) : (
        <div className="card flex justify-content-center">
          <Galleria
            ref={galleria}
            value={images}
            numVisible={7}
            style={{ width: '1048px' }}
            activeIndex={activeIndex}
            onItemChange={(e) => setActiveIndex(e.index)}
            circular
            fullScreen
            showItemNavigators
            showThumbnails={false}
            item={itemTemplate}
            thumbnail={thumbnailTemplate}
          />
          <div className="grid mt-2 pl-8 pr-8">
            {images &&
              images.map((image, index) => {
                let imgEl = (
                  <img
                    src={
                      process.env.REACT_APP_BACKEND_API +
                      '/upload/' +
                      image.imagePath
                    }
                    alt={'pic'}
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      setActiveIndex(index);
                      galleria.current && galleria.current.show();
                    }}
                  />
                );
                return (
                  <div className="col-2" key={index}>
                    {imgEl}
                    <span>{image.createdAt}</span>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
