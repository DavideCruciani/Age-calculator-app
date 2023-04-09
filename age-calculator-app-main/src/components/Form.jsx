import React, { useRef, useState } from 'react'
import './Form.css'
import SubmitButton from '../icon-arrow.svg'

function Form() {
  const [day, setDay] = useState("")
  const [month, setMonth] = useState("")
  const [year, setYear] = useState("")

  const [dayResult, setDayResult] = useState("- -")
  const [monthResult, setMonthResult] = useState("- -")
  const [yearResult, setYearResult] = useState("- -")

  const dayError = useRef(null);
  const monthError = useRef(null);
  const yearError = useRef(null);

  const dayErrorInput = useRef(null);
  const monthErrorInput = useRef(null);
  const yearErrorInput = useRef(null); 

  function calculateResults() {
    const date = new Date();
    let dayToday = date.getDate();
    let monthToday = 1 + date.getMonth();
    let yearToday = date.getFullYear();

    const months=[31,28,31,30,31,30,31,31,30,31,30,31]

    /* CHECK IF INPUTS ARE FILLED */

    if (!day) {
      dayError.current.textContent = "This field is required"
      dayErrorInput.current.style.borderColor = 'var(--primary-color-red)';
      return
    } else {
      dayError.current.textContent = ""
      dayErrorInput.current.style.borderColor = 'var(--neutral-color-300)';
    }

    if (!month) {
      monthError.current.textContent = "This field is required"
      monthErrorInput.current.style.borderColor = 'var(--primary-color-red)';
      return
    } else {
      monthError.current.textContent = ""
      monthErrorInput.current.style.borderColor = 'var(--neutral-color-300)';
    }

    if (!year) {
      yearError.current.textContent = "This field is required"
      yearErrorInput.current.style.borderColor = 'var(--primary-color-red)';
      return
    } else {
      yearError.current.textContent = ""
      yearErrorInput.current.style.borderColor = 'var(--neutral-color-300)';
    }



    /* CHECK IF THE DAY EXIST FOR THE SELECTED MONTH */
    if (day > months[month - 1]) {
      dayError.current.textContent = "Must be a valid day"
      dayErrorInput.current.style.borderColor = 'var(--primary-color-red)';
      return
    } else {
      dayError.current.textContent = ""
      dayErrorInput.current.style.borderColor = 'var(--neutral-color-300)';
    }

    /* CHECK IF THE MONTH EXIST */
    if (month > 12) {
      monthError.current.textContent = "Must be a valid month"
      monthErrorInput.current.style.borderColor = 'var(--primary-color-red)';
      return
    } else {
      monthError.current.textContent = ""
      monthErrorInput.current.style.borderColor = 'var(--neutral-color-300)';
    }

    /* CHECK IF THE DATE IS IN THE FUTURE */
    if (year > yearToday || year == yearToday && month > monthToday || year == yearToday && month == monthToday && day > dayToday) {
      dayError.current.textContent = "Must be in the past"
      monthError.current.textContent = "Must be in the past"
      yearError.current.textContent = "Must be in the past"
      dayErrorInput.current.style.borderColor = 'var(--primary-color-red)';
      monthErrorInput.current.style.borderColor = 'var(--primary-color-red)';
      yearErrorInput.current.style.borderColor = 'var(--primary-color-red)';
      return
    } else {
      dayError.current.textContent = ""
      monthError.current.textContent = ""
      yearError.current.textContent = ""
      dayErrorInput.current.style.borderColor = 'var(--neutral-color-300)';
      monthErrorInput.current.style.borderColor = 'var(--neutral-color-300)';
      yearErrorInput.current.style.borderColor = 'var(--neutral-color-300)';
    }

    /* CHECK THE RESULTS */
    if (day > dayToday) {
      dayToday = dayToday + months[monthToday - 1];
      monthToday = monthToday - 1;
    }

    if (month > monthToday) {
      monthToday = monthToday + 12;
      yearToday = yearToday - 1;
    }
    
    /* SET THE RESULTS */
    setDayResult(dayToday - day);
    setMonthResult(monthToday - month);
    setYearResult(yearToday - year);
  }

  function handleSubmit(event) {
    event.preventDefault()
    calculateResults()
  }

  return (
    <>
      <form onSubmit={handleSubmit}>

        <div className='input-flex'>
          <div className='label-input'>
            <label htmlFor='day'>DAY</label>
            <input type='number' id='day' placeholder='DD' value={day} onChange={e => {setDay(e.target.value)}} ref={dayErrorInput}></input>
            <span className='error' ref={dayError}></span>
          </div>
          <div className='label-input'>
            <label htmlFor='month'>MONTH</label>
            <input type='number' id='month' placeholder='MM' value={month} onChange={e => {setMonth(e.target.value)}} ref={monthErrorInput}></input>
            <span className='error' ref={monthError}></span>
          </div>
          <div className='label-input'>
            <label htmlFor='year'>YEAR</label>
            <input type='number' id='year' placeholder='YYYY' value={year} onChange={e => {setYear(e.target.value)}} ref={yearErrorInput}></input>
            <span className='error' ref={yearError}></span>
          </div>
        </div>

        <div className="submit-block">
          <hr/>
          <button className='submit-btn'>
          <img src={SubmitButton} alt="submit button"/>
          </button>
        </div>
        
      </form>

      <div className='results-block'>
        <p><span className='final-result'>{yearResult}</span> years</p>
        <p><span className='final-result'>{monthResult}</span> months</p>
        <p><span className='final-result'>{dayResult}</span> days</p>
      </div>
    </>
  )
}

export default Form