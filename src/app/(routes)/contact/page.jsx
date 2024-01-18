"use client";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useEffect, useState } from "react";
// Next
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
// Components
import { Button } from "@/_components/atoms/Button";
import { Input } from "@/_components/atoms/Input";
import Loader from "@/_components/atoms/Loader";
import { TextArea } from "@/_components/atoms/TextArea";
import { Header } from "@/_components/organisms/Header";
// Utils
import { SelectGroup } from "@/_components/molecules/SelectGroup";
import { base } from "@/lib/airtable";
import { client } from "@/lib/contentful/client";

export default function Contact() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useRouter();
  // Initialize an array to track the active state for each FAQ item
  const [activeStates, setActiveStates] = useState(
    Array(faqs.length).fill(false)
  );

  const handleHeaderClick = (index) => {
    // Toggle the active state for the clicked FAQ item
    const newActiveStates = [...activeStates];
    newActiveStates[index] = !newActiveStates[index];
    setActiveStates(newActiveStates);
  };

  const formik = useFormik({
    initialValues: {
      Name: "",
      Email: "",
      Phone: "",
      Course: "",
      Message: "",
    },
    onSubmit: (values) => {
      base("Contact Leeds").create(values, function (err, record) {
        if (err) {
          console.error(err);
          return;
        }

        navigate.push("/");
      });
    },
  });

  useEffect(() => {
    client.getEntries({ content_type: "faQs" }).then(function (faq) {
      setFaqs(faq.items);
      setLoading(false);
    });
  }, []);

  //
  return (
    <div className="contact">
      <Header>
        <div className="container">
          <div className="header-contact">
            <p>{`Let's Connect`}</p>
            <h3>Reach Out and Transform your Trading Future</h3>
          </div>
        </div>
      </Header>

      <section className="container">
        <div className="contact-row">
          <div className="contact-info">
            <div className="contact-card">
              <div className="contact-icon">
                <svg>
                  <use href={`/images/sprite.svg#icon-clock`} />
                </svg>
              </div>
              <div className="contact-text">
                <p>Office Hours</p>
                <p>Mon - Fri: 9.00am to 5.00pm</p>
              </div>
            </div>
            {/* <div className="contact-card">
              <div className="contact-icon">
                <svg>
                  <use href={`/images/sprite.svg#icon-location`} />
                </svg>
              </div>
              <div className="contact-text">
                <p>Corporate Office</p>
                <p>2A, Waziri Way, Victoria Island, Lagos</p>
              </div>
            </div> */}
            <div className="contact-card">
              <div className="contact-icon">
                <svg>
                  <use href={`/images/sprite.svg#icon-phone`} />
                </svg>
              </div>
              <div className="contact-text">
                <p>Phone</p>
                <p>
                  <a href="tel:01 887 0033">01 887 0033</a>
                </p>
              </div>
            </div>
            <div className="contact-card">
              <div className="contact-icon">
                <svg>
                  <use href={`/images/sprite.svg#icon-email`} />
                </svg>
              </div>
              <div className="contact-text">
                <p>Email</p>
                <p>info@padomzfx.com</p>
              </div>
            </div>
          </div>
          <form
            action=""
            className="contact-form"
            onSubmit={formik.handleSubmit}
          >
            <div className="form-group">
              <Input
                type="text"
                placeholder="Full Name"
                required="required"
                name="Name"
                id="Name"
                onChange={formik.handleChange}
                value={formik.values.Name}
              />
              <Input
                type="email"
                placeholder="Email Address"
                id="Email"
                name="Email"
                onChange={formik.handleChange}
                value={formik.values.Email}
                required="required"
              />
            </div>
            <div className="form-group">
              <SelectGroup
                id="Course"
                name="Course"
                onChange={formik.handleChange}
                value={formik.values.Course}
              >
                <option value="">Select Service Type</option>
                <option value="Nova Challenge Passing">
                  Nova Challenge Passing
                </option>
                <option value="Trading Signals">Trading Signals</option>
                <option value="Forex Training">Forex Training</option>
              </SelectGroup>
              <Input
                type="phone"
                placeholder="Phone Number"
                required="required"
                id="Phone"
                name="Phone"
                onChange={formik.handleChange}
                value={formik.values.Phone}
              />
            </div>

            <TextArea
              placeholder="Type Message"
              required
              id="Message"
              name="Message"
              onChange={formik.handleChange}
              value={formik.values.Message}
            />

            <Button
              type="submit"
              className="flex items-center text-center justify-center disabled:opacity-75"
              disabled={
                !(formik.isValid && formik.dirty) || formik.isSubmitting
              }
            >
              Send Message {formik.isSubmitting && <Loader />}
            </Button>
          </form>
        </div>
      </section>

      <section className="faqs">
        <div className="container">
          <header className="faqs-header">
            <h4>Frequently Asked Question</h4>
          </header>

          {!loading && (
            <ul className="faqs-list">
              {faqs.map(({ fields }, index) => (
                <li key={index} onClick={() => handleHeaderClick(index)}>
                  <header>
                    <h5>{fields.question}</h5>
                    <svg
                      className={
                        activeStates[index] ? "rotate-180" : "rotate-0"
                      }
                    >
                      <use href={`/images/sprite.svg#icon-caret`} />
                    </svg>
                  </header>
                  {activeStates[index] && (
                    <p>{documentToReactComponents(fields.answer)}</p>
                  )}
                </li>
              ))}
            </ul>
          )}

          <div className="faqs-footer">
            <Link href="/">
              <h5>FAQs</h5>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
