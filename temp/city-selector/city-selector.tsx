import React, { useEffect, useMemo, useState } from 'react';
import { FC } from 'react';
import Dialog from '../dialog/dialog';
import Icon from '../icon/icon';
import pinyin from 'tiny-pinyin';
import './city-selector.scss';
import makeClassByPrefix from '../common/utils/makeClassByPrefix';
interface Props {
  cityData: string[];
  onChange: (city: string) => void;
}
function CurrentLocation() {
  const [city, setCity] = useState<string>(''),
    [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const xhr = new XMLHttpRequest();
    xhr.open('get', 'http://ip-api.com/json/?lang=zh-CN');
    setLoading(true);
    xhr.onload = () => {
      const obj = JSON.parse(xhr.responseText);
      console.log(obj);
      setCity(obj.regionName);
      setLoading(false);
    };
    xhr.onerror = () => {
      setCity('未知');
      setLoading(false);
    };
    xhr.send();
  }, []);

  return (
    <div>
      <span>当前城市</span>
      <span> {loading ? <Icon name="pending" /> : city}</span>
    </div>
  );
}

const CitySelector: FC<Props> = ({ children, cityData, onChange }) => {
  const clickHandle = () => {
    setModalVisible(true);
  };
  const addClassByPrefix = makeClassByPrefix('zyj-ui-city-selector');
  const [cityMap, setCityMap] = useState<{ [key: string]: string[] }>({});
  const cityList = useMemo(() => {
    return Object.entries(cityMap).sort((a, b) => a[0].charCodeAt(0) - b[0].charCodeAt(0));
  }, [cityMap]);
  const indexList = useMemo(() => {
    return Object.keys(cityMap).sort();
  }, [cityMap]);

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  function onCancel() {
    setModalVisible(false);
  }

  function onOk() {
    setModalVisible(false);
  }
  useEffect(() => {
    const map: { [key: string]: string[] } = {};
    cityData.map((city) => {
      const py = pinyin.convertToPinyin(city);
      const index = py[0];
      map[index] = map[index] || [];
      map[index].push(city);
    });
    setCityMap(map);
  }, []);

  function onClick(city: string) {
    onChange(city);
  }
  function scrollCityIntoViewByLetter(letter: string) {
    const el = document.body.querySelector(`h4[data-letter="${letter}"]`);
    if (el) {
      el.scrollIntoView();
    }
  }
  return (
    <>
      <div onClick={clickHandle}>{children}</div>
      <Dialog visible={modalVisible} onOk={onOk} onCancel={onCancel}>
        <CurrentLocation />
        <div className={addClassByPrefix('dialog-content')}>
          <h2>全部城市</h2>
          <ol className="fui-citySelect-index">
            {indexList.map((a) => (
              <li
                key={a}
                onClick={() => {
                  scrollCityIntoViewByLetter(a);
                }}
              >
                {a}
              </li>
            ))}
          </ol>
          <div className="cityList">所有城市</div>
          {cityList.map(([letter, list]) => {
            return (
              <div key={letter} className="fui-citySelect-citySection">
                <h4 data-letter={letter}>{letter}</h4>
                {list.map((city) => (
                  <div className="fui-citySelect-cityName" key={city} onClick={() => onClick(city)}>
                    {city}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </Dialog>
    </>
  );
};

export default CitySelector;
