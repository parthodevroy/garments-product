import { Link } from "react-router";

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
         
          <p className="legend">Legend 1</p>
        </div>

        <div>
         
          <p className="legend">Legend 2</p>
        </div>

        <div>
         
          <p className="legend">Legend 3</p>
        </div>
      </Carousel>
    </div>
  );
};

export default Home;
