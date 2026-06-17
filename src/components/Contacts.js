import React from 'react';
import './Contacts.css';

const Contacts = () => {
  return (
    <section className="contacts-section">
      <h2>Контакты</h2>
      <div className="contacts-grid">
        <div className="contact-info">
          <div className="contact-item">
            <span className="contact-icon">📞</span>
            <div>
              <h4>Телефон</h4>
              <a href="tel:+79991234567">+7 (999) 123-45-67</a>
            </div>
          </div>
          <div className="contact-item">
            <span className="contact-icon">📍</span>
            <div>
              <h4>Адрес</h4>
              <p>тут будет адрес</p>
            </div>
          </div>
          <div className="contact-item">
            <span className="contact-icon">✉️</span>
            <div>
              <h4>Email</h4>
              <a href="mailto:info@beton3d.ru">pochta@beton.3d</a>
            </div>
          </div>
        </div>
        <div className="contact-map">
          <iframe
            src="https://yandex.ru/map-widget/v1/?um=constructor%3A1234567890abcdef&source=constructor"
            width="100%"
            height="300"
            frameBorder="0"
            title="Карта"
            className="map-frame"
          />
        </div>
      </div>
    </section>
  );
};

export default Contacts;