import React from "react";
import  AboutImage from "../../public/About.jpg"
import AboutSideImage from "../../public/About_side.jpg"
const About = () => {
  return (
    <div className="h-[fit-content]">
      <div className="overflow-hidden">
        <img
          src= {AboutImage.src}
          className="h-[45vh] md:h-[80vh] w-[100%] hover:scale-105 transition-all duration-500"
        />
      </div>
      <div className="text-[#FF6F61] flex flex-col gap-1 items-center justify-center">
        <h1 className="text-[3.5rem] font-extrabold">About</h1>
        <p className="text-[1.5rem] font-bold bg-[#FF6F61] text-white p-2 rounded-lg">
          Know about this platform....
        </p>
      </div>
      <div className="w-[100%] flex justify-center my-6">
        <div className="w-[90%] flex flex-col md:flex-row">
          <img
            src= {AboutSideImage.src}
            alt=""
            className="w-[100%] md:w-[45%] border border-[#FF6F61] border-2 md:m-1"
          />
          <div className="w-[100%] md:w-1/2 md:m-2 flex flex-col gap-6 text-justify md:text-[1.3rem] [1rem]">
            <p>
              Welcome to GetFlats, your premier destination for hassle-free
              property search and investment opportunities. At GetFlats, we're
              dedicated to revolutionizing the way you discover your next home
              or lucrative investment property. Our platform is designed to
              provide you with a seamless experience, combining innovative
              technology with personalized service to meet your unique needs.
            </p>
            <p>
              With GetFlats, finding your ideal property is a breeze. Our
              extensive database features a diverse range of listings, from cozy
              apartments to luxurious estates, ensuring that there's something
              for everyone. Utilize our intuitive interface to explore
              properties tailored to your preferences, and save your favorites
              to your wishlist for easy reference later on.
            </p>
          </div>
        </div>
      </div>
      <div className="w-[100%] flex flex-col justify-center items-center">
        <div className="w-[90%] flex flex-col gap-5 text-justify md:text-[1.3rem] [1rem]">
          <p>
            At GetFlats, we understand the importance of seamless communication
            when it comes to property inquiries. That's why we've streamlined
            the process with our intuitive "Make Enquiry" functionality. With
            just a few clicks, you can reach out to property owners or agents
            directly, asking questions, scheduling viewings, or negotiating
            terms, all from the comfort of our platform. Whether you're a
            prospective buyer or a curious renter, making inquiries has never
            been easier – empowering you to make informed decisions and move
            forward confidently in your property journey.
          </p>
          <p>
            But what truly sets GetFlats apart is our commitment to innovation.
            Our machine learning-powered recommendation system analyzes your
            browsing behavior to deliver personalized property suggestions,
            making your search more efficient and enjoyable. Plus, our chatbot
            is available 24/7 to assist you with any questions or inquiries you
            may have along the way. Experience the future of real estate with
            GetFlats – your trusted partner in finding the perfect place to call
            home.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
