import { Link } from "react-router";
import banner1 from "../../assets/banner1.png";
import banner2 from "../../assets/banner2.png";
import banner3 from "../../assets/banner3.png";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 

const Home = () => {
  return (
    <div className="w-full mx-auto">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={3000}
        transitionTime={600}
        stopOnHover={true}
      >
        <div>
          <img src={banner1} alt="Slide 1" />
          <p className="legend">Legend 1</p>
        </div>

        <div>
          <img src={banner2} alt="Slide 2" />
          <p className="legend">Legend 2</p>
        </div>

        <div>
          <img src={banner3} alt="Slide 3" />
          <p className="legend">Legend 3</p>
        </div>
      </Carousel>
    </div>
  );
};

export default Home;
