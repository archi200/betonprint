import React, { useState } from 'react';
import './FAQ.css';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'Вопрос 1',
      answer: 'Ответ 1',
    },
    {
      question: 'Вопрос 2',
      answer: 'Ответ 2',
    },
    {
      question: 'Вопрос 3',
      answer: 'Ответ 3',
    },
    {
      question: 'Вопрос 4',
      answer: 'Ответ 4',
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <h2>Часто задаваемые вопросы</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className={`faq-item ${openIndex === index ? 'open' : ''}`}>
            <button className="faq-question" onClick={() => toggleFAQ(index)}>
              {faq.question}
              <span className="faq-icon">{openIndex === index ? '−' : '+'}</span>
            </button>
            <div className="faq-answer">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;