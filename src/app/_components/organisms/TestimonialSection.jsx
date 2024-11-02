"use client";
//
// Next
import Link from "next/link";
import Image from "next/image";
// Components
// Images
import TestimonialImage from "@/_assets/images/testimonial-image.png";
//

export const TestimonialSection = () => {
  return (
    <section className="testimonial-section">
      <div className=" container">
        <div className="testimonial-section--heading">
          <h2>Accelerate your </h2>
          <h2>
            growth.
            <span>Think it, become it with PadomzFx</span>
          </h2>
        </div>
        <div className="testimonial-section--image">
          <Image src={TestimonialImage} width="" height="" alt="" />
          <div className="testimonial-section--link">
            <Link href="/testimonials" >
              <p>
                Read Testimonials
                <svg>
                  <use href={`/images/sprite.svg#icon-arrow-right`} />
                </svg>
              </p>
              <p>Over 20 Amazing Stories</p>
            </Link>

          </div>
        </div>
      </div>
    </section>
  );
};
