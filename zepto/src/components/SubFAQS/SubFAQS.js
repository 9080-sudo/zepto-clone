import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useFirebase } from "../../context/Firebase";

import classes from "./SubFAQS.module.css";

import { FaArrowLeftLong } from "react-icons/fa6";
import { MdKeyboardArrowRight } from "react-icons/md";

export default function SubFAQS() {
  const params = useParams();
  const { faqId } = params;

  const [faq, setFaq] = useState("");
  const [subFaqs, setSubFaqs] = useState([])

  const { getFAQ, getSubFAQs } = useFirebase();

  useEffect(() => {
    const getFaqHere = async () => {
      let f = await getFAQ(faqId);
      setFaq(f.name);
    };
    getFaqHere();
  }, [faqId, getFAQ]);

  useEffect(() => {
    const getSubFaqsHere = async () => {
        let subFaqsHere = await getSubFAQs(faqId)
        setSubFaqs(subFaqsHere)
    }
    getSubFaqsHere()
  }, [faqId,getSubFAQs])

  return (
    <div className={classes["sub-faqs-container"]}>
      <Link to={`/account/support`} className={classes['back-link']}>
        <FaArrowLeftLong />
      </Link>
      <h3 className={classes['heading']}>{faq}</h3>
      <ul className={classes["list-of-subfaqs"]}>
        {subFaqs.map((subfaq) => (
          <li key={subfaq[0]}>
            <Link to={`details/${subfaq[0]}`} className={classes["subfaq"]}>
              <span className={classes['subfaq-descr']}>{subfaq[1].name}</span>
              <MdKeyboardArrowRight className={classes['right-arrow-icon']}/>
            </Link>
            <hr className={classes['line']}/>
          </li>
        ))}
      </ul>
    </div>
  );
}
