'use client';
// Next
import Image from 'next/image';
// Components
import { Header } from '@/_components/organisms/Header';
import { TrainingSection } from '@/_components/organisms/TrainingSection';
import { TestimonialSection } from '@/_components/organisms/TestimonialSection';
//

export default function Training() {
  return (
    <div className="training">
      <Header>
        <div className="header-training container">
          <p>Master The Markets</p>
          <h3>PandomFx Presents a Live Trading Experience</h3>
          <p>
            {`
            Immerse yourself in the world of live trading with PandomFx. Our event is not just about learning; it's
            about mastering the markets in real-time. Join us for an unparalleled experience that goes beyond theory.`}
          </p>
        </div>
      </Header>
      <div className="training-available">
        <TrainingSection />
        <TrainingSection />
      </div>
      <TestimonialSection />
    </div>
  );
}
