"use client";
import { useState } from "react";
// Next
import Image from "next/image";
// Components
import { Register } from "@/_components/organisms/Register";
import { TestimonialSection } from "@/_components/organisms/TestimonialSection";
import { Testimonials } from "@/_components/organisms/Testimonials";
import { TrainingSection } from "@/_components/organisms/TrainingSection";
// Images
import PotentialImage from "@/_assets/images/potential-image.png";
//
import { client } from "@/lib/contentful/client";

export default function Home() {
  const [training, setTraining] = useState({});
  const [loading, setLoading] = useState(true);

  client.getEntries({ content_type: "training" }).then(function (training) {
    setTraining(training.items[0]);
    setLoading(false);
  });

  const [register, setRegister] = useState(false);
  const [testimonials, setTestimonials] = useState(false);
  //
  const openRegister = () => {
    setRegister(true);
  };
  //
  const closeRegister = () => {
    setRegister(false);
  };
  //
  const openTestimonials = () => {
    setTestimonials(true);
  };
  //
  const closeTestimonials = () => {
    setTestimonials(false);
  };
  return (
    <div className="index">
      <Testimonials open={testimonials} close={closeTestimonials} />
      <Register open={register} close={closeRegister} />
      <section className="container">
        <div className="potential">
          <div className="potential-image">
            <Image
              src={PotentialImage}
              width=""
              height=""
              alt="unlock potential"
            />
          </div>
          <div className="potential-text">
            <h4>Unlock Your Trading Potential</h4>
            <p>
              {`PadomzFx thrives on pushing boundaries and shattering constraints. It's time to exceed
limits—explore endless possibilities, learn from unparalleled expertise, and reach heights
that once seemed out of reach.`}
            </p>
            <p>
              {`With PadomzFx, your journey transforms into an adventure without boundaries. Every
gained insight and honed skill propels you toward unparalleled success in the thrilling realm
of Forex trading.`}
            </p>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="course">
          <div className="course-header">
            <h3>
              Why you should take a <span>PadomzFx</span> course
            </h3>
          </div>
          <div className="course-content">
            <div className="course-content--card">
              <div className="course-content--card--icon">
                <svg>
                  <use href={`/images/sprite.svg#icon-clock`} />
                </svg>
              </div>
              <div className="course-content--card--text">
                <h5>Structured Learning</h5>
                <p>
                  Our academy provides a meticulously crafted curriculum
                  designed to take you from a novice to a proficient trader.
                </p>
                <p>
                  We offer a systematic approach that begins with foundational
                  concepts, ensuring a solid understanding of the market,
                  technical analysis, risk management, and trading psychology.
                  Each module builds upon the previous one, fostering a
                  progressive learning environment.
                </p>
              </div>
            </div>
            <div className="course-content--card">
              <div className="course-content--card--icon">
                <svg>
                  <use href={`/images/sprite.svg#icon-clock`} />
                </svg>
              </div>
              <div className="course-content--card--text">
                <h5>Real-Time Market Insights</h5>
                <p>
                  Stay ahead of the curve with access to live trading sessions,
                  webinars, and market analysis. Learn to interpret market
                  movements and make well-informed trades.
                </p>
                <p>
                  We provide cutting-edge tools and techniques that empower our
                  students with the ability to conduct real-time analysis.
                  Through live market feeds, up-to-the-minute data, and advanced
                  analytical resources, our students learn to interpret market
                  dynamics swiftly and accurately.
                </p>
              </div>
            </div>
            <div className="course-content--card">
              <div className="course-content--card--icon">
                <svg>
                  <use href={`/images/sprite.svg#icon-clock`} />
                </svg>
              </div>
              <div className="course-content--card--text">
                <h5>Proven Success Stories</h5>

                <p>
                  {`Our students have achieved remarkable results, and many have
                  gone on to become successful Forex traders. When you choose a
                  PadomzFx course, you're setting yourself up for a bright
                  future in the world of Forex.`}
                </p>
                <p>
                  Our academy boasts a wealth of success stories, with numerous
                  students achieving their trading goals and realizing financial
                  independence through our mentorship and educational programs.
                  These success stories serve as a testament to the
                  effectiveness of our tailored curriculum, personalized
                  mentorship, and practical learning approach.
                </p>
              </div>
            </div>
            <div className="course-content--card">
              <div className="course-content--card--icon">
                <svg>
                  <use href={`/images/sprite.svg#icon-clock`} />
                </svg>
              </div>
              <div className="course-content--card--text">
                <h5>Comprehensive Curriculum</h5>
                <p>
                  Our courses cover everything from the basics of Forex trading
                  to advanced strategies, technical and fundamental analysis,
                  and risk management. We provide you with a 360-degree
                  education to make informed trading decisions.
                </p>
                <p>
                  {`We believe in a hands-on approach to learning. Our curriculum
                  isn't just theory; it's practical application. We offer live
                  trading sessions, real-time simulations, and case studies that
                  immerse students in the dynamic world of Forex trading.`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {!loading && <TrainingSection openModal={openRegister} data={training} />}
      <TestimonialSection openModal={openTestimonials} />
    </div>
  );
}
