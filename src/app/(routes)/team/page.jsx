"use client";
import { useState } from "react";
// Next
import Image from "next/image";
// Components
import { Header } from "@/_components/organisms/Header";
// Utils
import { teams } from "@/_utils/teams";

export default function Team() {
  const [open, setOpen] = useState({});

  const toggleSocials = (id) => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      [id]: !prevOpen[id],
    }));
  };
  return (
    <div className="team">
      <Header>
        <div className="container">
          <div className="header-team">
            <p>Trading Gurus Unveiled</p>
            <h3>Meet the Visionaries Behind PadomzFx</h3>
          </div>
        </div>
      </Header>

      <section className="container">
        <div className="team">
          {teams.map(({ id, name, role, image }) => (
            <div className="team-card" key={id}>
              <div className="team-card-image">
                <Image src={image} height="" width="" alt="" />
                <div className="team-card-icons">
                  {open[id] ? (
                    <>
                      <div className="team-card-icon">
                        <svg>
                          <use href={`/images/sprite.svg#icon-minus`} />
                        </svg>
                      </div>
                      <div className="team-card-icon">
                        <svg>
                          <use href={`/images/sprite.svg#icon-minus`} />
                        </svg>
                      </div>{" "}
                      <div className="team-card-icon">
                        <svg>
                          <use href={`/images/sprite.svg#icon-minus`} />
                        </svg>
                      </div>
                    </>
                  ) : null}

                  {/* <div
                    className="team-card-icon"
                    onClick={() => toggleSocials(id)}
                  >
                    <svg>
                      <use href={`/images/sprite.svg#icon-plus`} />
                    </svg>
                  </div> */}
                </div>
              </div>
              <footer>
                <h5>{name}</h5>
                <p>{role}</p>
              </footer>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
