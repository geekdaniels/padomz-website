"use client";
import { format } from "date-fns"; //
// Next
import Image from "next/image";
import { useRouter } from "next/navigation";
// Components
import { Button } from "@/_components/atoms/Button";
// Images
import TrainingImage from "@/_assets/images/training-image.png";
//

export const TrainingSection = ({ data }) => {
  const { fields } = data;
  const navigate = useRouter();

  return (
    <>
      <section className="training-register">
        <div className="container">
          <div className="training-register--content">
            <header>
              <p>Upcoming Training</p>
              <h4>{fields.title}</h4>
              <p> {fields.briefDescription}</p>
            </header>
            <ul>
              <li>
                <svg>
                  <use href={`/images/sprite.svg#icon-clock`} />
                </svg>
                <p>{fields.duration}</p>
              </li>
              <li>
                <svg>
                  <use href={`/images/sprite.svg#icon-calendar`} />
                </svg>
                <p>{format(new Date(fields.startDate), "dd LLLL, yyyy.")}</p>
              </li>
            </ul>
            <div>
              <Button
                onClick={() =>
                  navigate.push(`/training/${fields.slug}/register`)
                }
              >
                {fields.cta}
              </Button>
              <Button onClick={() => navigate.push(`/training/${fields.slug}`)}>
                Learn More
              </Button>
            </div>
          </div>
          <div className="training-register--image">
            <Image
              src={TrainingImage}
              width=""
              height=""
              alt="Training Image"
            />
          </div>
        </div>
      </section>
    </>
  );
};
