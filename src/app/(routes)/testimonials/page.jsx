'use client';
import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
// Utils
import { reviews } from '@/_utils/reviews';

export default function Testimonials() {
  const router = useRouter();
  const formRef = useRef(null);

  return (
    <section className={`testimonials`}>
      <div className="testimonials-close">
        <svg onClick={() => router.back()}>
          <use href={`/images/sprite.svg#icon-close`} />
        </svg>
      </div>

      <header>
        <p>What Our Students Say</p>
        <h3>Life-Changing Experience!</h3>
      </header>

      <div ref={formRef} className="testimonials-row">
        {reviews.map(({ id, name, title, review, rating, image, videoLink }, index) =>
          index < 8 ? (
            <div className='testimonials-item' key={id}>

              {videoLink && (
                <div className=' h-auto w-full rounded-md  text-black bg-white p-[1.6rem]'>
                  <iframe
                    // width="560"
                    // height="315"
                    className='w-full h-[300px] lg:h-auto object-cover'
                    src={`https://www.youtube.com/embed/2k0y-rI0nRs?si=QQfqQ57ZBUX8gp9E`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  <p className='text-[#009F0B] mt-2 lg:mb-[.8rem] xl:mb-[2rem] font-semibold'>{title}</p>
                  <p className='text-[1.6rem] font-semibold'>{review}</p>

                </div>
              )}
              {name && (
                <div className="testimonials-card">
                  <div className='flex justify-between items-center pb-4'>
                    <div>
                      <p>{name}</p>
                      {title && <p>{title}</p>}
                    </div>
                    <div className="testimonials-rating">
                      <svg>
                        <use href={`/images/sprite.svg#icon-star`} />
                      </svg>
                      <p className='cursor-pointer'>{rating}</p>
                    </div>
                  </div>
                  <p>{review}</p>
                </div>
              )}





              {image && (
                <div className="testimonial-image-container lg:mt-[8rem]">
                  <img src={image} alt="Testimonial" className="testimonial-image" />
                </div>
              )}
            </div>
          ) : null
        )}
      </div>
    </section>
  );
}
