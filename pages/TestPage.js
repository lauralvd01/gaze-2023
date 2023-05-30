import Image from "next/image";

const TestPage = () => {
  return (
    <div>
      ceci est une page de test
      <Image
        alt="PA=anus"
        loading="lazy"
        width="50"
        height="50"
        decoding="async"
        data-nimg="1"
        src="/components/beer_icon6.jpg"
        srcset="/components/beer_icon6.jpg"
      ></Image>
    </div>
  );
};

export default TestPage;
