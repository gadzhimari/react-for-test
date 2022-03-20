import React, {FC} from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import {useSelector} from "react-redux";
import Card from "../card/card";

const BurgerIngredients: FC<{}> = () => {
    const bunBlock: HTMLElement | null = document.getElementById("bun");
    const sauceBlock: HTMLElement | null = document.getElementById("sauce");
    const fillingBlock: HTMLElement | null = document.getElementById("filling");
    const topBlock: HTMLElement | null = document.getElementById("ingredients");
    const [current, setCurrent] = React.useState("one");

    const { ingredients } = useSelector((state: any) => state.burgerIngredients);

    // Сортировка ингредиентов по группам
    const bunArr = ingredients.filter((item: any) => {
        return item.type === "bun";
    });
    const sauceArr = ingredients.filter((item: any) => {
        return item.type === "sauce";
    });
    const fillingArr = ingredients.filter((item: any) => {
        return item.type === "main";
    });

    const onScrollIngredients = () => {
        const bunBlockPosition =
            bunBlock &&
            topBlock &&
            Math.abs(
                bunBlock.getBoundingClientRect().top -
                topBlock.getBoundingClientRect().top
            );
        const sauceBlockPosition =
            sauceBlock &&
            topBlock &&
            Math.abs(
                sauceBlock.getBoundingClientRect().top -
                topBlock.getBoundingClientRect().top
            );
        const fillingBlockPosition =
            fillingBlock &&
            topBlock &&
            Math.abs(
                fillingBlock.getBoundingClientRect().top -
                topBlock.getBoundingClientRect().top
            );

        if (
            bunBlockPosition &&
            sauceBlockPosition &&
            fillingBlockPosition &&
            bunBlockPosition < sauceBlockPosition &&
            bunBlockPosition < fillingBlockPosition
        ) {
            setCurrent("one");
        }
        if (
            bunBlockPosition &&
            sauceBlockPosition &&
            fillingBlockPosition &&
            sauceBlockPosition < bunBlockPosition &&
            sauceBlockPosition < fillingBlockPosition
        ) {
            setCurrent("two");
        }
        if (
            bunBlockPosition &&
            sauceBlockPosition &&
            fillingBlockPosition &&
            fillingBlockPosition < bunBlockPosition &&
            fillingBlockPosition < sauceBlockPosition
        ) {
            setCurrent("three");
        }
    };



  return (
    <section className={`p-2 ${styles.section}`}>
      <div className={styles.tab}>
          <Tab
              value="one"
              active={current === "one"}
              onClick={() => {
                  bunBlock &&
                  bunBlock.scrollIntoView({ block: "start", behavior: "smooth" });
                  setCurrent("one");
              }}
          >
              Булки
          </Tab>
          <Tab
              value="two"
              active={current === "two"}
              onClick={() => {
                  sauceBlock &&
                  sauceBlock.scrollIntoView({ block: "start", behavior: "smooth" });
                  setCurrent("two");
              }}
          >
              Соусы
          </Tab>
          <Tab
              value="three"
              active={current === "three"}
              onClick={() => {
                  fillingBlock &&
                  fillingBlock.scrollIntoView({
                      block: "start",
                      behavior: "smooth",
                  });
                  setCurrent("three");
              }}
          >
              Начинки
          </Tab>
      </div>
      <div className={`mt-10 ${styles.menu}`} onScroll={onScrollIngredients}>
          {/* Отображение булок */}
          <div id="bun" className={styles.ingredients_bun}>
              <p className={styles.ingredients_title}>Булки</p>
              <div className={styles.ingredients_list}>
                  {bunArr.map((item: any): JSX.Element => {
                      return <Card key={item._id} item={item} />;
                  })}
              </div>
          </div>
          {/* Отображение Соусов */}
          <div id="sauce" className={styles.ingredients_sauce}>
              <p className={styles.ingredients_title}>Соусы</p>
              <div className={styles.ingredients_list}>
                  {sauceArr.map((item: any) => {
                      return <Card key={item._id} item={item} />;
                  })}
              </div>
          </div>
          {/* Отображение Начинок */}
          <div id="filling" className={styles.ingredients_filling}>
              <p className={styles.ingredients_title}>Начинки</p>
              <div className={styles.ingredients_list}>
                  {fillingArr.map((item: any) => {
                      return <Card key={item._id} item={item} />;
                  })}
              </div>
          </div>
      </div>
    </section>
  );
};

export default BurgerIngredients;
