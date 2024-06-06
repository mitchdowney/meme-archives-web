import React, { useEffect, useRef, useState } from 'react';
import { Rnd } from 'react-rnd';
import Image from '@/components/Image';
import styles from '@/styles/Editor.module.css';

export default function Editor() {
  const mainImage = 'https://d13jp9qoi0cn61.cloudfront.net/78.png';
  const overlayImage = 'https://d13jp9qoi0cn61.cloudfront.net/79.png';
  const [insertedImages, setInsertedImages] = useState<string[]>([]);
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(200);
  const imgRef = useRef(null);

  const handleImageClick = () => {
    setInsertedImages([...insertedImages, overlayImage]);
  };

  const onResize = (e, direction, ref, delta, position) => {
    setWidth(ref.style.width);
    setHeight(ref.style.height);
  };

  useEffect(() => {
    if (imgRef.current) {
      setWidth(imgRef.current.naturalWidth);
      setHeight(imgRef.current.naturalHeight);
    }
  }, [imgRef.current]);

  return (
    <div className='container-fluid main-content-column overflow-y-scroll'>
      <div className='main-content-inner-wrapper'>
        <div className='container-fluid'>
          <div className={styles['main-image-wrapper']}>
            <Image
              alt='Custom meme maker'
              className={`${styles['main-image']}`}
              draggable={false}
              imageSrc={mainImage}
              priority
              stretchFill
              title='Custom meme maker'
            />
            {insertedImages.map((image, index) => (
              <Rnd
                key={index}
                size={{ width,  height }}
                onResize={onResize}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                lockAspectRatio
              >
                <Image
                  ref={imgRef}
                  alt='Inserted image'
                  className={`${styles['inserted-image']}`}
                  draggable={false}
                  imageSrc={image}
                  stretchFill
                  style={{ width, height}}
                  title='Inserted image'
                />
              </Rnd>
            ))}
          </div>
          <div className={styles['insertable-images']}>
            <Image
              alt='Insertable image'
              className={`${styles['insertable-image']}`}
              imageSrc={overlayImage}
              onClick={handleImageClick}
              stretchFill
              title='Insertable image'
            />
          </div>
        </div>
      </div>
    </div>
  );
}