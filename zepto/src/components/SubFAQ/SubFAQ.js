import React, { useEffect, useState } from 'react'

import { Link, useParams } from 'react-router-dom'

import classes from './SubFAQ.module.css'

import { FaArrowLeftLong } from "react-icons/fa6";
import { useFirebase } from '../../context/Firebase';

export default function SubFAQ() {
    const params = useParams()
    const {faqId, subFaqId} = params  

    const [subFaq, setSubFaq] = useState({})

    const {getSubFAQ} = useFirebase()

    useEffect(() => {
        const getSubFAQHere = async () => {
            const subFaqHere = await getSubFAQ(faqId, subFaqId)
            setSubFaq(subFaqHere)
        }
        getSubFAQHere()
    }, [faqId, subFaqId, getSubFAQ])

  return (
    <div className={classes["sub-faq-container"]}>
      <Link to={`/account/support/${faqId}`} className={classes['back-link']}>
        <FaArrowLeftLong />
      </Link>
      {subFaq && <>
        <h4 className={classes['question']}>{subFaq.name}</h4>
        <p className={classes['answer']}>{subFaq.answer}</p>
        <hr className={classes['line']}/>
      </>}
      <h4 className={classes['urgent-question']}>Have a non urgent question or comment?</h4>
      <p className={classes['email-para']}>Email <span className={classes['email']}>support@geddit.in</span></p>
    </div>
  )
}
