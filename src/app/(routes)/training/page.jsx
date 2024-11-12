// Next
// Components
import { Header } from "@/_components/organisms/Header";
import { TestimonialSection } from "@/_components/organisms/TestimonialSection";
import { TrainingSection } from "@/_components/organisms/TrainingSection";
import { client } from "@/lib/contentful/client";

const Training = async () => {
  const allArticles = await client.getEntries({ content_type: "training" });

  return (
    <div className="training">
      <Header>
        <div className="container">
          <div className="header-training">
            <p>Master The Markets</p>
            <h3>PadomzFx Presents a Live Trading Experience</h3>
            <p>
              {`
            Immerse yourself in the world of live trading with PadomzFx. Our event is not just about learning; it's
            about mastering the markets in real-time. Join us for an unparalleled experience that goes beyond theory.`}
            </p>
          </div>
        </div>
      </Header>
      <div className="training-available">
        {allArticles.items.map((article) => {
          return (
            <TrainingSection
              key={article.id}
              openModal={false}
              data={article}
            />
          );
        })}
      </div>
      <TestimonialSection  />
    </div>
  );
};

export default Training;
