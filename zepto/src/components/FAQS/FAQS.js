import React, { useEffect, useState } from "react";

import { useFirebase } from "../../context/Firebase";

import { Link } from "react-router-dom";

import { MdKeyboardArrowRight } from "react-icons/md";

import classes from "./FAQS.module.css";

export default function FAQS() {
  const { getFAQS } = useFirebase();

  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    const getFAQSHere = async () => {
      const faqsHere = await getFAQS();
      setFaqs(faqsHere);
    };
    getFAQSHere();
  });
  return (
    <div className={classes['faqs-container']}>
      <h4>FAQS</h4>
      <ul className={classes["list-of-faqs"]}>
        {faqs.map((faq) => (
          <li key={faq[0]}>
            <Link to={`${faq[0]}`} className={classes["faq"]}>
              <span className={classes['faq-descr']}>{faq[1].name}</span>
              <MdKeyboardArrowRight className={classes['right-arrow-icon']}/>
            </Link>
            <hr className={classes['line']}/>
          </li>
        ))}
      </ul>
    </div>
  );
}
