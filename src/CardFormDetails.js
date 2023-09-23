import React, { useState, useEffect } from "react";
import bgMobile from "./images/bg-main-mobile.png";
import bgDesktop from "./images/bg-main-desktop.png";
import logo from "./images/card-logo.svg";
import tick from "./images/icon-complete.svg";


export default function CardFormDetails() {
  const [confirmed, setConfirmed] = useState(false);
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [cvc, setCvc] = useState("");
  const [errors, setErrors] = useState({});
  const [initialCardDetails, setInitialCardDetails] = useState("")
  const [enteredCardDetails, setEnteredCardDetails] = useState({
    name: '',
    cardNumber: '',
    month: '',
    year: '',
  });


  
  const validateForm = () => {
    const newErrors = {};

    if (!name) {
      newErrors.name = 'Cardholder name is required';
    }

    if (!cardNumber) {
      newErrors.cardNumber = 'Can\'t be blank';
    } else if (!/^[0-9\s]*$/.test(cardNumber)) {
      newErrors.cardNumber = 'Wrong format, numbers only';
    }

    if (!year) {
      newErrors.year = 'Can\'t be blank';
    }

    if (!cvc) {
      newErrors.cvc = 'Can\'t be blank';
    } else if (!/^[0-9]*$/.test(cvc)) {
      newErrors.cvc = 'CVC must contain numbers only';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    const isFormValid = validateForm();
    if (isFormValid) {
      setEnteredCardDetails({
        name,
        cardNumber,
        month,
        year,
        cvc,
      });
      setConfirmed(true);
    }
  };

  const displayDetails = confirmed ? enteredCardDetails : initialCardDetails;

  return (
    <>
      <section>
        <div className="absolute -z-10 w-full">
          <picture>
            <source media="(min-width: 768px)" srcSet={bgDesktop} />
            <img src={bgMobile} alt="" className="w-full md:w-1/3" />
          </picture>
        </div>
        
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 max-w-7xl mx-auto">
          <div className="mt-10 mx-5 grid grid-cols-1">
            <article className="front-card p-5 flex flex-col justify-between">
              <img src={logo} alt="" className="w-20 lg:w-28" />

              <div>
                <h3 className="text-white text-xl lg:text-3xl mb-6 ml-2 tracking-widest">
                  {confirmed ? displayDetails.cardNumber : '1234 5678 9012 3456'}
                </h3>

                <ul className="flex items-center justify-between">
                  <li className="text-white uppercase text-sm ml-2 tracking-widest font-thin">
                    {confirmed ? displayDetails.name : 'Jane Appleseed'}
                  </li>
                  <li className="text-white text-sm tracking-widest">
                    {confirmed
                      ? `${displayDetails.month}/${displayDetails.year}`
                      : '01/23'}
                  </li>
                </ul>
              </div>
            </article>

            <article className="back-card relative lg:ml-20">
              <p className="absolute right-10 text-sm text-white tracking-widest">
                {confirmed ? displayDetails.cvc : '001'}
              </p>
            </article>
          </div>

          <div className="pt-10 px-10 pb-20 lg:ml-12">
            {!confirmed && (
              <form className="flex flex-col justify-center gap-8 max-w-lg lg:h-screen">
                <div>
                  <label htmlFor="cardholder_name" className="text-base">Cardholder Name</label>
                  <input
                    className={`rounded-lg ${errors.year ? 'border-red-500 border' : 'focus:border focus:border-[#6348FE]'}`}
                    type="text"
                    name="cardholder_name"
                    id="cardholder_name"
                    placeholder="e.g. Jane Appleseed"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1 ml-1">{errors.name}</p>}
                </div>

                <div className="mt-2">
                  <label htmlFor="card_number" className="text-base">Card Number</label>
                  <input
                    className={`rounded-lg ${errors.year ? 'border-red-500 border' : 'focus:border focus:border-[#6348FE]'}`}
                    type="text"
                    name="card_number"
                    id="card_number"
                    placeholder="e.g. 1234 5678 9012 3456"
                    required
                    maxLength={19}
                    value={cardNumber
                      .replace(/\s/g, "")
                      .replace(/(\d{4})/g, "$1 ")
                      .trim()}
                    onChange={(e) => setCardNumber(e.target.value)}
                  />
                  {errors.cardNumber && <p className="text-red-500 text-xs mt-1 ml-1">{errors.cardNumber}</p>}
                </div>

                <article className="flex items-center w-full gap-2 lg:gap-8 mt-2">
                  <div className="w-[50%] lg:w-auto">
                    <label htmlFor="expiry_date" className="text-base">Exp. Date (MM/YY)</label>
                    <span>
                      <input
                      className={`w-[46%] lg:w-24 mr-1 lg:mr-2 rounded-lg ${errors.year ? 'border-red-500 border' : 'focus:border focus:border-[#6348FE]'}`}
                      type="text"
                      name="month"
                      id="month"
                      placeholder="MM"
                      required
                      value={month}
                      onChange={(e) => setMonth(e.target.value)}
                      maxLength={2}
                      />
                    </span>
            
                    <span>
                      <input
                        className={`w-[46%] lg:w-24 ml-1 lg:ml-2 rounded-lg ${errors.year ? 'border-red-500 border' : 'focus:border focus:border-[#6348FE]'}`}
                        type="text"
                        name="year"
                        id="year"
                        placeholder="YY"
                        required
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        maxLength={2}
                      />
                    </span>
                    {errors.year && <p className="text-red-500 text-xs mt-2 ml-2">{errors.year}</p>}
                  </div>

                  <div className="w-[72%] lg:w-auto">
                    <label htmlFor="cvc" className="text-base">CVC</label>
                    <input
                      className={`w-[200px] rounded-lg ${errors.cvc ? 'border-red-500 border' : 'focus:border focus:border-[#6348FE]'}`}
                      type="text"
                      name="cvc"
                      id="cvc"
                      placeholder="e.g. 123"
                      maxLength={3}
                      required
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value)}
                    />
                    {errors.cvc && <p className="text-red-500 text-xs mt-2 ml-1">{errors.cvc}</p>}
                  </div>
                </article>

                <button 
                onClick={handleConfirm} className="btn mt-4"
                >
                  Confirm
                </button>
              </form>
            )}

            {confirmed && <ThankYou setConfirmed={setConfirmed} />}
          </div>
        </div>
      </section>
    </>
  );
}

function ThankYou({ setConfirmed }) {
  return (
    <>
      <div className="thank-you flex flex-col items-center justify-center lg:h-screen max-w-lg mx-auto lg:mt-10">
        <img src={tick} alt="" className="block mx-auto mb-4" />
        <h1 className="text-slate-800 text-3xl my-8 uppercase text-center">
          Thank you!
        </h1>
        <p className="text-slate-400 text-center">
          We've added your card details
        </p>
        <button
          onClick={() => setConfirmed(false)}
          className="btn block mx-auto mt-10 w-full"
        >
          Continue
        </button>
      </div>
    </>
  );
}