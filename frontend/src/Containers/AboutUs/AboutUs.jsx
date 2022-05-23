import React from "react";

import "./AboutUs.scss";
import IconSvg from "../../Components/IconSvg/IconSvg";

const AboutUs = () => {
  return (
    <div className="aboutUs">
      <header className="bannerHeaderWrapper">
        <div className="headerTextContent">
          <h2 className="sectionTitle">OUR MISSION</h2>
          <p className="usualText alignCenter">
            Danish dessert halvah caramels chupa chups jelly candy. Pudding biscuit gummi. Apple pies chocolate latte
            sugar.
          </p>
        </div>
        <div className="headerImgContainer">
          <img src="/images/banners/banner_about.jpg" alt="" />
        </div>
      </header>
      <section className="ourValuesWrapper">
        <div className="imagesContainer">
          <div className="imagesWrapper">
            <div className="imageBig">
              <img src="/images/content/values_1.jpg" alt="" />
            </div>
            <div className="imageSmall imageBottomLeft">
              <div className="imageAspectRatio">
                <img src="/images/content/values_2.jpg" alt="" />
              </div>
            </div>
            <div className="imageSmall imageTopRight">
              <div className="imageAspectRatio">
                <img src="/images/content/values_3.jpg" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="ourValuesContent">
          <h2 className="sectionTitle">OUR VALUES</h2>
          <p className="valuesDesc usualText alignJustify">
            Ice cream cotton candy apple pie gummies pudding I love pudding. Wafer oat cake I love dessert sweet
            liquorice. Oat cake bear claw croissant cupcake sweet roll. Tootsie roll tart I love danish apple pie I
            love. Dessert cupcake marshmallow. Dragée candy caramels tootsie roll jelly-o carrot cake.
          </p>
          <div className="valuesList">
            <div className="valuesRow">
              <div className="valuesIcon">
                <IconSvg iconName="cotton" />{" "}
              </div>
              <div className="valuesText">
                <p className="mediumText uppercase mediumBold valuesTitle">Hello sweetie !</p>
                <p className="mediumText">Mama mia que calor, Mama mia que calor!</p>
              </div>
            </div>
            <div className="valuesRow">
              <div className="valuesIcon">
                <IconSvg iconName="herbs" />{" "}
              </div>
              <div className="valuesText">
                <p className="mediumText uppercase mediumBold valuesTitle">Hello sweetie !</p>
                <p className="mediumText">Mama mia que calor !</p>
              </div>
            </div>
            <div className="valuesRow">
              <div className="valuesIcon">
                <IconSvg iconName="perfumeEssencia" />{" "}
              </div>
              <div className="valuesText">
                <p className="mediumText uppercase mediumBold valuesTitle">Hello sweetie !</p>
                <p className="mediumText">Mama mia que calor !</p>
              </div>
            </div>
            <div className="valuesRow">
              <div className="valuesIcon">
                <IconSvg iconName="ecoFriendly" />{" "}
              </div>
              <div className="valuesText">
                <p className="mediumText uppercase mediumBold valuesTitle">Hello sweetie !</p>
                <p className="mediumText">Mama mia que calor !</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
