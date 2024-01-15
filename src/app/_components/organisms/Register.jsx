"use client";
import { format } from "date-fns";
import { useFormik } from "formik";
import { useEffect, useRef } from "react";
import { usePaystackPayment } from "react-paystack";
// Next
import Image from "next/image";
import { useRouter } from "next/navigation";
// Components
import Loader from "@/_components/atoms/Loader";
import { InputGroup } from "@/_components/molecules/InputGroup";
// import { SelectGroup } from "@/_components/molecules/SelectGroup";
import { base } from "@/lib/airtable";
import { Button } from "../atoms/Button";
// Images
import Logo from "@/_assets/images/logo-white.png";

const onClose = () => {
  console.log("closed");
};

export const Register = ({ open, path, data }) => {
  const formRef = useRef(null);
  const navigate = useRouter();
  const fee = data?.amount * 100;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        navigate.push(`/training/${path}`);
      }
    };

    if (open) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [open, path, navigate]);

  const onSuccess = (data) => {
    let record = "";
    if (window) {
      record = localStorage.getItem("registrationId");
    }
    base("Registration Data").update(
      record,
      {
        PaymentReference: data.reference,
      },
      function (err, record) {
        if (err) {
          console.error(err);
          return;
        }
        if (window) {
          record = localStorage.setItem("registrationId", "");
        }
        navigate.push("/");
      }
    );
  };

  const formik = useFormik({
    initialValues: {
      FirstName: "",
      LastName: "",
      Email: "",
      Phone: "",
      TrainingAmount: data?.amount,
    },
    onSubmit: (values) => {
      base("Registration Data").create(values, function (err, record) {
        if (err) {
          console.error(err);
          return;
        }
        if (record.getId()) {
          if (window) {
            localStorage.setItem("registrationId", record.getId());
          }
          initializePayment(onSuccess, onClose);
        }
      });
    },
  });

  const { values } = formik;

  const config = {
    reference: new Date().getTime().toString(),
    email: values.Email,
    amount: fee, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_TEST,
  };
  const initializePayment = usePaystackPayment(config);

  return (
    <section className={`register ${open ? `flex fixed` : ` hidden`}`}>
      <Image src={Logo} width="" height="" alt="" />
      <form
        ref={formRef}
        className="register-form"
        onSubmit={formik.handleSubmit}
      >
        {/* <svg onClick={() => close()}>
          <use href={`/images/sprite.svg#icon-close`} />
        </svg> */}
        <div className="form-group">
          <InputGroup
            type="text"
            label="Training Amount"
            placeholder={`🇳🇬 ${`₦`}${data?.amount}`}
            id="TrainingAmount"
            name="TrainingAmount"
            disabled
            onChange={formik.handleChange}
            value={formik.values.TrainingAmount}
          />
          <InputGroup
            label="Training Date"
            placeholder="12 December 2023"
            value={format(new Date(data?.startDate ?? null), "dd LLLL, yyyy.")}
            disabled
          />
        </div>
        <div className="form-group">
          <InputGroup
            type="text"
            label="First Name"
            placeholder="Input first name"
            id="FirstName"
            name="FirstName"
            onChange={formik.handleChange}
            value={formik.values.FirstName}
          />
          <InputGroup
            label="Last Name"
            id="LastName"
            name="LastName"
            placeholder="Input last name"
            onChange={formik.handleChange}
            value={formik.values.LastName}
          />
        </div>

        <InputGroup
          type="email"
          id="Email"
          name="Email"
          label="Email"
          placeholder="name@mail.com"
          onChange={formik.handleChange}
          value={formik.values.Email}
        />

        <InputGroup
          type="phone"
          label="Mobile Number"
          id="Phone"
          name="Phone"
          placeholder="Input phone number"
          onChange={formik.handleChange}
          value={formik.values.Phone}
        />
        {/* <SelectGroup name="expertise" label="Expertise Level">
          <option value="">Option One</option>
          <option value="">Option One</option>
          <option value="">Option One</option>
        </SelectGroup> */}

        <Button
          type="submit"
          className="flex items-center text-center justify-center disabled:opacity-75"
          disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}
        >
          Proceed to Payment {formik.isSubmitting && <Loader />}
        </Button>
      </form>

      <div className>
        <p>
          If you have any questions, contact <span>academy@padomzfx.com</span>
        </p>
      </div>
    </section>
  );
};
