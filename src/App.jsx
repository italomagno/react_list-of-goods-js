import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

export const App = () => {
  const [goodsToSort, setGoodsToSort] = useState(goodsFromServer);
  const [selectedOption, setSelectedOption] = useState("");

  const optionsToSort = [
    { type: "Sort alphabetically", className: "is-info", isToAppear: true },
    { type: "Sort by length", className: "is-success", isToAppear: true },
    { type: "Reverse", className: "is-warning", isToAppear: true },
    { type: "Reset", className: "is-danger", isToAppear: !checkIfArrayIsEqualsToFromServer() }
  ];

  function handleGoodsAlphabetically() {
    if(selectedOption === "Reverse") {
    setGoodsToSort([...goodsToSort].sort((a, b) => a.localeCompare(b)).reverse())

    } else {
      setGoodsToSort([...goodsToSort].sort((a, b) => a.localeCompare(b)));
    }

    setSelectedOption("Sort alphabetically");
  }

  function handleSortGoodsByLength() {
    setGoodsToSort([...goodsToSort].sort((a, b) =>  a.length - b.length));
    setSelectedOption("Sort by length");
  }

  function handleReverseGoods() {
    setGoodsToSort([...goodsToSort].reverse());
    setSelectedOption("Reverse");
  }

  function handleGoodsToOriginal() {
    setGoodsToSort(goodsFromServer);
    setSelectedOption("");
  }

  function checkIfArrayIsEqualsToFromServer() {
    return goodsToSort.every((good, index) => good === goodsFromServer[index]);
  }

  return (
    <div className="section content">
      <div className="buttons">
        {
          optionsToSort.map((option) => (
            option.isToAppear &&
            <button type="button"
              onClick={() => {
                setSelectedOption(option.type);
                switch (option.type) {
                  case "Sort alphabetically":
                    handleGoodsAlphabetically();
                    break;
                  case "Sort by length":
                    handleSortGoodsByLength();
                    break;
                  case "Reverse":
                    handleReverseGoods();
                    break;
                  case "Reset":
                    handleGoodsToOriginal();
                    break;
                  default:
                    break;
                }
              }}
              className={`button ${option.className} ${option.type === selectedOption ? "" : "is-light"}`}
              key={option.type}
              data-cy={option.type}
            >
              {option.type}
            </button>
          ))
        }
      </div>

      <ul>
        {
          goodsToSort.map((good) => (
            <li key={good} data-cy="Good">{good}</li>
          ))
        }
      </ul>
    </div>
  );
}
