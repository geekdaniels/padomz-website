"use client";
import { client } from "@/lib/contentful/client";
import { useState } from "react";
// Next
import Image from "next/image";
// Components
import { Header } from "@/_components/organisms/Header";
// Utils

export default function Team() {
  const [open, setOpen] = useState({});
  const [loading, setLoading] = useState({});
  const [teams, setTeams] = useState([]);

  client
    .getEntries({
      content_type: "team",
      order: "fields.order",
    })
    .then(function (teams) {
      setTeams(teams.items);
      setLoading(false);
    });

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
        {!loading && (
          <div className="team">
            {teams.map(({ id, fields }, index) => (
              <div className="team-card" key={index}>
                <div className="team-card-image">
                  <Image
                    src={`https:${fields?.image.fields.file.url}`}
                    width={250}
                    height={0}
                    alt={fields.image.fields.title}
                    // fill={true}
                    quality={75}
                    // layout="fill"
                  />
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
                  <h5>{fields?.fullName}</h5>
                  <p>{fields?.role}</p>
                </footer>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
