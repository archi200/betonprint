import React, { useState } from 'react';
import './Configurator.css';

const colorImages = {
  base: '/images/base.png',
  white: '/images/white.png',
  black: '/images/black.png',
  blue: '/images/blue.png',
  brown: '/images/brown.png',
  pink: '/images/pink.png',
  red: '/images/red.png',
  green: '/images/green.png',
  yellow: '/images/yellow.png',
  lightpink: '/images/light-pink.png'
};

const THREE_D_VIEWER_URL = 'https://cdn.soft8soft.ru/AROAJSY2GOEHMOFUVPIOE:b3d138bc39/Beton-Config/Beton-Config.html';

const Configurator = () => {
  const [color, setColor] = useState('base');
  const [width, setWidth] = useState(50);
  const [height, setHeight] = useState(30);
  const [depth, setDepth] = useState(20);
  const [surface, setSurface] = useState('ribbed');
  const [show3D, setShow3D] = useState(false);

  // Стоимость цветов: базовый - бесплатно, все остальные - 2000 ₽
  const getColorPrice = (selectedColor) => {
    return selectedColor === 'base' ? 0 : 2000;
  };

  // Расчет цены
  const calculatePrice = () => {
    let basePrice = 10000; // Базовая цена

    // 1. Цвет: базовый бесплатно, остальные +2000 ₽
    basePrice += getColorPrice(color);

    // 2. Размер: зависимость от объема
    const volume = (width * height * depth) / 1000; // в литрах
    basePrice += volume * 150;

    // 3. Фактура: оштукатуренная дороже
    if (surface === 'plastered') basePrice += 3000;

    return Math.round(basePrice);
  };

  const totalPrice = calculatePrice();

  // Артикул
  const generateSku = () => {
    const colorCode = color.substring(0, 2).toUpperCase();
    const surfaceCode = surface === 'ribbed' ? 'R' : 'P';
    return `BETON-${colorCode}-${surfaceCode}-${width}x${height}x${depth}`;
  };

  // Расчет веса
  const calculateWeight = () => {
    const volume = (width * height * depth) / 1000;
    return (volume * 2.4).toFixed(1);
  };

  // Переключение 3D режима
  const toggle3D = () => {
    setShow3D(!show3D);
  };

  // Получение текущего изображения
  const currentImage = colorImages[color] || colorImages.base;

  // Получение названия цвета для отображения
  const getColorName = (colorKey) => {
    const names = {
      base: 'Базовый',
      white: 'Белый',
      black: 'Черный',
      blue: 'Синий',
      brown: 'Коричневый',
      pink: 'Розовый',
      red: 'Красный',
      green: 'Зеленый',
      yellow: 'Желтый',
      lightpink: 'Светло-розовый'
    };
    return names[colorKey] || colorKey;
  };

  // Проверка, выбран ли базовый цвет
  const isBaseColor = color === 'base';
  const colorExtraPrice = getColorPrice(color);

  return (
    <div className="configurator-container">
      <div className="product-card">
        {/* Карточка товара */}
        <div className="product-image-wrapper">
          <img src={currentImage} alt={`Бетонное изделие, цвет: ${color}`} className="product-image" />
          <button className="btn-3d" onClick={toggle3D}>
            🎮 3D
          </button>
        </div>

        {/* 3D режим */}
        {show3D && (
          <div className="three-d-modal">
            <div className="three-d-content">
              <button className="close-3d" onClick={toggle3D}>✕</button>
              <iframe
                src={THREE_D_VIEWER_URL}
                title="3D просмотр"
                className="three-d-frame"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {/* Конфигуратор */}
        <div className="configurator-panel">
          <h2>Конфигуратор цены</h2>

          {/* 1. Цвет */}
          <div className="config-group">
            <label>1. Выберите цвет</label>
            <div className="color-picker">
              {Object.keys(colorImages).map((c) => (
                <button
                  key={c}
                  className={`color-btn ${color === c ? 'active' : ''}`}
                  style={{ 
                    backgroundColor: c === 'base' ? '#b0b0b0' : c,
                    border: color === c ? '3px solid #1a1a2e' : '3px solid #dee2e6'
                  }}
                  onClick={() => setColor(c)}
                  title={`${getColorName(c)}${c !== 'base' ? ' (+2000 ₽)' : ''}`}
                />
              ))}
            </div>
            <div className="color-info">
              <span>Выбран: <strong>{getColorName(color)}</strong></span>
              {!isBaseColor && (
                <span className="color-price"></span>
              )}
              {isBaseColor && (
                <span className="color-price-free"></span>
              )}
            </div>
          </div>

          {/* 2. Размер */}
          <div className="config-group">
            <label>2. Размер (см)</label>
            <div className="size-controls">
              <div>
                <span>Ширина</span>
                <input
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(Number(e.target.value))}
                  min="10"
                  max="200"
                />
              </div>
              <div>
                <span>Высота</span>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  min="10"
                  max="200"
                />
              </div>
              <div>
                <span>Глубина</span>
                <input
                  type="number"
                  value={depth}
                  onChange={(e) => setDepth(Number(e.target.value))}
                  min="10"
                  max="200"
                />
              </div>
            </div>
          </div>

          {/* 3. Фактура */}
          <div className="config-group">
            <label>3. Фактура поверхности</label>
            <div className="option-group">
              <button
                className={`option-btn ${surface === 'ribbed' ? 'active' : ''}`}
                onClick={() => setSurface('ribbed')}
              >
                Рифленая
              </button>
              <button
                className={`option-btn ${surface === 'plastered' ? 'active' : ''}`}
                onClick={() => setSurface('plastered')}
              >
                Оштукатуренная
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Описание выбранного товара */}
      <div className="product-description">
        <h3>Детали заказа</h3>
        <div className="details-grid">
          <div><span>Название:</span> Бетонная грядка</div>
          <div><span>Цвет:</span> {getColorName(color)}</div>
          <div><span>Размер:</span> {width}x{height}x{depth} см</div>
          <div><span>Вес:</span> {calculateWeight()} кг</div>
          <div><span>Фактура:</span> {surface === 'ribbed' ? 'Рифленая' : 'Оштукатуренная'}</div>
          <div><span>Артикул:</span> {generateSku()}</div>
          <div className="total-price">
            <span>Цена:</span> {totalPrice} ₽
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configurator;